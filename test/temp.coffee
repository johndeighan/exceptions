# temp.coffee

import {
	OL, defined,
	} from '@jdeighan/exceptions/utils'
import {toTAML} from '@jdeighan/exceptions/taml'
import {LOG, LOGVALUE} from '@jdeighan/exceptions/log'

h = {
	a: 1
	b: 2
	c: 3
	e: 5
	d: 4
	}
str = toTAML h, {sortKeys: ['c','b','a']}
LOG str
