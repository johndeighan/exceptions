# stack.test.coffee

import test from 'ava'

import {pass, undef} from '@jdeighan/exceptions/utils'
import {LOG, utReset, utGetLog} from '@jdeighan/exceptions/log'
import {CallStack} from '@jdeighan/exceptions/stack'

# ---------------------------------------------------------------------------

test "line 12", (t) =>
	stack = new CallStack()
	t.is stack.getIndentLevel(), 0

test "line 16", (t) =>
	stack = new CallStack()
	t.is stack.isLogging(), false

# ---------------------------------------------------------------------------

test "line 22", (t) =>
	stack = new CallStack()
	stack.enter 'callme', [1, 'abc'], true
	t.is stack.getIndentLevel(), 1

test "line 27", (t) =>
	stack = new CallStack()
	stack.enter 'callme', [1, 'abc'], true
	t.is stack.isLogging(), true

# ---------------------------------------------------------------------------

test "line 34", (t) =>
	stack = new CallStack()
	stack.enter 'sub', [], false
	t.is stack.getIndentLevel(), 0

test "line 39", (t) =>
	stack = new CallStack()
	stack.enter 'sub', [], true
	t.is stack.getIndentLevel(), 1

test "line 44", (t) =>
	stack = new CallStack()
	stack.enter 'sub', [], false
	t.is stack.isLogging(), false

# ---------------------------------------------------------------------------

test "line 51", (t) =>
	stack = new CallStack()
	stack.enter 'callme', [1, 'abc'], true
	stack.enter 'sub', [], false
	stack.returnFrom 'sub'
	t.is stack.getIndentLevel(), 1

test "line 58", (t) =>
	stack = new CallStack()
	stack.enter 'callme', [1, 'abc'], true
	stack.enter 'sub', [], false
	stack.returnFrom 'sub'
	t.is stack.isLogging(), true

# ---------------------------------------------------------------------------

(() ->

	# --- Simulate calling main() with these functions in effect

	coffeeCode = """
		main = () ->
			A()
			return

		A = () ->
			debug "enter A()"
			C()
			for x from B()
				LOG x
				C()
			debug "return from A()"
			return

		B = () ->
			debug "enter B()"
			LOG 13
			debug "yield B()", 5
			yield 5
			debug "resume B()"
			C()
			yield from E()
			debug "return from B()"
			return

		C = () ->
			debug "enter C()"
			LOG 'here'
			debug "return from C()"
			return

		D = () ->
			debug "enter D()"
			debug "yield D()", 1
			yield 1
			debug "resume D()"
			debug "yield D()", 2
			yield 2
			debug "resume D()"
			debug "return from D()"
			return
		"""

	# --- Simulate executing main() and check state at each step:

	test "line 227", (t) =>
		utReset()

		stack = new CallStack()

		t.is stack.size(), 0
		t.is stack.currentFunc(), 'main'

		# --- debug "enter A"
		stack.enter('A')

		t.is stack.size(), 1
		t.is stack.currentFunc(), 'A'

		# --- debug "enter C"
		stack.enter('C')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'C'

		# --- debug "return from C"
		stack.returnFrom('C')

		t.is stack.size(), 1
		t.is stack.currentFunc(), 'A'

		# --- debug "enter B"
		stack.enter('B')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'B'

		# --- debug "yield B", 5
		stack.yield('B', [5])

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'A'

		# --- debug "enter C"
		stack.enter('C')

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'C'

		# --- debug "return from C"
		stack.returnFrom('C')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'A'

		# --- debug "resume B"
		stack.resume('B')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'B'

		# --- debug "enter C"
		stack.enter('C')

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'C'

		# --- debug "return from C"
		stack.returnFrom('C')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'B'

		# --- debug "yield B"
		stack.yield('B')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'A'

		# --- debug "enter D"
		stack.enter('D')

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'D'

		# --- debug "yield D", 1
		stack.yield('D', [1])

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'A'

		# --- debug "resume D"
		stack.resume('D')

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'D'

		# --- debug "yield D", 2
		stack.yield('D', [2])

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'A'

		# --- debug "resume D"
		stack.resume('D')

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'D'

		# --- debug "return from D"
		stack.returnFrom('D')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'A'

		# --- debug "enter C"
		stack.enter('C')

		t.is stack.size(), 3
		t.is stack.currentFunc(), 'C'

		# --- debug "return from C"
		stack.returnFrom('C')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'A'

		# --- debug "resume B"
		stack.resume('B')

		t.is stack.size(), 2
		t.is stack.currentFunc(), 'B'

		# --- debug "return from B"
		stack.returnFrom('B')

		t.is stack.size(), 1
		t.is stack.currentFunc(), 'A'

		# --- debug "return from A"
		stack.returnFrom('A')

		t.is stack.size(), 0
		t.is stack.currentFunc(), 'main'

	)()
