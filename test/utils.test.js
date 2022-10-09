// Generated by CoffeeScript 2.7.0
// utils.test.coffee
var NewClass, h, hEsc, l, n, n2, o, s, s2;

import test from 'ava';

import {
  assert,
  croak
} from '@jdeighan/exceptions';

import {
  undef,
  sep_dash,
  sep_eq,
  pass,
  defined,
  notdefined,
  untabify,
  toTAML,
  escapeStr,
  OL,
  jsType,
  isString,
  isNumber,
  isInteger,
  isHash,
  isArray,
  isBoolean,
  isConstructor,
  isFunction,
  isRegExp,
  isObject,
  LOG,
  DEBUG,
  isEmpty,
  nonEmpty,
  blockToArray,
  arrayToBlock,
  chomp,
  rtrim,
  setCharsAt,
  words
} from '@jdeighan/exceptions/utils';

import {
  log,
  setLogger,
  resetLogger
} from '@jdeighan/exceptions/log';

import {
  setDebugging
} from '@jdeighan/exceptions/debug';

// ---------------------------------------------------------------------------
test("line 23", (t) => {
  return t.is(undef, void 0);
});

test("line 24", (t) => {
  return t.truthy(isFunction(pass));
});

// ---------------------------------------------------------------------------
test("line 28", (t) => {
  return t.truthy(notdefined(undef));
});

test("line 29", (t) => {
  return t.truthy(notdefined(null));
});

test("line 30", (t) => {
  return t.truthy(defined(''));
});

test("line 31", (t) => {
  return t.truthy(defined(5));
});

test("line 32", (t) => {
  return t.truthy(defined([]));
});

test("line 33", (t) => {
  return t.truthy(defined({}));
});

test("line 34", (t) => {
  return t.falsy(defined(undef));
});

test("line 35", (t) => {
  return t.falsy(defined(null));
});

test("line 36", (t) => {
  return t.falsy(notdefined(''));
});

test("line 37", (t) => {
  return t.falsy(notdefined(5));
});

test("line 38", (t) => {
  return t.falsy(notdefined([]));
});

test("line 39", (t) => {
  return t.falsy(notdefined({}));
});

// ---------------------------------------------------------------------------
(function() {
  var prefix;
  prefix = '   '; // 3 spaces
  return test("line 46", (t) => {
    return t.is(untabify(`first line
\tsecond line
\t\tthird line`, 3), `first line
${prefix}second line
${prefix}${prefix}third line`);
  });
})();

// ---------------------------------------------------------------------------
test("line 59", (t) => {
  return t.is(toTAML({
    a: 1
  }), "---\na: 1");
});

test("line 60", (t) => {
  return t.is(toTAML({
    a: 1,
    b: 2
  }), "---\na: 1\nb: 2");
});

test("line 61", (t) => {
  return t.is(toTAML([
    1,
    'abc',
    {
      a: 1
    }
  ]), "---\n- 1\n- abc\n-\n   a: 1");
});

test("line 63", (t) => {
  return t.is(toTAML({
    a: 1,
    b: 2
  }), `---
a: 1
b: 2`);
});

test("line 69", (t) => {
  return t.is(toTAML(['a', 'b']), `---
- a
- b`);
});

test("line 75", (t) => {
  return t.is(toTAML([
    'a',
    'b',
    {
      a: 1
    },
    ['x']
  ]), untabify(`---
- a
- b
-
	a: 1
-
	- x`));
});

// ---------------------------------------------------------------------------
test("line 87", (t) => {
  return t.is(escapeStr("\t\tXXX\n"), "→→XXX®");
});

hEsc = {
  "\n": "\\n",
  "\t": "\\t",
  "\"": "\\\""
};

test("line 95", (t) => {
  return t.is(escapeStr("\thas quote: \"\nnext line", hEsc), "\\thas quote: \\\"\\nnext line");
});

// ---------------------------------------------------------------------------
test("line 100", (t) => {
  return t.is(OL(undef), "undef");
});

test("line 101", (t) => {
  return t.is(OL("\t\tabc\nxyz"), "'→→abc®xyz'");
});

test("line 102", (t) => {
  return t.is(OL({
    a: 1,
    b: 'xyz'
  }), '{"a":1,"b":"xyz"}');
});

// ---------------------------------------------------------------------------
NewClass = class NewClass {
  constructor(name = 'bob') {
    this.name = name;
    this.doIt = pass;
  }

};

h = {
  a: 1,
  b: 2
};

l = [1, 2, 2];

o = new NewClass();

n = 42;

n2 = new Number(42);

s = 'simple';

s2 = new String('abc');

test("line 120", (t) => {
  return t.falsy(isString(undef));
});

