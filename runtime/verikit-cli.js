#!/usr/bin/env -S npx tsx

// bin/verikit-cli.ts
import { resolve as resolve2, dirname, join as join3 } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile as readFile3 } from "node:fs/promises";
import { existsSync } from "node:fs";

// ../core/src/contracts/types.ts
var VERIFIER_VALUES = [
  "rule",
  "test",
  "model_judge",
  "human"
];
var SAFETY_TIER_VALUES = [
  "low-risk-diagnostic",
  "medium-risk",
  "high-risk"
];

// ../core/src/contracts/parser.ts
import { readFile } from "node:fs/promises";

// ../../node_modules/js-yaml/dist/js-yaml.mjs
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
function padStart(string, max) {
  return common.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer) return null;
  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent !== "number") options.indent = 1;
  if (typeof options.linesBefore !== "number") options.linesBefore = 3;
  if (typeof options.linesAfter !== "number") options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null) return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max) return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max) return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
function setProperty(object, key, value) {
  if (key === "__proto__") {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value
    });
  } else {
    object[key] = value;
  }
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
var i;
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      setProperty(destination, key, source[key]);
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    setProperty(_result, keyNode, valueNode);
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common.repeat("\n", emptyLines);
      }
    } else {
      state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1;
var QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1;
var STYLE_SINGLE = 2;
var STYLE_LITERAL = 3;
var STYLE_FOLDED = 4;
var STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = (function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  })();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = (function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  })();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
  return "";
}
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
var JSON_SCHEMA = json;
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");

