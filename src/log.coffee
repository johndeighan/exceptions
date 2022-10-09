# log.coffee

import {assert, croak} from '@jdeighan/exceptions'
import {
	undef, sep_eq, sep_dash, LOG, escapeStr, pass, OL,
	toTAML, blockToArray,
	isNumber, isInteger, isString, isHash, isFunction,
	} from '@jdeighan/exceptions/utils'

# --- This logger only ever gets passed a single string argument
putstr = undef
doDebugLog = false

export stringify = undef
fourSpaces  = '    '

# ---------------------------------------------------------------------------

export debugLog = (flag=true) ->

	doDebugLog = flag
	if doDebugLog
		LOG "doDebugLog = #{flag}"
	return

# ---------------------------------------------------------------------------

export setStringifier = (func) ->

	orgStringifier = stringify
	assert isFunction(func), "setStringifier() arg is not a function"
	stringify = func
	return orgStringifier

# ---------------------------------------------------------------------------

export resetStringifier = () ->

	setStringifier orderedStringify

# ---------------------------------------------------------------------------

export setLogger = (func) ->

	assert isFunction(func), "setLogger() arg is not a function"
	orgLogger = putstr
	putstr = func
	return orgLogger

# ---------------------------------------------------------------------------

export resetLogger = () ->

	setLogger console.log

# ---------------------------------------------------------------------------

export tamlStringify = (obj, escape=false) ->

	return toTAML(obj, {
		useTabs: false
		sortKeys: false
		escape
		})

# ---------------------------------------------------------------------------

export orderedStringify = (obj, escape=false) ->

	return toTAML(obj, {
		useTabs: false
		sortKeys: true
		escape
		})

# ---------------------------------------------------------------------------

maxOneLine = 32

# ---------------------------------------------------------------------------

export log = (str, prefix='') ->

	assert isString(prefix), "not a string: #{OL(prefix)}"
	assert isString(str),      "log(): not a string: #{OL(str)}"
	assert isFunction(putstr), "putstr not properly set"
	prefix = fixForTerminal(prefix)

	if doDebugLog
		LOG "CALL log(#{OL(str)}), prefix = #{OL(prefix)}"

	putstr "#{prefix}#{str}"
	return true   # to allow use in boolean expressions

# ---------------------------------------------------------------------------

export logBareItem = (item, pre='') ->

	logItem undef, item, pre
	return

# ---------------------------------------------------------------------------

export logItem = (label, item, pre='', itemPre=undef) ->

	assert isString(pre), "not a string: #{OL(pre)}"
	assert isFunction(putstr), "putstr not properly set"
	assert !label || isString(label), "label a non-string"
	if (itemPre == undef)
		itemPre = pre

	assert pre.indexOf("\t") == -1, "pre has TAB"
	assert itemPre.indexOf("\t") == -1, "itemPre has TAB"

	if doDebugLog
		LOG "CALL logItem(#{OL(label)}, #{OL(item)})"
		LOG "pre = #{OL(pre)}"
		LOG "itemPre = #{OL(itemPre)}"

	if label
		labelStr = "#{label} = "
	else
		labelStr = ""

	if (item == undef)
		putstr "#{pre}#{labelStr}undef"
	else if (item == null)
		putstr "#{pre}#{labelStr}null"
	else if isNumber(item)
		putstr "#{pre}#{labelStr}#{item}"
	else if isString(item)
		if (item.length <= maxOneLine)
			result = escapeStr(item)
			hasApos = (result.indexOf("'") >= 0)
			if hasApos
				putstr "#{pre}#{labelStr}\"#{result}\""
			else
				putstr "#{pre}#{labelStr}'#{result}'"
		else
			if label
				putstr "#{pre}#{label}:"
			putBlock item, itemPre
	else
		if label
			putstr "#{pre}#{label}:"

		# --- escape special chars
		for str in blockToArray(stringify(item, true))
			putstr "#{itemPre}#{str}"

	return true

# ---------------------------------------------------------------------------

export shortEnough = (label, value) ->

	return (value == undef)

# ---------------------------------------------------------------------------
# --- needed because Windows Terminal handles TAB chars badly

fixForTerminal = (str) ->

	if !str
		return ''

	# --- convert TAB char to 4 spaces
	return str.replace(/\t/g, fourSpaces)

# ---------------------------------------------------------------------------

putBlock = (item, prefix='') ->

	putstr "#{prefix}#{sep_eq}"
	for line in blockToArray(item)
		putstr "#{prefix}#{escapeStr(line)}"
	putstr "#{prefix}#{sep_eq}"
	return

# ---------------------------------------------------------------------------

if ! loaded
	setStringifier orderedStringify
	resetLogger()
loaded = true