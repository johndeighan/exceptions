// Generated by CoffeeScript 2.7.0
// log.test.coffee
var Node1, Node2, fourSpaces, node1, node2, subtype, type;

import test from 'ava';

import {
  undef,
  defined,
  notdefined,
  pass,
  jsType
} from '@jdeighan/exceptions/utils';

import {
  getPrefix
} from '@jdeighan/exceptions/prefix';

import {
  logWidth,
  sep_dash,
  sep_eq,
  stringify,
  setLogWidth,
  resetLogWidth,
  debugLogging,
  setStringifier,
  resetStringifier,
  setLogger,
  resetLogger,
  tamlStringify,
  orderedStringify,
  LOG,
  LOGVALUE,
  LOGTAML,
  utReset,
  utGetLog
} from '@jdeighan/exceptions/log';

fourSpaces = '    ';

// ---------------------------------------------------------------------------
test("line 23", (t) => {
  return t.is(logWidth, 42);
});

test("line 25", (t) => {
  setLogWidth(5);
  t.is(logWidth, 5);
  t.is(sep_dash, '-----');
  return resetLogWidth();
});

test("line 31", (t) => {
  setLogWidth(5);
  t.is(logWidth, 5);
  t.is(sep_eq, '=====');
  return resetLogWidth();
});

// ---------------------------------------------------------------------------
test("line 39", (t) => {
  return t.is(getPrefix(0), '');
});

test("line 40", (t) => {
  return t.is(getPrefix(1), fourSpaces);
});

test("line 41", (t) => {
  return t.is(getPrefix(2), fourSpaces + fourSpaces);
});

// ---------------------------------------------------------------------------
test("line 45", (t) => {
  utReset();
  LOG("abc");
  return t.is(utGetLog(), `abc`);
});

test("line 52", (t) => {
  utReset();
  LOG("abc");
  LOG("def");
  return t.is(utGetLog(), `abc
def`);
});

test("line 61", (t) => {
  utReset();
  LOG("abc");
  LOG("def", getPrefix(1));
  LOG("ghi", getPrefix(2));
  return t.is(utGetLog(), `abc
    def
        ghi`);
});

// ---------------------------------------------------------------------------
test("line 74", (t) => {
  utReset();
  LOGVALUE('x', undef);
  return t.is(utGetLog(), `x = undef`);
});

test("line 81", (t) => {
  utReset();
  LOGVALUE('x', null);
  return t.is(utGetLog(), `x = null`);
});

test("line 88", (t) => {
  utReset();
  LOGVALUE('x', 'abc');
  return t.is(utGetLog(), `x = 'abc'`);
});

test("line 95", (t) => {
  utReset();
  LOGVALUE('x', 'abc def');
  return t.is(utGetLog(), `x = 'abc??def'`);
});

test("line 102", (t) => {
  utReset();
  LOGVALUE('x', '"abc"');
  return t.is(utGetLog(), `x = '"abc"'`);
});

test("line 109", (t) => {
  utReset();
  LOGVALUE('x', "'abc'");
  return t.is(utGetLog(), `x = "'abc'"`);
});

test("line 116", (t) => {
  utReset();
  LOGVALUE('x', "'\"abc\"'");
  return t.is(utGetLog(), `x = <'"abc"'>`);
});

// --- long string
test("line 125", (t) => {
  utReset();
  LOGVALUE('x', 'a'.repeat(80));
  return t.is(utGetLog(), `x = \"\"\"
	${'a'.repeat(80)}
	\"\"\"`);
});

// --- multi line string
test("line 136", (t) => {
  utReset();
  LOGVALUE('x', 'abc\ndef');
  return t.is(utGetLog(), `x = 'abc??def'`);
});

// --- hash (OL doesn't fit)
test("line 145", (t) => {
  utReset();
  setLogWidth(5);
  LOGVALUE('h', {
    xyz: 42,
    abc: 99
  });
  resetLogWidth();
  return t.is(utGetLog(), `h =
	---
	abc: 99
	xyz: 42`);
});

// --- hash (OL fits)
test("line 159", (t) => {
  utReset();
  LOGVALUE('h', {
    xyz: 42,
    abc: 99
  });
  return t.is(utGetLog(), `h = {"xyz":42,"abc":99}`);
});

// --- array  (OL doesn't fit)
test("line 168", (t) => {
  utReset();
  setLogWidth(5);
  LOGVALUE('l', ['xyz', 42, false, undef]);
  resetLogWidth();
  return t.is(utGetLog(), `l =
	---
	- xyz
	- 42
	- false
	- undef`);
});

// --- array (OL fits)
test("line 184", (t) => {
  utReset();
  LOGVALUE('l', ['xyz', 42, false, undef]);
  return t.is(utGetLog(), `l = ["xyz",42,false,null]`);
});

// --- object
Node1 = class Node1 {
  constructor(str, level) {
    this.str = str;
    this.level = level;
    this.name = 'node1';
  }

};

node1 = new Node1('abc', 2);

test("line 198", (t) => {
  utReset();
  LOGVALUE('Node1', node1);
  return t.is(utGetLog(), `Node1 =
	---
	level: 2
	name: node1
	str: abc`);
});

// --- object with toString method
Node2 = class Node2 {
  constructor(str, level) {
    this.str = str;
    this.level = level;
    this.name = 'node2';
  }

  toLogString() {
    return `HERE IT IS
str is ${this.str}
name is ${this.name}
level is ${this.level}
THAT'S ALL FOLKS!`;
  }

};

node2 = new Node2('abc', 2);

[type, subtype] = jsType(node2);

test("line 228", (t) => {
  utReset();
  LOGVALUE('Node2', node2);
  return t.is(utGetLog(), `Node2 =
	HERE IT IS
	str is abc
	name is node2
	level is 2
	THAT'S ALL FOLKS!`);
});

test("line 240", (t) => {
  var hProc;
  utReset();
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
  LOGVALUE('hProc', hProc);
  return t.is(utGetLog(), `hProc =
	---
	Script: '[Function: Script]'
	code: '[Function: code]'
	html: '[Function: html]'`);
});

test("line 259", (t) => {
  utReset();
  setLogWidth(5);
  LOGTAML('lItems', ['xyz', 42, false, undef]);
  resetLogWidth();
  return t.is(utGetLog(), `lItems =
	---
	- xyz
	- 42
	- false
	- undef`);
});