// ../core/src/contracts/parser.ts
var FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
var MAX_SKILL_FILE_BYTES = 256 * 1024;
async function parseSkillFile(filePath) {
  const raw = await readFile(filePath, "utf-8");
  if (raw.length > MAX_SKILL_FILE_BYTES) {
    return {
      name: "",
      description: "",
      body: "",
      filePath,
      warnings: [
        `SKILL.md exceeds ${MAX_SKILL_FILE_BYTES} bytes (${raw.length}); refusing to parse`
      ]
    };
  }
  return parseSkillSource(raw, filePath);
}
function parseSkillSource(source, filePath) {
  const warnings = [];
  const match = FRONTMATTER_RE.exec(source);
  if (!match) {
    return {
      name: "",
      description: "",
      body: source,
      filePath,
      warnings: ["No YAML frontmatter found between '---' delimiters"]
    };
  }
  const [, fmText, body] = match;
  let frontmatter;
  try {
    frontmatter = load(fmText, { schema: JSON_SCHEMA });
  } catch (err) {
    return {
      name: "",
      description: "",
      body,
      filePath,
      warnings: [
        `Failed to parse frontmatter as YAML: ${err instanceof Error ? err.message : String(err)}`
      ]
    };
  }
  if (!isRecord(frontmatter)) {
    return {
      name: "",
      description: "",
      body,
      filePath,
      warnings: ["Frontmatter is not a YAML mapping"]
    };
  }
  const name = typeof frontmatter.name === "string" ? frontmatter.name : "";
  const description = typeof frontmatter.description === "string" ? frontmatter.description : "";
  if (!name) warnings.push("Missing or non-string `name` field");
  if (!description) warnings.push("Missing or non-string `description` field");
  let contract;
  if ("contract" in frontmatter && frontmatter.contract !== void 0) {
    const validated = validateContract(frontmatter.contract);
    contract = validated.contract;
    warnings.push(...validated.warnings);
  }
  return { name, description, body, filePath, contract, warnings };
}
function validateContract(raw) {
  const warnings = [];
  if (!isRecord(raw)) {
    return {
      warnings: ["`contract` is not a YAML mapping; ignoring contract block"]
    };
  }
  const version = typeof raw.version === "string" ? raw.version : void 0;
  if (!version) {
    return {
      warnings: [
        "`contract.version` missing or non-string; treating skill as H1-baseline (no contract)"
      ]
    };
  }
  const useWhen = parseStringArray(raw.use_when, "contract.use_when", warnings);
  if (!useWhen || useWhen.length === 0) {
    warnings.push(
      "`contract.use_when` is empty; skill will not match any positive trigger"
    );
  }
  const postconditions = parsePostconditions(raw.postconditions, warnings);
  if (postconditions.length === 0) {
    warnings.push(
      "`contract.postconditions` is empty; verifier has nothing to check at runtime"
    );
  }
  const contract = {
    version,
    use_when: useWhen ?? [],
    postconditions
  };
  if (raw.do_not_use_when !== void 0) {
    const v = parseStringArray(raw.do_not_use_when, "contract.do_not_use_when", warnings);
    if (v) contract.do_not_use_when = v;
  }
  if (raw.preconditions !== void 0) {
    const v = parseStringArray(raw.preconditions, "contract.preconditions", warnings);
    if (v) contract.preconditions = v;
  }
  if (raw.inputs !== void 0) {
    const v = parseStringArray(raw.inputs, "contract.inputs", warnings);
    if (v) contract.inputs = v;
  }
  if (raw.outputs !== void 0) {
    const v = parseStringArray(raw.outputs, "contract.outputs", warnings);
    if (v) contract.outputs = v;
  }
  if (raw.overlaps_with !== void 0) {
    const v = parseStringArray(raw.overlaps_with, "contract.overlaps_with", warnings);
    if (v) contract.overlaps_with = v;
  }
  if (raw.tie_break !== void 0) {
    const tb = parseTieBreak(raw.tie_break, warnings);
    if (tb) contract.tie_break = tb;
  }
  if (raw.safety_tier !== void 0) {
    contract.safety_tier = parseSafetyTier(raw.safety_tier, warnings);
  }
  if (raw.telemetry !== void 0) {
    const t = parseTelemetry(raw.telemetry, warnings);
    if (t) contract.telemetry = t;
  }
  return { contract, warnings };
}
function parseStringArray(raw, label, warnings) {
  if (raw === void 0 || raw === null) return void 0;
  if (!Array.isArray(raw)) {
    warnings.push(`\`${label}\` is not an array; ignoring`);
    return void 0;
  }
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    if (typeof item === "string") {
      out.push(item);
    } else {
      warnings.push(`\`${label}[${i}]\` is not a string; skipping`);
    }
  }
  return out;
}
function parsePostconditions(raw, warnings) {
  if (raw === void 0 || raw === null) return [];
  if (!Array.isArray(raw)) {
    warnings.push("`contract.postconditions` is not an array; treating as empty");
    return [];
  }
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const label = `contract.postconditions[${i}]`;
    if (!isRecord(item)) {
      warnings.push(`\`${label}\` is not a mapping; skipping`);
      continue;
    }
    const statement = typeof item.statement === "string" ? item.statement : "";
    if (!statement) {
      warnings.push(`\`${label}.statement\` missing or non-string; skipping`);
      continue;
    }
    const verifierRaw = item.verifier;
    if (!isVerifier(verifierRaw)) {
      warnings.push(
        `\`${label}.verifier\` is not one of {${VERIFIER_VALUES.join(
          ", "
        )}}; skipping`
      );
      continue;
    }
    const pc = { statement, verifier: verifierRaw };
    if (verifierRaw === "rule") {
      if (typeof item.rule !== "string" || !item.rule) {
        warnings.push(`\`${label}.rule\` required for verifier=rule; skipping`);
        continue;
      }
      pc.rule = item.rule;
    } else if (verifierRaw === "test") {
      if (typeof item.test !== "string" || !item.test) {
        warnings.push(`\`${label}.test\` required for verifier=test; skipping`);
        continue;
      }
      pc.test = item.test;
    } else if (verifierRaw === "model_judge") {
      if (typeof item.judge_prompt !== "string" || !item.judge_prompt) {
        warnings.push(
          `\`${label}.judge_prompt\` required for verifier=model_judge; skipping`
        );
        continue;
      }
      pc.judge_prompt = item.judge_prompt;
    }
    out.push(pc);
  }
  return out;
}
function parseTieBreak(raw, warnings) {
  if (!isRecord(raw)) {
    warnings.push("`contract.tie_break` is not a mapping; ignoring");
    return void 0;
  }
  const tb = {};
  if (raw.prefer_this_skill_when !== void 0) {
    const v = parseStringArray(
      raw.prefer_this_skill_when,
      "contract.tie_break.prefer_this_skill_when",
      warnings
    );
    if (v) tb.prefer_this_skill_when = v;
  }
  if (raw.prefer_other_skill_when !== void 0) {
    const v = parseStringArray(
      raw.prefer_other_skill_when,
      "contract.tie_break.prefer_other_skill_when",
      warnings
    );
    if (v) tb.prefer_other_skill_when = v;
  }
  if (!tb.prefer_this_skill_when && !tb.prefer_other_skill_when) return void 0;
  return tb;
}
function parseSafetyTier(raw, warnings) {
  if (typeof raw === "string" && SAFETY_TIER_VALUES.includes(raw)) {
    return raw;
  }
  warnings.push(
    `\`contract.safety_tier\` is not one of {${SAFETY_TIER_VALUES.join(
      ", "
    )}}; defaulting to medium-risk`
  );
  return "medium-risk";
}
function parseTelemetry(raw, warnings) {
  if (!isRecord(raw)) {
    warnings.push("`contract.telemetry` is not a mapping; ignoring");
    return void 0;
  }
  const collect = parseStringArray(
    raw.collect,
    "contract.telemetry.collect",
    warnings
  );
  if (!collect) return void 0;
  return { collect };
}
function isRecord(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function isVerifier(v) {
  return typeof v === "string" && VERIFIER_VALUES.includes(v);
}

// ../core/src/contracts/discovery.ts
import { readdir, stat } from "node:fs/promises";
import * as path from "node:path";
async function discoverSkillFiles(roots) {
  const found = /* @__PURE__ */ new Set();
  for (const root of roots) {
    const skillsDir = path.join(root, "skills");
    let entries;
    try {
      entries = await readdir(skillsDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const skillPath = path.join(skillsDir, entry.name, "SKILL.md");
      try {
        const s = await stat(skillPath);
        if (s.isFile()) found.add(path.resolve(skillPath));
      } catch {
      }
    }
  }
  return Array.from(found);
}

// ../core/src/contracts/sidecar.ts
import { readdir as readdir2, readFile as readFile2 } from "node:fs/promises";
import * as path2 from "node:path";
async function loadSidecarContracts(skills, contractsDir) {
  const stats = {
    scanned: 0,
    attached: 0,
    orphaned: [],
    errors: [],
    warnings: []
  };
  let entries;
  try {
    entries = await readdir2(contractsDir);
  } catch {
    return stats;
  }
  const skillByName = /* @__PURE__ */ new Map();
  for (const s of skills) skillByName.set(s.name, s);
  for (const entry of entries) {
    if (!entry.endsWith(".json")) continue;
    const filePath = path2.join(contractsDir, entry);
    stats.scanned++;
    let parsed;
    try {
      const raw = await readFile2(filePath, "utf-8");
      parsed = JSON.parse(raw);
    } catch (err) {
      stats.errors.push({ path: filePath, error: err.message });
      continue;
    }
    if (parsed.format !== "skill-contract-sidecar/v1") {
      stats.errors.push({
        path: filePath,
        error: `unrecognized format: ${parsed.format ?? "<missing>"}`
      });
      continue;
    }
    if (!parsed.skill || !parsed.contract) {
      stats.errors.push({
        path: filePath,
        error: "missing 'skill' or 'contract' field"
      });
      continue;
    }
    const validated = validateContract(parsed.contract);
    if (!validated.contract) {
      stats.errors.push({
        path: filePath,
        error: `contract failed validation: ${validated.warnings.join("; ") || "no usable fields"}`
      });
      continue;
    }
    for (const w of validated.warnings) stats.warnings.push({ path: filePath, warning: w });
    const target = skillByName.get(parsed.skill);
    if (!target) {
      stats.orphaned.push(parsed.skill);
      continue;
    }
    target.contract = validated.contract;
    stats.attached++;
  }
  return stats;
}

// ../core/src/router/bm25.ts
var STOPWORDS = /* @__PURE__ */ new Set([
  "the",
  "and",
  "or",
  "for",
  "from",
  "with",
  "into",
  "this",
  "that",
  "these",
  "those",
  "may",
  "must",
  "should",
  "will",
  "would",
  "have",
  "has",
  "had",
  "are",
  "was",
  "were",
  "been",
  "being",
  "any",
  "some",
  "all",
  "more",
  "most",
  "other",
  "another",
  "between",
  "above",
  "below",
  "before",
  "after",
  "during",
  "be",
  "is",
  "of",
  "to",
  "in",
  "on",
  "at",
  "by",
  "as",
  "use",
  "uses",
  "using",
  "used",
  "include",
  "includes",
  "etc",
  "via",
  "such",
  "case",
  "cases",
  "user",
  "task",
  "tasks",
  "when",
  "data",
  "file",
  "files",
  "code",
  "skill",
  "skills",
  "tool",
  "tools",
  "agent",
  "input",
  "inputs",
  "output",
  "outputs",
  "value",
  "values",
  "result",
  "results",
  "object",
  "objects",
  "type",
  "types",
  "name",
  "names",
  "format",
  "formats"
]);
var TOKEN_RE = /[A-Za-z][A-Za-z0-9_-]{2,}|\.[a-zA-Z]{2,5}\b|[A-Z]{2,}/g;
var CJK_RUN_RE = /[㐀-鿿豈-﫿]+/g;
var CJK_STOPWORD_BIGRAMS = /* @__PURE__ */ new Set([
  "\u5E94\u7528",
  "\u4F7F\u7528",
  "\u5F00\u53D1",
  "\u652F\u6301",
  "\u529F\u80FD",
  "\u63D0\u4F9B",
  "\u5B9E\u73B0",
  "\u573A\u666F",
  "\u80FD\u529B",
  "\u7528\u6237",
  "\u53EF\u4EE5",
  "\u9700\u8981",
  "\u8FDB\u884C",
  "\u901A\u8FC7",
  "\u5982\u4F55",
  "\u600E\u4E48",
  "\u4EE5\u53CA",
  "\u76F8\u5173",
  "\u4E00\u4E2A",
  "\u4E00\u79CD",
  "\u4E00\u4E9B",
  "\u591A\u4E2A",
  "\u5F53\u524D",
  "\u4F8B\u5982",
  "\u6BD4\u5982",
  "\u5305\u62EC",
  "\u540C\u65F6",
  "\u56E0\u6B64",
  "\u6240\u4EE5",
  "\u4F46\u662F",
  "\u800C\u4E14",
  "\u5E76\u4E14",
  "\u6216\u8005",
  "\u672C\u6587",
  "\u4E0A\u8FF0",
  "\u4EE5\u4E0B",
  "\u6B64\u5916",
  "\u53E6\u5916",
  "\u5176\u4E2D",
  "\u5BF9\u4E8E",
  "\u5173\u4E8E",
  "\u7528\u4E8E",
  "\u57FA\u4E8E",
  "\u8FDB\u800C",
  "\u4ECE\u800C",
  "\u76EE\u524D",
  "\u901A\u5E38",
  "\u4E00\u822C",
  "\u5B8C\u6210",
  "\u5904\u7406",
  "\u83B7\u53D6"
]);
function cjkBigrams(run) {
  const chars = Array.from(run);
  if (chars.length <= 1) return chars;
  const out = [];
  for (let i = 0; i + 1 < chars.length; i++) out.push(chars.slice(i, i + 2).join(""));
  return out;
}
function tokenize(text, opts = {}) {
  const out = [];
  for (const m of text.match(TOKEN_RE) ?? []) {
    const lower = m.toLowerCase();
    if (STOPWORDS.has(lower)) continue;
    if (lower.length < 3) continue;
    out.push(lower);
  }
  for (const run of text.match(CJK_RUN_RE) ?? []) {
    for (const bg of cjkBigrams(run)) {
      if (opts.dropStructuralCjk && CJK_STOPWORD_BIGRAMS.has(bg)) continue;
      out.push(bg);
    }
  }
  return out;
}
function buildIndex(documents, tokenizeOptions = {}) {
  const postings = /* @__PURE__ */ new Map();
  const documentFrequency = /* @__PURE__ */ new Map();
  let totalLength = 0;
  for (const doc of documents) {
    const tokens = tokenize(doc.text, tokenizeOptions);
    const tf = /* @__PURE__ */ new Map();
    for (const t of tokens) {
      const existing = tf.get(t);
      if (existing) {
        existing.termFrequency++;
      } else {
        tf.set(t, { termFrequency: 1, documentLength: tokens.length });
      }
    }
    for (const [, posting] of tf) posting.documentLength = tokens.length;
    postings.set(doc.name, tf);
    totalLength += tokens.length;
    for (const term of tf.keys()) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }
  return {
    postings,
    documentFrequency,
    averageDocumentLength: documents.length > 0 ? totalLength / documents.length : 0,
    documentCount: documents.length,
    tokenizeOptions
  };
}
function scoreQuery(query, index, opts = {}) {
  const k1 = opts.k1 ?? 1.5;
  const b = opts.b ?? 0.75;
  const queryTokens = Array.from(new Set(tokenize(query, index.tokenizeOptions)));
  const results = [];
  for (const [docName, docPostings] of index.postings) {
    let score = 0;
    for (const qt of queryTokens) {
      const posting = docPostings.get(qt);
      if (!posting) continue;
      const df = index.documentFrequency.get(qt) ?? 0;
      const idf = Math.log(
        1 + (index.documentCount - df + 0.5) / (df + 0.5)
      );
      const tf = posting.termFrequency;
      const lenNorm = index.averageDocumentLength > 0 ? posting.documentLength / index.averageDocumentLength : 1;
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * lenNorm);
      score += idf * (numerator / denominator);
    }
    results.push({ name: docName, score });
  }
  results.sort((a, b2) => b2.score - a.score);
  return results;
}
function normalize(scores) {
  const maxScore = scores.reduce((m, s) => Math.max(m, s.score), 0);
  if (maxScore === 0) return scores.map((s) => ({ ...s, score: 0 }));
  return scores.map((s) => ({ name: s.name, score: s.score / maxScore }));
}

// ../core/src/router/trigger_matcher.ts
var STOPWORDS2 = /* @__PURE__ */ new Set([
  // English connectives / auxiliaries / common verbs
  "the",
  "and",
  "or",
  "for",
  "from",
  "with",
  "into",
  "this",
  "that",
  "these",
  "those",
  "may",
  "must",
  "should",
  "will",
  "would",
  "have",
  "has",
  "had",
  "are",
  "was",
  "were",
  "been",
  "being",
  "any",
  "some",
  "all",
  "more",
  "most",
  "other",
  "another",
  "between",
  "above",
  "below",
  "before",
  "after",
  "during",
  "be",
  "is",
  "of",
  "to",
  "in",
  "on",
  "at",
  "by",
  "as",
  "use",
  "uses",
  "using",
  "used",
  "include",
  "includes",
  "including",
  "etc",
  "via",
  "such",
  "case",
  "cases",
  "already",
  "available",
  "applies",
  "applied",
  "explicitly",
  "needs",
  "rather",
  "either",
  "both",
  "without",
  "within",
  // Action verbs that don't disambiguate which skill to use
  "involves",
  "requires",
  "mentions",
  "references",
  "documented",
  "covers",
  "describes",
  "supports",
  "handle",
  "handles",
  "perform",
  "performs",
  "performed",
  "perform",
  "produces",
  "produced",
  "creates",
  "creating",
  "create",
  "created",
  // Generic technical nouns that appear in nearly every clause
  "user",
  "task",
  "tasks",
  "when",
  "data",
  "file",
  "files",
  "code",
  "skill",
  "skills",
  "tool",
  "tools",
  "agent",
  "agents",
  "input",
  "inputs",
  "output",
  "outputs",
  "value",
  "values",
  "result",
  "results",
  "object",
  "objects",
  "item",
  "items",
  "type",
  "types",
  "name",
  "names",
  "format",
  "formats",
  "context",
  "contexts",
  "operation",
  "operations",
  "field",
  "fields",
  "specific",
  "general",
  "different",
  "various",
  "raw",
  "common",
  "standard",
  "valid",
  "appropriate",
  "relevant"
]);
var TOKEN_RE2 = /\.[a-zA-Z]{2,5}\b|\b[A-Z]{2,}\b|\b[A-Za-z][A-Za-z0-9_-]{3,}\b/g;
var CJK_RUN_RE2 = /[㐀-鿿豈-﫿]+/g;
var CJK_TOKEN_RE = /^[㐀-鿿豈-﫿]+$/;
function cjkBigrams2(run) {
  const chars = Array.from(run);
  if (chars.length <= 1) return chars;
  const out = [];
  for (let i = 0; i + 1 < chars.length; i++) {
    const bg = chars.slice(i, i + 2).join("");
    if (!CJK_STOPWORD_BIGRAMS.has(bg)) out.push(bg);
  }
  return out;
}
function extractDistinctiveTokens(clause) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const m of clause.match(TOKEN_RE2) ?? []) {
    const lower = m.toLowerCase();
    if (STOPWORDS2.has(lower)) continue;
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(m);
  }
  for (const run of clause.match(CJK_RUN_RE2) ?? []) {
    for (const bg of cjkBigrams2(run)) {
      const lower = bg.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);
      out.push(bg);
    }
  }
  return out;
}
function classify(rawToken) {
  if (rawToken.startsWith(".")) return "extension";
  if (/^[A-Z]{2,}$/.test(rawToken)) return "acronym";
  if (CJK_TOKEN_RE.test(rawToken)) return "cjk";
  return "identifier";
}
var ZERO_COUNTS = { extension: 0, acronym: 0, identifier: 0, cjk: 0 };
function matchClauseTokens(clause, ctx) {
  const clauseTokensRaw = extractDistinctiveTokens(clause).filter(
    (t) => !t.includes("-")
  );
  if (clauseTokensRaw.length === 0) return { ...ZERO_COUNTS };
  const haystack = [...ctx.files, ctx.instruction ?? ""].join("\n");
  const haystackTokensLower = extractDistinctiveTokens(haystack).filter((t) => !t.includes("-")).map((t) => t.toLowerCase());
  const haystackSet = new Set(haystackTokensLower);
  const counts = { ...ZERO_COUNTS };
  for (const ctRaw of clauseTokensRaw) {
    const ct = ctRaw.toLowerCase();
    const spec = classify(ctRaw);
    let matched = false;
    if (haystackSet.has(ct)) {
      matched = true;
    } else if (spec !== "cjk") {
      for (const ht of haystackTokensLower) {
        if (ct.length >= 4 && (ht.startsWith(ct) || ht.endsWith(ct))) {
          matched = true;
          break;
        }
        if (ht.length >= 4 && (ct.startsWith(ht) || ct.endsWith(ht))) {
          matched = true;
          break;
        }
      }
    }
    if (matched) counts[spec]++;
  }
  return counts;
}
function positiveClauseFires(clause, ctx) {
  const c = matchClauseTokens(clause, ctx);
  return c.extension + c.acronym + c.identifier > 0 || c.cjk >= 2;
}
function negativeClauseFires(clause, ctx) {
  const c = matchClauseTokens(clause, ctx);
  return c.extension > 0 || c.acronym > 0 || c.identifier >= 2 || c.cjk >= 2;
}
function matchTriggers(skillName, contract, ctx) {
  const matchedClauses = [];
  for (const clause of contract.use_when) {
    if (positiveClauseFires(clause, ctx)) matchedClauses.push(clause);
  }
  const negativeHits = [];
  for (const clause of contract.do_not_use_when ?? []) {
    if (negativeClauseFires(clause, ctx)) negativeHits.push(clause);
  }
  const totalPositive = contract.use_when.length;
  const positiveHits = matchedClauses.length;
  const disqualified = negativeHits.length > 0;
  const score = disqualified || totalPositive === 0 ? 0 : positiveHits / totalPositive;
  return {
    skillName,
    score,
    positiveHits,
    totalPositive,
    matchedClauses,
    negativeHits,
    disqualified
  };
}

