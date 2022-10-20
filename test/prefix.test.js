// Generated by CoffeeScript 2.7.0
// prefix.test.coffee
var un;

import test from 'ava';

import {
  undef,
  defined,
  notdefined,
  pass,
  unescapeStr
} from '@jdeighan/exceptions/utils';

import {
  getPrefix
} from '@jdeighan/exceptions/prefix';

un = unescapeStr;

// ---------------------------------------------------------------------------
test("line 16", (t) => {
  return t.is(getPrefix(2), un('˳˳˳˳˳˳˳˳'));
});

test("line 17", (t) => {
  return t.is(getPrefix(2, 'plain'), un('│˳˳˳│˳˳˳'));
});

test("line 18", (t) => {
  return t.is(getPrefix(2, 'withArrow'), un('│˳˳˳└─>˳'));
});

test("line 19", (t) => {
  return t.is(getPrefix(2, 'noLastVbar'), un('│˳˳˳˳˳˳˳'));
});

test("line 20", (t) => {
  return t.is(getPrefix(2, 'noLast2Vbars'), un('˳˳˳˳˳˳˳˳'));
});

test("line 22", (t) => {
  return t.is(getPrefix(2, 'dotLast2Vbars'), un('.˳˳˳˳˳˳˳'));
});

test("line 23", (t) => {
  return t.is(getPrefix(2), un('˳˳˳˳˳˳˳˳'));
});