test("line 121", (t) => {
  return t.falsy(isString(h));
});

test("line 122", (t) => {
  return t.falsy(isString(l));
});

test("line 123", (t) => {
  return t.falsy(isString(o));
});

test("line 124", (t) => {
  return t.falsy(isString(n));
});

test("line 125", (t) => {
  return t.falsy(isString(n2));
});

test("line 127", (t) => {
  return t.truthy(isString(s));
});

test("line 128", (t) => {
  return t.truthy(isString(s2));
});

test("line 130", (t) => {
  return t.falsy(isNumber(h));
});

test("line 131", (t) => {
  return t.falsy(isNumber(l));
});

test("line 132", (t) => {
  return t.falsy(isNumber(o));
});

test("line 133", (t) => {
  return t.truthy(isNumber(n));
});

test("line 134", (t) => {
  return t.truthy(isNumber(n2));
});

test("line 135", (t) => {
  return t.falsy(isNumber(s));
});

test("line 136", (t) => {
  return t.falsy(isNumber(s2));
});

test("line 138", (t) => {
  return t.truthy(isNumber(42.0, {
    min: 42.0
  }));
});

test("line 139", (t) => {
  return t.falsy(isNumber(42.0, {
    min: 42.1
  }));
});

test("line 140", (t) => {
  return t.truthy(isNumber(42.0, {
    max: 42.0
  }));
});

test("line 141", (t) => {
  return t.falsy(isNumber(42.0, {
    max: 41.9
  }));
});

test("line 143", (t) => {
  return t.truthy(isInteger(42));
});

test("line 144", (t) => {
  return t.truthy(isInteger(new Number(42)));
});

test("line 145", (t) => {
  return t.falsy(isInteger('abc'));
});

test("line 146", (t) => {
  return t.falsy(isInteger({}));
});

test("line 147", (t) => {
  return t.falsy(isInteger([]));
});

test("line 148", (t) => {
  return t.truthy(isInteger(42, {
    min: 0
  }));
});

test("line 149", (t) => {
  return t.falsy(isInteger(42, {
    min: 50
  }));
});

test("line 150", (t) => {
  return t.truthy(isInteger(42, {
    max: 50
  }));
});

test("line 151", (t) => {
  return t.falsy(isInteger(42, {
    max: 0
  }));
});

test("line 153", (t) => {
  return t.truthy(isHash(h));
});

test("line 154", (t) => {
  return t.falsy(isHash(l));
});

test("line 155", (t) => {
  return t.falsy(isHash(o));
});

test("line 156", (t) => {
  return t.falsy(isHash(n));
});

test("line 157", (t) => {
  return t.falsy(isHash(n2));
});

test("line 158", (t) => {
  return t.falsy(isHash(s));
});

test("line 159", (t) => {
  return t.falsy(isHash(s2));
});

test("line 161", (t) => {
  return t.falsy(isArray(h));
});

test("line 162", (t) => {
  return t.truthy(isArray(l));
});

test("line 163", (t) => {
  return t.falsy(isArray(o));
});

test("line 164", (t) => {
  return t.falsy(isArray(n));
});

test("line 165", (t) => {
  return t.falsy(isArray(n2));
});

test("line 166", (t) => {
  return t.falsy(isArray(s));
});

test("line 167", (t) => {
  return t.falsy(isArray(s2));
});

test("line 169", (t) => {
  return t.truthy(isBoolean(true));
});

test("line 170", (t) => {
  return t.truthy(isBoolean(false));
});

test("line 171", (t) => {
  return t.falsy(isBoolean(42));
});

test("line 172", (t) => {
  return t.falsy(isBoolean("true"));
});

test("line 174", (t) => {
  return t.truthy(isConstructor(NewClass));
});

test("line 175", (t) => {
  return t.falsy(isConstructor(o));
});

test("line 177", (t) => {
  return t.truthy(isFunction(function() {
    return 42;
  }));
});

test("line 178", (t) => {
  return t.truthy(isFunction(() => {
    return 42;
  }));
});

test("line 179", (t) => {
  return t.falsy(isFunction(42));
});

test("line 180", (t) => {
  return t.falsy(isFunction(n));
});

test("line 182", (t) => {
  return t.truthy(isRegExp(/^abc$/));
});

test("line 183", (t) => {
  return t.truthy(isRegExp(/^\s*where\s+areyou$/));
});

test("line 184", (t) => {
  return t.falsy(isRegExp(42));
});

test("line 185", (t) => {
  return t.falsy(isRegExp('abc'));
});

test("line 186", (t) => {
  return t.falsy(isRegExp([1, 'a']));
});