// ../core/src/router/document.ts
var CJK_CHAR_RE = /[㐀-鿿豈-﫿]/g;
var REF_SECTION_RE = /^##\s*(参考文档|参考资料|References?)\b/im;
function cjkRatio(text) {
  const nonSpace = text.replace(/\s+/g, "");
  if (nonSpace.length === 0) return 0;
  return (nonSpace.match(CJK_CHAR_RE)?.length ?? 0) / nonSpace.length;
}
function bodyForSearch(body) {
  if (cjkRatio(body) < 0.3) return body;
  const m = body.match(REF_SECTION_RE);
  if (m && m.index !== void 0) return body.slice(0, m.index).trimEnd();
  return body.length > 3e3 ? body.slice(0, 3e3) : body;
}
var USE_WHEN_WEIGHT = 2;
function buildSearchText(skill) {
  const parts = [skill.name, skill.description];
  if (skill.contract) {
    const c = skill.contract;
    if (c.use_when?.length) {
      const block = c.use_when.join("\n");
      for (let i = 0; i < USE_WHEN_WEIGHT; i++) parts.push(block);
    }
  }
  if (skill.body) parts.push(bodyForSearch(skill.body));
  return parts.join("\n");
}
function toSearchDocuments(skills) {
  return skills.map((s) => ({ name: s.name, text: buildSearchText(s) }));
}

