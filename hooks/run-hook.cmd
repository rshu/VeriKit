: << 'CMDBLOCK'
@echo off
REM Cross-platform polyglot wrapper for VeriKit hook scripts.
REM On Windows: cmd.exe runs the batch portion, which finds bash and calls
REM the actual hook script.
REM On Unix: the shell interprets this as a script (: is a no-op in bash).
REM
REM Hook scripts use extensionless filenames (e.g. "user-prompt-submit")
REM so Claude Code's Windows auto-detection doesn't try to bash-prefix .sh.
REM
REM ----------------------------------------------------------------------
REM KNOWN LIMITATION (Windows only): Claude Code delivers the hook payload
REM on stdin. cmd.exe inherits its own stdin from the parent CreateProcess
REM call and passes that handle to bash.exe via the `%%P "%~dp0%~1" %*`
REM invocation below. In practice the inherited handle is usually a usable
REM pipe (modern Windows hooks integrate with cmd.exe's pipe model), but
REM not guaranteed across all Claude Code versions. If you observe the
REM UserPromptSubmit hook silently passing through on Windows with no
REM <verikit-routing> block injected, run with `claude --debug` to
REM confirm whether HOOK_INPUT is empty inside user-prompt-submit. The
REM Unix path below is the well-tested branch.
REM ----------------------------------------------------------------------
REM
REM Usage: run-hook.cmd <script-name> [args...]

if "%~1"=="" (
    echo run-hook.cmd: missing script name >&2
    exit /b 1
)

set "HOOK_DIR=%~dp0"

REM Find bash via standard Git for Windows locations, then PATH.
for %%P in (
    "%ProgramFiles%\Git\bin\bash.exe"
    "%ProgramFiles(x86)%\Git\bin\bash.exe"
    "%LocalAppData%\Programs\Git\bin\bash.exe"
) do (
    if exist %%P (
        %%P "%HOOK_DIR%%~1" %*
        exit /b %errorlevel%
    )
)

REM Fallback: assume bash is on PATH.
bash "%HOOK_DIR%%~1" %*
exit /b %errorlevel%
CMDBLOCK

# ---- Unix shell path ----
# `:` is a no-op so the heredoc body above is skipped at shell-parse time.
# The actual entry point on Unix: forward all args to the named hook script.

set -euo pipefail

SCRIPT_NAME="${1:-}"
if [ -z "$SCRIPT_NAME" ]; then
    echo "run-hook.cmd: missing script name" >&2
    exit 1
fi
shift

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "${SCRIPT_DIR}/${SCRIPT_NAME}" "$@"
