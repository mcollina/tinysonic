'use strict'

const benchmark = require('benchmark')
const jsonic = require('jsonic')
const tinysonic = require('./')
const suite = new benchmark.Suite()

const obj = {
  hello: 'world',
  answer: 42
}

suite.add('Jsonic Parse', function () {
  jsonic('hello:world,answer:42')
})

suite.add('TinySonic Parse', function () {
  tinysonic('hello:world,answer:42')
})

suite.add('JSON Parse', function () {
  JSON.parse('{ "hello": "world", "answer": "42" }')
})

suite.add('Jsonic Stringify', function () {
  jsonic.stringify(obj)
})

suite.add('TinySonic Stringify', function () {
  tinysonic.stringify(obj)
})

suite.add('JSON Stringify', function () {
  JSON.stringify(obj)
})

suite.on('cycle', cycle)

suite.run()

function cycle (e) {
  console.log(e.target.toString())
}