// ../core/src/router/ranker.ts
var SkillRanker = class {
  contractedSkills;
  bm25Index;
  constructor(allSkills) {
    const contracted = allSkills.filter((s) => s.contract !== void 0);
    this.contractedSkills = contracted.map((s) => ({ name: s.name, parsed: s }));
    this.bm25Index = buildIndex(toSearchDocuments(contracted));
  }
  /** Number of contract-bearing skills in the corpus. */
  get size() {
    return this.contractedSkills.length;
  }
  /**
   * Rank all contract-bearing skills against the task context. Returns
   * sorted descending by combinedScore; disqualified skills (negative
   * trigger fired) are pushed to the end with combinedScore = 0.
   */
  rank(ctx, opts = {}) {
    const alpha = opts.alpha ?? 0.5;
    const triggerMatches = /* @__PURE__ */ new Map();
    for (const s of this.contractedSkills) {
      if (!s.parsed.contract) continue;
      triggerMatches.set(
        s.name,
        matchTriggers(s.name, s.parsed.contract, ctx)
      );
    }
    const bm25Raw = scoreQuery(ctx.instruction ?? "", this.bm25Index);
    const bm25 = normalize(bm25Raw);
    const bm25ByName = /* @__PURE__ */ new Map();
    for (const s of bm25) bm25ByName.set(s.name, s.score);
    const ranked = [];
    for (const s of this.contractedSkills) {
      const trigger = triggerMatches.get(s.name);
      if (!trigger) continue;
      const bm25Score = bm25ByName.get(s.name) ?? 0;
      const combinedScore = trigger.disqualified ? 0 : alpha * trigger.score + (1 - alpha) * bm25Score;
      ranked.push({
        name: s.name,
        combinedScore,
        triggerScore: trigger.score,
        bm25Score,
        disqualified: trigger.disqualified,
        trigger,
        skill: s.parsed
      });
    }
    ranked.sort((a, b) => {
      if (a.disqualified !== b.disqualified) return a.disqualified ? 1 : -1;
      return b.combinedScore - a.combinedScore;
    });
    return ranked;
  }
};

