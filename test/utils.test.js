// Generated by CoffeeScript 2.7.0
// utils.test.coffee
var hEsc, hProc;

import test from 'ava';

import {
  undef,
  pass,
  defined,
  notdefined,
  untabify,
  prefixBlock,
  escapeStr,
  unescapeStr,
  OL,
  inList,
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
  jsType,
  isEmpty,
  nonEmpty,
  blockToArray,
  arrayToBlock,
  chomp,
  rtrim,
  setCharsAt,
  words,
  firstWord,
  hasChar,
  quoted,
  getOptions
} from '@jdeighan/exceptions/utils';

// ---------------------------------------------------------------------------
test("line 19", (t) => {
  return t.is(undef, void 0);
});

test("line 21", (t) => {
  return t.truthy(isFunction(pass));
});

(function() {
  var passTest;
  passTest = () => {
    return pass();
  };
  return test("line 26", (t) => {
    return t.notThrows(passTest, "pass fails");
  });
})();

test("line 29", (t) => {
  return t.truthy(defined(''));
});

test("line 30", (t) => {
  return t.truthy(defined(5));
});

test("line 31", (t) => {
  return t.truthy(defined([]));
});

test("line 32", (t) => {
  return t.truthy(defined({}));
});

test("line 33", (t) => {
  return t.falsy(defined(undef));
});

test("line 34", (t) => {
  return t.falsy(defined(null));
});

test("line 36", (t) => {
  return t.truthy(notdefined(undef));
});

test("line 37", (t) => {
  return t.truthy(notdefined(null));
});

test("line 38", (t) => {
  return t.falsy(notdefined(''));
});

test("line 39", (t) => {
  return t.falsy(notdefined(5));
});

test("line 40", (t) => {
  return t.falsy(notdefined([]));
});

test("line 41", (t) => {
  return t.falsy(notdefined({}));
});

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
  return t.is(prefixBlock(`abc
def`, '--'), `--abc
--def`);
});

// ---------------------------------------------------------------------------
test("line 69", (t) => {
  return t.is(escapeStr("\t\tXXX\n"), "??????XXX??");
});

hEsc = {
  "\n": "\\n",
  "\t": "\\t",
  "\"": "\\\""
};

test("line 77", (t) => {
  return t.is(escapeStr("\thas quote: \"\nnext line", hEsc), "\\thas quote: \\\"\\nnext line");
});

test("line 80", (t) => {
  return t.is(unescapeStr("??????"), "   ");
});

test("line 81", (t) => {
  return t.is(unescapeStr("??????"), "\n\n\n");
});

test("line 82", (t) => {
  return t.is(unescapeStr("?????????"), "\t\t\t");
});

// ---------------------------------------------------------------------------
test("line 86", (t) => {
  return t.is(OL(undef), "undef");
});

test("line 87", (t) => {
  return t.is(OL("\t\tabc\nxyz"), "'??????abc??xyz'");
});

test("line 88", (t) => {
  return t.is(OL({
    a: 1,
    b: 'xyz'
  }), '{"a":1,"b":"xyz"}');
});

hProc = {
  code: function(block) {
    return `${block};`;
  },
  html: function(block) {
    return block.replace('<p>', '<p> ').replace('</p>', ' </p>');
  },
  Script: function(block) {
    return elem('script', undef, block, "\t");
  }
};

test("line 96", (t) => {
  return t.is(OL(hProc), '{"code":"[Function: code]","html":"[Function: html]","Script":"[Function: Script]"}');
});

// ---------------------------------------------------------------------------
test("line 99", (t) => {
  return t.truthy(inList('a', 'b', 'a', 'c'));
});

test("line 101", (t) => {
  return t.falsy(inList('a', 'b', 'c'));
});