test("line 187", (t) => {
  return t.falsy(isRegExp({
    a: 1,
    b: 'ccc'
  }));
});

test("line 188", (t) => {
  return t.falsy(isRegExp(undef));
});

test("line 190", (t) => {
  return t.truthy(isRegExp(/\.coffee/));
});

test("line 192", (t) => {
  return t.falsy(isObject(h));
});

test("line 193", (t) => {
  return t.falsy(isObject(l));
});

test("line 194", (t) => {
  return t.truthy(isObject(o));
});

test("line 195", (t) => {
  return t.truthy(isObject(o, ['name', 'doIt']));
});

test("line 196", (t) => {
  return t.falsy(isObject(o, ['name', 'doIt', 'missing']));
});

test("line 197", (t) => {
  return t.falsy(isObject(n));
});

test("line 198", (t) => {
  return t.falsy(isObject(n2));
});

test("line 199", (t) => {
  return t.falsy(isObject(s));
});

test("line 200", (t) => {
  return t.falsy(isObject(s2));
});

test("line 202", (t) => {
  return t.truthy(isEmpty(''));
});

test("line 203", (t) => {
  return t.truthy(isEmpty('  \t\t'));
});

test("line 204", (t) => {
  return t.truthy(isEmpty([]));
});

test("line 205", (t) => {
  return t.truthy(isEmpty({}));
});

test("line 207", (t) => {
  return t.truthy(nonEmpty('a'));
});

test("line 208", (t) => {
  return t.truthy(nonEmpty('.'));
});

test("line 209", (t) => {
  return t.truthy(nonEmpty([2]));
});

test("line 210", (t) => {
  return t.truthy(nonEmpty({
    width: 2
  }));
});

// ---------------------------------------------------------------------------
test("line 214", (t) => {
  return t.deepEqual(blockToArray("abc\nxyz\n"), ['abc', 'xyz']);
});

test("line 219", (t) => {
  return t.deepEqual(blockToArray("abc\nxyz\n\n\n\n"), ['abc', 'xyz']);
});

test("line 224", (t) => {
  return t.deepEqual(blockToArray("abc\n\nxyz\n"), ['abc', '', 'xyz']);
});

// ---------------------------------------------------------------------------
test("line 232", (t) => {
  return t.deepEqual(arrayToBlock(['a', 'b', 'c']), "a\nb\nc");
});

test("line 233", (t) => {
  return t.deepEqual(arrayToBlock(['a', undef, 'b', 'c']), "a\nb\nc");
});

test("line 324", (t) => {
  return t.deepEqual(arrayToBlock([undef, 'a', 'b', 'c', undef]), "a\nb\nc");
});

// ---------------------------------------------------------------------------
test("line 238", (t) => {
  return t.is(chomp('abc'), 'abc');
});

test("line 239", (t) => {
  return t.is(chomp('abc\n'), 'abc');
});

test("line 240", (t) => {
  return t.is(chomp('abc\r\n'), 'abc');
});

test("line 242", (t) => {
  return t.is(chomp('abc\ndef'), 'abc\ndef');
});

test("line 243", (t) => {
  return t.is(chomp('abc\ndef\n'), 'abc\ndef');
});

test("line 244", (t) => {
  return t.is(chomp('abc\ndef\r\n'), 'abc\ndef');
});

test("line 246", (t) => {
  return t.is(chomp('abc\r\ndef'), 'abc\r\ndef');
});

test("line 247", (t) => {
  return t.is(chomp('abc\r\ndef\n'), 'abc\r\ndef');
});

test("line 248", (t) => {
  return t.is(chomp('abc\r\ndef\r\n'), 'abc\r\ndef');
});

// ---------------------------------------------------------------------------
test("line 252", (t) => {
  return t.is(rtrim("abc"), "abc");
});

test("line 253", (t) => {
  return t.is(rtrim("  abc"), "  abc");
});

test("line 254", (t) => {
  return t.is(rtrim("abc  "), "abc");
});

test("line 255", (t) => {
  return t.is(rtrim("  abc  "), "  abc");
});

// ---------------------------------------------------------------------------
test("line 259", (t) => {
  return t.is(setCharsAt('abc', 1, 'x'), 'axc');
});

test("line 260", (t) => {
  return t.is(setCharsAt('abc', 1, 'xy'), 'axy');
});

test("line 261", (t) => {
  return t.is(setCharsAt('abc', 1, 'xyz'), 'axyz');
});

// ---------------------------------------------------------------------------
test("line 265", (t) => {
  return t.deepEqual(words('a b c'), ['a', 'b', 'c']);
});

test("line 266", (t) => {
  return t.deepEqual(words('  a   b   c  '), ['a', 'b', 'c']);
});