// ../core/src/router/two_level_ranker.ts
function rankReferences(task, refs, opts = {}) {
  if (refs.length === 0) return [];
  const topK = opts.topK ?? 3;
  const minScore = opts.minScore ?? 0;
  const docs = refs.map((r) => ({
    name: r.path,
    // use path as the doc key (unique within a skill)
    text: `${r.title}
${r.snippet}`
  }));
  const index = buildIndex(docs);
  const rawScored = scoreQuery(task, index, opts);
  const scored = refs.length <= 1 ? rawScored : normalize(rawScored);
  const byPath = new Map(refs.map((r) => [r.path, r]));
  const out = [];
  for (const s of scored) {
    if (s.score < minScore) continue;
    const ref = byPath.get(s.name);
    if (!ref) continue;
    out.push({ path: ref.path, title: ref.title, score: Number(s.score.toFixed(4)) });
    if (out.length >= topK) break;
  }
  return out;
}

// ../core/src/policy/composition.ts
var IO_STOPWORDS = /* @__PURE__ */ new Set([
  "the",
  "a",
  "an",
  "of",
  "or",
  "and",
  "with",
  "from",
  "into",
  "object",
  "value",
  "field",
  "name",
  "type",
  "data",
  "file",
  "path",
  "list",
  "dict",
  "array",
  "set",
  "string",
  "text",
  "number",
  "format",
  "input",
  "inputs",
  "output",
  "outputs",
  "optional",
  "required",
  "time",
  "rate",
  "pick",
  "picks",
  "size",
  "step",
  "task",
  "metadata",
  "info",
  "context"
]);
function ioTokens(s) {
  const out = [];
  const matches = s.toLowerCase().match(/[a-z][a-z0-9_-]{2,}/g) ?? [];
  for (const m of matches) {
    if (IO_STOPWORDS.has(m)) continue;
    if (m.length < 4) continue;
    out.push(m);
  }
  return out;
}
function ioMatches(aOutputs, bInputs) {
  const aTokens = aOutputs.flatMap(ioTokens);
  const bTokens = bInputs.flatMap(ioTokens);
  const matched = [];
  for (const at of aTokens) {
    for (const bt of bTokens) {
      if (at === bt) {
        matched.push(at);
        break;
      }
      if (at.length >= 4 && (bt.startsWith(at) || bt.endsWith(at))) {
        matched.push(at);
        break;
      }
      if (bt.length >= 4 && (at.startsWith(bt) || at.endsWith(bt))) {
        matched.push(at);
        break;
      }
    }
  }
  return Array.from(new Set(matched));
}
function findLinearChains(candidates, options = {}) {
  const maxDepth = options.maxDepth ?? 4;
  const minScore = options.minScore ?? 0.3;
  const maxChains = options.maxChains ?? 10;
  const eligible = candidates.filter(
    (c) => !c.disqualified && c.combinedScore >= minScore
  );
  if (eligible.length < 2) return [];
  const out = [];
  const expansionCap = maxChains * 10;
  const budget = { calls: Math.max(expansionCap, eligible.length * maxDepth * 4) };
  for (const start of eligible) {
    if (out.length >= expansionCap || budget.calls <= 0) break;
    extend3([start], out, eligible, maxDepth, expansionCap, budget);
  }
  const seen = /* @__PURE__ */ new Set();
  const unique = [];
  out.sort((a, b) => b.totalScore - a.totalScore);
  for (const c of out) {
    const key = c.skills.map((s) => s.name).join(">");
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(c);
    if (unique.length >= maxChains) break;
  }
  return unique;
}
function extend3(current, out, pool, maxDepth, expansionCap, budget) {
  if (out.length >= expansionCap || budget.calls-- <= 0) return;
  if (current.length >= 2) {
    out.push({
      skills: current.map((c) => ({
        name: c.name,
        combinedScore: c.combinedScore
      })),
      totalScore: current.reduce((s, c) => s + c.combinedScore, 0) / current.length,
      reason: describeChain(current)
    });
  }
  if (current.length >= maxDepth) return;
  const last = current[current.length - 1];
  if (!last) return;
  const lastOutputs = last.skill.contract?.outputs;
  if (!lastOutputs || lastOutputs.length === 0) return;
  for (const candidate of pool) {
    if (out.length >= expansionCap || budget.calls <= 0) return;
    if (current.some((c) => c.name === candidate.name)) continue;
    const inputs = candidate.skill.contract?.inputs;
    if (!inputs || inputs.length === 0) continue;
    if (ioMatches(lastOutputs, inputs).length > 0) {
      extend3([...current, candidate], out, pool, maxDepth, expansionCap, budget);
    }
  }
}
function describeChain(chain) {
  const parts = [];
  for (let i = 0; i < chain.length - 1; i++) {
    const a = chain[i];
    const b = chain[i + 1];
    if (!a || !b) continue;
    const aOut = a.skill.contract?.outputs ?? [];
    const bIn = b.skill.contract?.inputs ?? [];
    const m = ioMatches(aOut, bIn);
    parts.push(
      `${a.name}.outputs[${m.slice(0, 2).join(",")}] \u2192 ${b.name}.inputs`
    );
  }
  return parts.join("; ");
}
function recipeStatus(c) {
  return c.lifecycle?.status ?? "draft";
}
function matchCompositions(task, compositions, opts = {}) {
  const excludeDeprecated = opts.excludeDeprecated ?? true;
  const pool = excludeDeprecated ? compositions.filter((c) => recipeStatus(c) !== "deprecated") : compositions;
  if (pool.length === 0) return [];
  const minScore = opts.minScore ?? 0.5;
  const minTokenOverlap = opts.minTokenOverlap ?? 2;
  const maxResults = opts.maxResults ?? 3;
  const docs = pool.map((c) => ({
    name: c.id,
    text: `${c.name}
${c.when.join("\n")}`
  }));
  const index = buildIndex(docs, { dropStructuralCjk: true });
  const scored = normalize(scoreQuery(task, index, { b: 0.3 }));
  const queryTokens = new Set(tokenize(task, index.tokenizeOptions));
  const byId = new Map(pool.map((c) => [c.id, c]));
  const out = [];
  for (const s of scored) {
    if (s.score < minScore) continue;
    const composition = byId.get(s.name);
    if (!composition) continue;
    const postings = index.postings.get(s.name);
    let overlap = 0;
    if (postings) {
      for (const t of queryTokens) if (postings.has(t)) overlap++;
    }
    if (overlap < minTokenOverlap) continue;
    out.push({ composition, score: Number(s.score.toFixed(4)) });
    if (out.length >= maxResults) break;
  }
  return out;
}

