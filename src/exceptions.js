// Generated by CoffeeScript 2.7.0
  // exceptions.coffee
var doHaltOnError, doLog, getCallers,
  indexOf = [].indexOf;

import yaml from 'js-yaml';

import {
  undef,
  sep_dash,
  sep_eq,
  isString,
  untabify,
  LOG,
  toTAML
} from '@jdeighan/exceptions/utils';

doHaltOnError = false;

doLog = true;

// ---------------------------------------------------------------------------
export var haltOnError = function(flag = true) {
  var save;
  // --- return existing setting
  save = doHaltOnError;
  doHaltOnError = flag;
  return save;
};

// ---------------------------------------------------------------------------
export var logErrors = function(flag = true) {
  var save;
  save = doLog;
  doLog = flag;
  return save;
};

// ---------------------------------------------------------------------------
getCallers = function(stackTrace, lExclude = []) {
  var _, caller, iter, lCallers, lMatches;
  iter = stackTrace.matchAll(/at\s+(?:async\s+)?([^\s(]+)/g);
  if (!iter) {
    return ["<unknown>"];
  }
  lCallers = [];
  for (lMatches of iter) {
    [_, caller] = lMatches;
    if (caller.indexOf('file://') === 0) {
      break;
    }
    if (indexOf.call(lExclude, caller) < 0) {
      lCallers.push(caller);
    }
  }
  return lCallers;
};

// ---------------------------------------------------------------------------
//   assert - mimic nodejs's assert
//   return true so we can use it in boolean expressions
export var assert = function(cond, msg) {
  var caller, i, lCallers, len, stackTrace;
  if (!cond) {
    if (doLog) {
      stackTrace = new Error().stack;
      lCallers = getCallers(stackTrace, ['assert']);
      console.log('--------------------');
      console.log('JavaScript CALL STACK:');
      for (i = 0, len = lCallers.length; i < len; i++) {
        caller = lCallers[i];
        console.log(`   ${caller}`);
      }
      console.log('--------------------');
      console.log(`ERROR: ${msg} (in ${lCallers[0]}())`);
    }
    croak(msg);
  }
  return true;
};

// ---------------------------------------------------------------------------
//   croak - throws an error after possibly printing useful info
//           err can be a string or an Error object
export var croak = function(err, label = undef, obj = undef) {
  var curmsg, newmsg;
  if (isString(err)) {
    curmsg = err;
  } else {
    curmsg = err.message;
  }
  if (isEmpty(label)) {
    newmsg = `ERROR (croak): ${curmsg}`;
  } else {
    newmsg = `ERROR (croak): ${curmsg}
${label}:
${toTAML(obj)}`;
  }
  if (doHaltOnError) {
    LOG(newmsg);
    return process.exit();
  } else {
    // --- re-throw the error
    throw new Error(newmsg);
  }
};