// ---------------------------------------------------------------------------
//        jsTypes:
(function() {
  var NewClass, func1, func2, h, l, n, n2, o, s, s2;
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
  test("line 119", (t) => {
    return t.falsy(isString(undef));
  });
  test("line 120", (t) => {
    return t.falsy(isString(h));
  });
  test("line 121", (t) => {
    return t.falsy(isString(l));
  });
  test("line 122", (t) => {
    return t.falsy(isString(o));
  });
  test("line 123", (t) => {
    return t.falsy(isString(n));
  });
  test("line 124", (t) => {
    return t.falsy(isString(n2));
  });
  test("line 126", (t) => {
    return t.truthy(isString(s));
  });
  test("line 127", (t) => {
    return t.truthy(isString(s2));
  });
  test("line 129", (t) => {
    return t.falsy(isNumber(h));
  });
  test("line 130", (t) => {
    return t.falsy(isNumber(l));
  });
  test("line 131", (t) => {
    return t.falsy(isNumber(o));
  });
  test("line 132", (t) => {
    return t.truthy(isNumber(n));
  });
  test("line 133", (t) => {
    return t.truthy(isNumber(n2));
  });
  test("line 134", (t) => {
    return t.falsy(isNumber(s));
  });
  test("line 135", (t) => {
    return t.falsy(isNumber(s2));
  });
  test("line 137", (t) => {
    return t.truthy(isNumber(42.0, {
      min: 42.0
    }));
  });
  test("line 138", (t) => {
    return t.falsy(isNumber(42.0, {
      min: 42.1
    }));
  });
  test("line 139", (t) => {
    return t.truthy(isNumber(42.0, {
      max: 42.0
    }));
  });
  test("line 140", (t) => {
    return t.falsy(isNumber(42.0, {
      max: 41.9
    }));
  });
  test("line 142", (t) => {
    return t.truthy(isInteger(42));
  });
  test("line 143", (t) => {
    return t.truthy(isInteger(new Number(42)));
  });
  test("line 144", (t) => {
    return t.falsy(isInteger('abc'));
  });
  test("line 145", (t) => {
    return t.falsy(isInteger({}));
  });
  test("line 146", (t) => {
    return t.falsy(isInteger([]));
  });
  test("line 147", (t) => {
    return t.truthy(isInteger(42, {
      min: 0
    }));
  });
  test("line 148", (t) => {
    return t.falsy(isInteger(42, {
      min: 50
    }));
  });
  test("line 149", (t) => {
    return t.truthy(isInteger(42, {
      max: 50
    }));
  });
  test("line 150", (t) => {
    return t.falsy(isInteger(42, {
      max: 0
    }));
  });
  test("line 152", (t) => {
    return t.truthy(isHash(h));
  });
  test("line 153", (t) => {
    return t.falsy(isHash(l));
  });
  test("line 154", (t) => {
    return t.falsy(isHash(o));
  });
  test("line 155", (t) => {
    return t.falsy(isHash(n));
  });
  test("line 156", (t) => {
    return t.falsy(isHash(n2));
  });
  test("line 157", (t) => {
    return t.falsy(isHash(s));
  });
  test("line 158", (t) => {
    return t.falsy(isHash(s2));
  });
  test("line 160", (t) => {
    return t.falsy(isArray(h));
  });
  test("line 161", (t) => {
    return t.truthy(isArray(l));
  });
  test("line 162", (t) => {
    return t.falsy(isArray(o));
  });
  test("line 163", (t) => {
    return t.falsy(isArray(n));
  });
  test("line 164", (t) => {
    return t.falsy(isArray(n2));
  });
  test("line 165", (t) => {
    return t.falsy(isArray(s));
  });
  test("line 166", (t) => {
    return t.falsy(isArray(s2));
  });
  test("line 168", (t) => {
    return t.truthy(isBoolean(true));
  });
  test("line 169", (t) => {
    return t.truthy(isBoolean(false));
  });
  test("line 170", (t) => {
    return t.falsy(isBoolean(42));
  });
  test("line 171", (t) => {
    return t.falsy(isBoolean("true"));
  });
  test("line 173", (t) => {
    return t.truthy(isConstructor(NewClass));
  });
  test("line 174", (t) => {
    return t.falsy(isConstructor(o));
  });
  test("line 176", (t) => {
    return t.truthy(isFunction(function() {
      return 42;
    }));
  });
  test("line 177", (t) => {
    return t.truthy(isFunction(() => {
      return 42;
    }));
  });
  test("line 178", (t) => {
    return t.falsy(isFunction(42));
  });
  test("line 179", (t) => {
    return t.falsy(isFunction(n));
  });
  test("line 181", (t) => {
    return t.truthy(isRegExp(/^abc$/));
  });
  test("line 182", (t) => {
    return t.truthy(isRegExp(/^\s*where\s+areyou$/));
  });
  test("line 183", (t) => {
    return t.falsy(isRegExp(42));
  });
  test("line 184", (t) => {
    return t.falsy(isRegExp('abc'));
  });
  test("line 185", (t) => {
    return t.falsy(isRegExp([1, 'a']));
  });
  test("line 186", (t) => {
    return t.falsy(isRegExp({
      a: 1,
      b: 'ccc'
    }));
  });
  test("line 187", (t) => {
    return t.falsy(isRegExp(undef));
  });
  test("line 188", (t) => {
    return t.truthy(isRegExp(/\.coffee/));
  });
  test("line 190", (t) => {
    return t.falsy(isObject(h));
  });
  test("line 191", (t) => {
    return t.falsy(isObject(l));
  });
  test("line 192", (t) => {
    return t.truthy(isObject(o));
  });
  test("line 193", (t) => {
    return t.truthy(isObject(o, ['name', 'doIt']));
  });
  test("line 194", (t) => {
    return t.falsy(isObject(o, ['name', 'doIt', 'missing']));
  });
  test("line 195", (t) => {
    return t.falsy(isObject(n));
  });
  test("line 196", (t) => {
    return t.falsy(isObject(n2));
  });
  test("line 197", (t) => {
    return t.falsy(isObject(s));
  });
  test("line 198", (t) => {
    return t.falsy(isObject(s2));
  });
  test("line 200", (t) => {
    return t.deepEqual(jsType(undef), [undef, 'undef']);
  });
  test("line 201", (t) => {
    return t.deepEqual(jsType(null), [undef, 'null']);
  });
  test("line 202", (t) => {
    return t.deepEqual(jsType(s), ['string', undef]);
  });
  test("line 203", (t) => {
    return t.deepEqual(jsType(''), ['string', 'empty']);
  });
  test("line 204", (t) => {
    return t.deepEqual(jsType("\t\t"), ['string', 'empty']);
  });
  test("line 205", (t) => {
    return t.deepEqual(jsType("  "), ['string', 'empty']);
  });
  test("line 206", (t) => {
    return t.deepEqual(jsType(h), ['hash', undef]);
  });
  test("line 207", (t) => {
    return t.deepEqual(jsType({}), ['hash', 'empty']);
  });
  test("line 208", (t) => {
    return t.deepEqual(jsType(3.14159), ['number', undef]);
  });
  test("line 209", (t) => {
    return t.deepEqual(jsType(42), ['number', 'integer']);
  });
  test("line 210", (t) => {
    return t.deepEqual(jsType(true), ['boolean', 'true']);
  });
  test("line 211", (t) => {
    return t.deepEqual(jsType(false), ['boolean', 'false']);
  });
  test("line 212", (t) => {
    return t.deepEqual(jsType(h), ['hash', undef]);
  });
  test("line 213", (t) => {
    return t.deepEqual(jsType({}), ['hash', 'empty']);
  });
  test("line 214", (t) => {
    return t.deepEqual(jsType(l), ['array', undef]);
  });
  test("line 215", (t) => {
    return t.deepEqual(jsType([]), ['array', 'empty']);
  });
  test("line 216", (t) => {
    return t.deepEqual(jsType(/abc/), ['regexp', undef]);
  });
  func1 = function(x) {};
  func2 = (x) => {};
  // --- NOTE: regular functions can't be distinguished from constructors
  test("line 223", (t) => {
    return t.deepEqual(jsType(func1), ['function', 'constructor']);
  });
  test("line 225", (t) => {
    return t.deepEqual(jsType(func2), ['function', undef]);
  });
  test("line 226", (t) => {
    return t.deepEqual(jsType(NewClass), ['function', 'constructor']);
  });
  return test("line 227", (t) => {
    return t.deepEqual(jsType(o), ['object', undef]);
  });
})();