// ../core/src/verifier/runner.ts
async function verifySkill(skillName, postconditions, ctx, opts = {}) {
  const mode = opts.mode ?? "gated";
  const enableJudge = opts.enableModelJudge ?? false;
  const warnings = [];
  const results = [];
  const peerRuleFailed = postconditions.some(
    (pc) => pc.verifier === "rule" && checkRule(pc, ctx).status === "fail"
  );
  for (const pc of postconditions) {
    if (pc.verifier === "rule") {
      results.push(checkRule(pc, ctx));
      continue;
    }
    if (pc.verifier === "test") {
      results.push(await checkTest(pc, ctx, opts));
      continue;
    }
    if (pc.verifier === "model_judge") {
      const fire = shouldFireModelJudge(mode, ctx, opts, peerRuleFailed);
      if (!fire || !enableJudge || !opts.modelJudgeInvoker) {
        results.push({
          postcondition: pc,
          status: "deferred",
          reason: !enableJudge ? "model_judge disabled (enableModelJudge=false); deferring" : !opts.modelJudgeInvoker ? "no modelJudgeInvoker configured; deferring" : "budget gate skipped this judge call",
          ranAs: "model_judge"
        });
        continue;
      }
      results.push(await checkModelJudge(pc, ctx, opts));
      continue;
    }
    if (pc.verifier === "human") {
      results.push({
        postcondition: pc,
        status: "deferred",
        reason: "human verifiers never fire at runtime (benchmark-only)",
        ranAs: "human"
      });
      continue;
    }
    warnings.push(`Unknown verifier type '${pc.verifier}'; skipping`);
    results.push({
      postcondition: pc,
      status: "skipped",
      reason: "unknown verifier type",
      ranAs: "rule"
    });
  }
  const decisive = results.filter((r) => r.ranAs === "rule" || r.ranAs === "test");
  const pass = !decisive.some((r) => r.status === "fail");
  return { skillName, results, pass, warnings };
}
function checkRule(pc, ctx) {
  const rule = pc.rule;
  if (!rule) {
    return {
      postcondition: pc,
      status: "skipped",
      reason: "verifier=rule but no `rule` string supplied",
      ranAs: "rule"
    };
  }
  const regexMatch = rule.match(/^(?:regex\s+)?\/((?:\\.|[^\/\\])+)\/([gimsuy]*)/);
  if (!regexMatch) {
    return {
      postcondition: pc,
      status: "deferred",
      reason: "rule is not a regex literal; non-regex predicates not yet supported",
      ranAs: "rule"
    };
  }
  let re;
  try {
    re = new RegExp(regexMatch[1] ?? "", regexMatch[2] ?? "");
  } catch (err) {
    return {
      postcondition: pc,
      status: "skipped",
      reason: `invalid regex: ${err instanceof Error ? err.message : String(err)}`,
      ranAs: "rule"
    };
  }
  const matched = re.test(ctx.text);
  return {
    postcondition: pc,
    status: matched ? "pass" : "fail",
    reason: matched ? `regex matched in ${ctx.text.length}-char context` : `regex did not match in ${ctx.text.length}-char context`,
    ranAs: "rule"
  };
}
async function checkTest(pc, ctx, opts) {
  const cmd = pc.test;
  if (!cmd) {
    return {
      postcondition: pc,
      status: "skipped",
      reason: "verifier=test but no `test` string supplied",
      ranAs: "test"
    };
  }
  if (!opts.testInvoker) {
    return {
      postcondition: pc,
      status: "deferred",
      reason: `no testInvoker configured; would have run: ${cmd.slice(0, 80)}`,
      ranAs: "test"
    };
  }
  try {
    const r = await opts.testInvoker(cmd);
    return {
      postcondition: pc,
      status: r.exitCode === 0 ? "pass" : "fail",
      reason: r.exitCode === 0 ? "test command exited 0" : `test command exited ${r.exitCode}${r.stderr ? `: ${r.stderr.slice(0, 120)}` : ""}`,
      ranAs: "test"
    };
  } catch (err) {
    return {
      postcondition: pc,
      status: "skipped",
      reason: `test invoker threw: ${err instanceof Error ? err.message : String(err)}`,
      ranAs: "test"
    };
  }
}
async function checkModelJudge(pc, ctx, opts) {
  if (!opts.modelJudgeInvoker || !pc.judge_prompt) {
    return {
      postcondition: pc,
      status: "skipped",
      reason: "missing judge_prompt or modelJudgeInvoker",
      ranAs: "model_judge"
    };
  }
  try {
    const verdict = await opts.modelJudgeInvoker(pc.judge_prompt, ctx);
    return {
      postcondition: pc,
      status: verdict === "pass" ? "pass" : verdict === "fail" ? "fail" : "deferred",
      reason: `model judge returned '${verdict}'`,
      ranAs: "model_judge"
    };
  } catch (err) {
    return {
      postcondition: pc,
      status: "skipped",
      reason: `judge invoker threw: ${err instanceof Error ? err.message : String(err)}`,
      ranAs: "model_judge"
    };
  }
}
function shouldFireModelJudge(mode, ctx, opts, peerRuleFailed) {
  if (mode === "never") return false;
  if (mode === "always") return true;
  if (peerRuleFailed) return true;
  if (opts.lowConfidence) return true;
  if (ctx.safetyTier && ctx.safetyTier !== "low-risk-diagnostic") return true;
  return false;
}

// bin/conflict.ts
function band(score) {
  if (score >= 0.6) return "high";
  if (score >= 0.4) return "medium";
  return "low";
}
function pickTop(ranked) {
  return ranked.find((r) => !r.disqualified) ?? null;
}
function classifyConflict(ranked, recipeMatches, topHigh) {
  const topKit = pickTop(ranked);
  const top = topKit ? { name: topKit.name, combinedScore: topKit.combinedScore } : null;
  const topRecipe = recipeMatches.length > 0 ? recipeMatches[0] : null;
  const recipe = topRecipe ? { id: topRecipe.composition.id, skills: topRecipe.composition.skills, score: topRecipe.score } : null;
  const topInRecipe = !!(topRecipe && topKit && topRecipe.composition.skills.includes(topKit.name));
  let status;
  if (topRecipe) status = topInRecipe ? "agree" : "conflict";
  else if (topKit && topKit.combinedScore >= topHigh) status = "single_kit";
  else status = "uncertain";
  return { status, top, recipe, top_in_recipe: topInRecipe };
}
function topKits(ranked, topHigh, k) {
  return ranked.filter((r) => !r.disqualified && r.combinedScore >= topHigh).slice(0, k).map((r) => ({ name: r.name, combinedScore: r.combinedScore }));
}

