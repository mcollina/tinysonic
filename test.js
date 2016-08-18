'use strict'

var test = require('tape')
var tinysonic = require('./')

function check (string, object) {
  test('check that ' + JSON.stringify(string) + ' is parsed to ' + JSON.stringify(object), function (t) {
    t.plan(1)

    t.deepEqual(tinysonic(string), object, 'matches')
  })
}

check('a:b', { a: 'b' })
check('a:b,c:d', { a: 'b', c: 'd' })
check('a: b, c: d', { a: 'b', c: 'd' })
check('a:42', { a: 42 })
check('hello:world', { hello: 'world' })
check('hello:world\n', { hello: 'world' })
check(new Buffer('a:b'), { a: 'b' })
