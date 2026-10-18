/**
 * 持久化存储助手：基于 ArkData Preferences（@kit.ArkData）。
 * - init()：通过 ability context 获取 Preferences 实例；失败时抛出，由页面显示可见错误。
 * - load()：读取已保存的 JSON 字符串，无数据返回空字符串；读取失败抛出（不吞错），
 *   由页面显示错误并禁止新增，避免用空列表覆盖既有数据。
 * - save(json)：put 后 await flush；promise 链串行化多次保存，避免并发覆盖；
 *   put/flush 失败返回 false（供 UI 显示错误），不中断后续保存（队列可恢复）。
 */
import { preferences } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';

const STORE_NAME = 'todoStore';
const KEY_TODOS = 'todos';

export class TodoStore {
  private pref: preferences.Preferences | null = null;
  private pending: Promise<boolean> = Promise.resolve(true);

  /** 获取 Preferences 实例（默认 XML 模式，单进程轻量级场景）。失败时向上抛出。 */
  async init(context: common.Context): Promise<void> {
    const options: preferences.Options = { name: STORE_NAME };
    this.pref = await preferences.getPreferences(context, options);
  }

  /** 读取已保存 JSON 字符串；不存在返回空字符串，实例未初始化或读取失败抛出。 */
  async load(): Promise<string> {
    if (this.pref === null) {
      throw new Error('TodoStore not initialized');
    }
    const value: preferences.ValueType = await this.pref.get(KEY_TODOS, '');
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }

  /** 将保存操作追加到串行 promise 链尾，保证顺序执行、最终落盘为最后一次结果。 */
  save(json: string): Promise<boolean> {
    const task: Promise<boolean> = this.pending.then(() => this.doSave(json));
    this.pending = task.then(() => true, () => false);
    return task;
  }

  private async doSave(json: string): Promise<boolean> {
    if (this.pref === null) {
      return false;
    }
    try {
      await this.pref.put(KEY_TODOS, json);
      await this.pref.flush();
      return true;
    } catch (err) {
      return false;
    }
  }
}
