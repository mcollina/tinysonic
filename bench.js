'use strict'

const benchmark = require('benchmark')
const jsonic = require('jsonic')
const tinysonic = require('./')
const suite = new benchmark.Suite()

suite.add('jsonic', function () {
  jsonic('hello:world,answer:42')
})

suite.add('tinysonic', function () {
  tinysonic('hello:world,answer:42')
})

suite.add('JSON', function () {
  JSON.parse('{ "hello": "world", "answer": "42" }')
})

suite.on('cycle', cycle)

suite.run()

function cycle (e) {
  console.log(e.target.toString())
}