// ---------------------------------------------------------------------------
test("line 232", (t) => {
  return t.truthy(isEmpty(''));
});

test("line 233", (t) => {
  return t.truthy(isEmpty('  \t\t'));
});

test("line 234", (t) => {
  return t.truthy(isEmpty([]));
});

test("line 235", (t) => {
  return t.truthy(isEmpty({}));
});

test("line 237", (t) => {
  return t.truthy(nonEmpty('a'));
});

test("line 238", (t) => {
  return t.truthy(nonEmpty('.'));
});

test("line 239", (t) => {
  return t.truthy(nonEmpty([2]));
});

test("line 240", (t) => {
  return t.truthy(nonEmpty({
    width: 2
  }));
});

// ---------------------------------------------------------------------------
test("line 244", (t) => {
  return t.deepEqual(blockToArray("abc\nxyz\n"), ['abc', 'xyz']);
});

test("line 249", (t) => {
  return t.deepEqual(blockToArray("abc\nxyz\n\n\n\n"), ['abc', 'xyz']);
});

test("line 254", (t) => {
  return t.deepEqual(blockToArray("abc\n\nxyz\n"), ['abc', '', 'xyz']);
});

// ---------------------------------------------------------------------------
test("line 262", (t) => {
  return t.deepEqual(arrayToBlock(['a', 'b', 'c']), "a\nb\nc");
});

test("line 263", (t) => {
  return t.deepEqual(arrayToBlock(['a', undef, 'b', 'c']), "a\nb\nc");
});

test("line 264", (t) => {
  return t.deepEqual(arrayToBlock([undef, 'a', 'b', 'c', undef]), "a\nb\nc");
});