// bin/verikit-cli.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var SELF_DIR = __dirname;
var PLUGIN_ROOT = resolve2(__dirname, "..");
function skillRootCandidates(rootArg) {
  return [rootArg, process.env.VERIKIT_SKILL_ROOT, SELF_DIR, PLUGIN_ROOT].filter(
    (p) => !!p
  );
}
function contractsDirCandidates() {
  return [
    process.env.VERIKIT_CONTRACTS_DIR,
    join3(SELF_DIR, "contracts"),
    join3(PLUGIN_ROOT, "contracts"),
    join3(PLUGIN_ROOT, "..", "verikit", "contracts")
  ].filter((p) => !!p);
}
function manifestsDirCandidates() {
  return [
    process.env.VERIKIT_MANIFESTS_DIR,
    join3(SELF_DIR, "manifests"),
    join3(PLUGIN_ROOT, "manifests"),
    join3(PLUGIN_ROOT, "..", "verikit", "manifests")
  ].filter((p) => !!p);
}
async function loadReferenceManifest(kit) {
  for (const dir of manifestsDirCandidates()) {
    const p = join3(dir, `${kit}.json`);
    if (!existsSync(p)) continue;
    try {
      const m = JSON.parse(await readFile3(p, "utf-8"));
      if (Array.isArray(m.references)) return m;
    } catch {
    }
  }
  return null;
}
function compositionsFileCandidates() {
  return [
    process.env.VERIKIT_COMPOSITIONS_FILE,
    join3(SELF_DIR, "compositions", "recipes.json"),
    join3(PLUGIN_ROOT, "compositions", "recipes.json"),
    join3(PLUGIN_ROOT, "..", "verikit", "compositions", "recipes.json")
  ].filter((p) => !!p);
}
async function loadCompositions() {
  for (const p of compositionsFileCandidates()) {
    if (!existsSync(p)) continue;
    try {
      const f = JSON.parse(await readFile3(p, "utf-8"));
      if (Array.isArray(f.compositions)) return { compositions: f.compositions, provenance: f.provenance };
    } catch {
    }
  }
  return { compositions: [] };
}
function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0] ?? "";
  const flags = /* @__PURE__ */ new Map();
  const positional = [];
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--")) {
      const next = args[i + 1];
      if (next !== void 0 && !next.startsWith("--")) {
        flags.set(a.slice(2), next);
        i++;
      } else {
        flags.set(a.slice(2), "true");
      }
    } else {
      positional.push(a);
    }
  }
  return { command, flags, positional };
}
function fail(msg, code = 1) {
  process.stderr.write(`verikit: ${msg}
`);
  process.exit(code);
}
async function loadSkills(rootArg) {
  let skills = [];
  let usedRoot = "";
  for (const root of skillRootCandidates(rootArg)) {
    const files = await discoverSkillFiles([root]);
    if (files.length === 0) continue;
    const parsed = [];
    for (const file of files) {
      try {
        const skill = await parseSkillFile(file);
        if (skill.name) parsed.push(skill);
      } catch (err) {
        process.stderr.write(
          `verikit: failed to parse ${file}: ${err.message}
`
        );
      }
    }
    if (parsed.length > 0) {
      skills = parsed;
      usedRoot = root;
      break;
    }
  }
  if (skills.length === 0) {
    process.stderr.write(
      `verikit: no skills found under any of: ${skillRootCandidates(rootArg).join(", ")}
`
    );
    return skills;
  }
  process.stderr.write(`verikit: discovered ${skills.length} skill(s) under ${usedRoot}
`);
  for (const dir of contractsDirCandidates()) {
    try {
      const stats = await loadSidecarContracts(skills, dir);
      if (stats.scanned > 0) {
        process.stderr.write(
          `verikit: loaded ${stats.attached}/${stats.scanned} sidecar contract(s) from ${dir}` + (stats.orphaned.length > 0 ? ` (${stats.orphaned.length} orphaned)` : "") + (stats.errors.length > 0 ? ` (${stats.errors.length} rejected: ${stats.errors[0]?.error})` : "") + "\n"
        );
        break;
      }
    } catch (err) {
      process.stderr.write(
        `verikit: sidecar load failed for ${dir}: ${err.message}
`
      );
    }
  }
  return skills;
}
async function cmdListSkills(args) {
  const skills = await loadSkills(args.flags.get("root"));
  for (const s of skills) {
    const out = {
      name: s.name,
      description: s.description.slice(0, 200),
      hasContract: !!s.contract,
      useWhenCount: s.contract?.use_when.length ?? 0
    };
    process.stdout.write(JSON.stringify(out) + "\n");
  }
}
async function cmdRoute(args) {
  const task = args.flags.get("task") ?? "";
  if (!task) fail("--task is required");
  const top = parseInt(args.flags.get("top") ?? "5", 10);
  const deep = args.flags.has("deep");
  const compose = args.flags.has("compose");
  const refsK = parseInt(args.flags.get("refs") ?? "5", 10);
  const topKArg = Math.min(5, Math.max(1, parseInt(args.flags.get("top-k") ?? "3", 10) || 3));
  const skills = await loadSkills(args.flags.get("root"));
  if (skills.length === 0) {
    process.stdout.write(JSON.stringify({ task, top: [], warning: "no skills found" }) + "\n");
    return;
  }
  const ranker = new SkillRanker(skills);
  const ctx = { instruction: task, files: [] };
  const rankedAll = ranker.rank(ctx);
  const ranked = rankedAll.slice(0, top);
  const out = {
    task,
    skill_count: skills.length,
    top: ranked.map((r) => ({
      name: r.name,
      combinedScore: Number(r.combinedScore.toFixed(4)),
      triggerScore: Number(r.triggerScore.toFixed(4)),
      bm25Score: Number(r.bm25Score.toFixed(4)),
      disqualified: r.disqualified,
      positiveHits: r.trigger.positiveHits,
      totalPositive: r.trigger.totalPositive,
      negativeHits: r.trigger.negativeHits,
      matchedClauses: r.trigger.matchedClauses
    }))
  };
  if (compose) {
    const { compositions, provenance } = await loadCompositions();
    if (provenance) out.provenance = provenance;
    const recipeMatches = matchCompositions(task, compositions, { minScore: 0.5, maxResults: 3 });
    out.compositions = recipeMatches.map((m) => ({
      id: m.composition.id,
      name: m.composition.name,
      skills: m.composition.skills,
      notes: m.composition.notes,
      lifecycle: recipeStatus(m.composition),
      score: m.score
    }));
    const chains = findLinearChains(rankedAll, { minScore: 0.3, maxChains: 5 });
    out.chains = chains.map((c) => ({
      skills: c.skills.map((s) => s.name),
      score: Number(c.totalScore.toFixed(4)),
      reason: c.reason
    }));
    const TOP_HIGH = 0.4;
    const cls = classifyConflict(
      ranked,
      recipeMatches,
      TOP_HIGH
    );
    const maturity = cls.recipe ? recipeStatus(recipeMatches[0].composition) : null;
    const HIGH_CONF = 0.6;
    const kitOpts = topKits(ranked, HIGH_CONF, topKArg);
    const routing = {
      status: cls.status,
      top: cls.top ? { name: cls.top.name, combinedScore: Number(cls.top.combinedScore.toFixed(4)), band: band(cls.top.combinedScore) } : null,
      top_k: kitOpts.map((k) => ({ name: k.name, combinedScore: Number(k.combinedScore.toFixed(4)), band: band(k.combinedScore) })),
      recipes: cls.recipe ? [{ id: cls.recipe.id, skills: cls.recipe.skills, score: Number(cls.recipe.score.toFixed(4)), band: band(cls.recipe.score), maturity }] : [],
      top_in_recipe: cls.top_in_recipe
    };
    let directive;
    if (cls.status === "conflict") {
      const kitMenu = kitOpts.length ? kitOpts.map((k) => `${k.name} (${k.combinedScore.toFixed(2)})`).join(", ") : null;
      const option2 = kitMenu ? `  2. One of the top high-confidence Kits: ${kitMenu} (single-Kit choices, see routing.top_k).
` : `  2. (no high-confidence single Kit alternative this time.)
`;
      directive = `CONFLICT: the curated recipe and the top-ranked Kit disagree. Do NOT silently pick. Ask the human to choose one of:
  1. Recipe bundle "${cls.recipe.id}" [${cls.recipe.skills.join(", ")}] \u2014 recommended (curated multi-Kit answer; maturity: ${maturity}).
` + option2 + `  3. Specify the Kit(s) yourself.
Wait for the human's selection, then proceed with exactly that. Do not override their choice. Note: deep_references below reflect the top-ranked Kit only until the human picks.`;
      out.bundle = cls.top ? [cls.top.name] : [];
      out.bundle_source = "ask-human";
    } else if (cls.status === "agree") {
      directive = `Recipe "${cls.recipe.id}" [${cls.recipe.skills.join(", ")}] \u2014 the top-ranked Kit (${cls.top?.name}) is part of it. Proceed with the recipe bundle. Recipe maturity: ${maturity}.`;
      out.bundle = cls.recipe.skills;
      out.bundle_source = "recipe";
    } else if (cls.status === "single_kit") {
      directive = `No curated recipe matched; single-Kit task: use ${cls.top.name} (score ${cls.top.combinedScore.toFixed(2)}). Reference docs in \`deep_references\`.`;
      out.bundle = [cls.top.name];
      out.bundle_source = "top-kit";
    } else {
      directive = `Uncertain \u2014 no recipe matched and the top Kit (${cls.top?.name ?? "none"}, score ${(cls.top?.combinedScore ?? 0).toFixed(2)}) is a weak match. Browse the harmonyos-sdk-skill meta-index, or ask the user to clarify the feature.`;
      out.bundle = [];
      out.bundle_source = "none";
    }
    routing.directive = directive;
    out.routing = routing;
    out.recommendation = directive;
  }
  if (deep && ranked.length > 0) {
    const targets = [];
    const seen = /* @__PURE__ */ new Set();
    const pushTarget = (k) => {
      if (k && !seen.has(k)) {
        seen.add(k);
        targets.push(k);
      }
    };
    pushTarget(ranked[0].name);
    if (Array.isArray(out.bundle)) for (const k of out.bundle) pushTarget(k);
    const deepRefs = {};
    const missing = [];
    for (const kit of targets) {
      const manifest = await loadReferenceManifest(kit);
      if (manifest) {
        deepRefs[kit] = rankReferences(task, manifest.references, { topK: refsK });
      } else {
        missing.push(kit);
      }
    }
    out.deep_references = deepRefs;
    if (missing.length > 0) out.deep_references_no_manifest = missing;
  }
  process.stdout.write(JSON.stringify(out) + "\n");
}
async function cmdVerify(args) {
  const skillName = args.flags.get("skill");
  if (!skillName) fail("--skill is required");
  let output = args.flags.get("output") ?? "";
  if (output === "-") {
    output = await readStdin();
  } else if (output.startsWith("@")) {
    output = await readFile3(output.slice(1), "utf-8");
  }
  if (!output) fail("--output is required (use '-' for stdin or @path for a file)");
  const skills = await loadSkills(args.flags.get("root"));
  const skill = skills.find((s) => s.name === skillName);
  if (!skill) fail(`unknown skill: ${skillName}`);
  if (!skill.contract || skill.contract.postconditions.length === 0) {
    process.stdout.write(
      JSON.stringify({
        skill: skillName,
        satisfied: true,
        results: [],
        note: "no postconditions declared"
      }) + "\n"
    );
    return;
  }
  const result = await verifySkill(
    skill.name,
    skill.contract.postconditions,
    {
      text: output,
      safetyTier: skill.contract.safety_tier
    },
    { mode: "gated" }
  );
  process.stdout.write(JSON.stringify({ skill: skill.name, ...result }) + "\n");
}
function readStdin() {
  return new Promise((resolveP, rejectP) => {
    let buf = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => buf += chunk);
    process.stdin.on("end", () => resolveP(buf));
    process.stdin.on("error", rejectP);
  });
}
function printHelp() {
  process.stdout.write(`verikit \u2014 VeriKit CLI for Claude Code

Commands:
  verikit list-skills [--root <dir>]
  verikit route --task <text> [--root <dir>] [--top <n>] [--compose] [--deep] [--refs <k>]
  verikit verify --skill <name> --output <text>|@file|- [--root <dir>]

The hook and slash command run \`route\` with \`--top 5 --compose --deep --refs 5\`
by default \u2014 top-K kits, matched recipe bundle, and the top-K task-relevant
references for every relevant Kit, all in one call.

Environment:
  VERIKIT_SKILL_ROOT     Default skill discovery root (overrides bundled ./skills).
  VERIKIT_CONTRACTS_DIR  Override sidecar-contracts directory.
  VERIKIT_MANIFESTS_DIR  Override reference-manifests directory.
`);
}
async function main() {
  const args = parseArgs(process.argv);
  switch (args.command) {
    case "list-skills":
      return cmdListSkills(args);
    case "route":
      return cmdRoute(args);
    case "verify":
      return cmdVerify(args);
    case "":
    case "help":
    case "--help":
    case "-h":
      printHelp();
      return;
    default:
      fail(`unknown command: ${args.command}`);
  }
}
main().catch((err) => {
  process.stderr.write(`verikit: ${err.message}
`);
  process.exit(1);
});
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
*/