// ---------------------------------------------------------------------------
test("line 268", (t) => {
  return t.is(chomp('abc'), 'abc');
});

test("line 269", (t) => {
  return t.is(chomp('abc\n'), 'abc');
});

test("line 270", (t) => {
  return t.is(chomp('abc\r\n'), 'abc');
});

test("line 272", (t) => {
  return t.is(chomp('abc\ndef'), 'abc\ndef');
});

test("line 273", (t) => {
  return t.is(chomp('abc\ndef\n'), 'abc\ndef');
});

test("line 274", (t) => {
  return t.is(chomp('abc\ndef\r\n'), 'abc\ndef');
});

test("line 276", (t) => {
  return t.is(chomp('abc\r\ndef'), 'abc\r\ndef');
});

test("line 277", (t) => {
  return t.is(chomp('abc\r\ndef\n'), 'abc\r\ndef');
});

test("line 278", (t) => {
  return t.is(chomp('abc\r\ndef\r\n'), 'abc\r\ndef');
});

// ---------------------------------------------------------------------------
test("line 282", (t) => {
  return t.is(rtrim("abc"), "abc");
});

test("line 283", (t) => {
  return t.is(rtrim("  abc"), "  abc");
});

test("line 284", (t) => {
  return t.is(rtrim("abc  "), "abc");
});

test("line 285", (t) => {
  return t.is(rtrim("  abc  "), "  abc");
});

// ---------------------------------------------------------------------------
test("line 289", (t) => {
  return t.is(setCharsAt('abc', 1, 'x'), 'axc');
});

test("line 290", (t) => {
  return t.is(setCharsAt('abc', 1, 'xy'), 'axy');
});

test("line 291", (t) => {
  return t.is(setCharsAt('abc', 1, 'xyz'), 'axyz');
});

// ---------------------------------------------------------------------------
test("line 295", (t) => {
  return t.deepEqual(words(''), []);
});

test("line 296", (t) => {
  return t.deepEqual(words('  \t\t'), []);
});

test("line 297", (t) => {
  return t.deepEqual(words('a b c'), ['a', 'b', 'c']);
});

test("line 298", (t) => {
  return t.deepEqual(words('  a   b   c  '), ['a', 'b', 'c']);
});

test("line 299", (t) => {
  return t.deepEqual(words('a b', 'c d'), ['a', 'b', 'c', 'd']);
});

test("line 300", (t) => {
  return t.deepEqual(words(' my word ', ' is  word  '), ['my', 'word', 'is', 'word']);
});

test("line 302", (t) => {
  return t.is(firstWord("abc"), "abc");
});

test("line 303", (t) => {
  return t.is(firstWord(" abc"), "");
});

test("line 304", (t) => {
  return t.is(firstWord("abc def"), "abc");
});

test("line 305", (t) => {
  return t.is(firstWord("! not this"), "!");
});

test("line 307", (t) => {
  return t.truthy(hasChar('abc', 'b'));
});

test("line 308", (t) => {
  return t.falsy(hasChar('abc', 'x'));
});

test("line 309", (t) => {
  return t.falsy(hasChar("\t\t", ' '));
});

// ---------------------------------------------------------------------------
test("line 313", (t) => {
  return t.is(quoted('abc'), "'abc'");
});

test("line 314", (t) => {
  return t.is(quoted('"abc"'), "'\"abc\"'");
});

test("line 315", (t) => {
  return t.is(quoted("'abc'"), "\"'abc'\"");
});

test("line 316", (t) => {
  return t.is(quoted("'\"abc\"'"), "<'\"abc\"'>");
});

test("line 317", (t) => {
  return t.is(quoted("'\"<abc>\"'"), "<'\"<abc>\"'>");
});

// ---------------------------------------------------------------------------
test("line 321", (t) => {
  return t.deepEqual(getOptions(), {});
});

test("line 322", (t) => {
  return t.deepEqual(getOptions(undef, {
    x: 1
  }), {
    x: 1
  });
});

test("line 323", (t) => {
  return t.deepEqual(getOptions({
    x: 1
  }, {
    x: 3,
    y: 4
  }), {
    x: 1,
    y: 4
  });
});

test("line 324", (t) => {
  return t.deepEqual(getOptions('asText'), {
    asText: true
  });
});

test("line 325", (t) => {
  return t.deepEqual(getOptions('!binary'), {
    binary: false
  });
});

test("line 326", (t) => {
  return t.deepEqual(getOptions('label=this'), {
    label: 'this'
  });
});

test("line 327", (t) => {
  return t.deepEqual(getOptions('asText !binary label=this'), {
    asText: true,
    binary: false,
    label: 'this'
  });
});
