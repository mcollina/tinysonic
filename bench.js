'use strict'

const benchmark = require('benchmark')
const jsonic = require('jsonic')
const tinysonic = require('./')
const suite = new benchmark.Suite()

const obj = {
  hello: 'world',
  answer: 42,
}

suite.add('Jsonic Parse', () => {
  jsonic('hello:world,answer:42')
})

suite.add('TinySonic Parse', () => {
  tinysonic('hello:world,answer:42')
})

suite.add('JSON Parse', () => {
  JSON.parse('{"hello":"world","answer":"42"}')
})

suite.add('Jsonic Stringify', () => {
  jsonic.stringify(obj)
})

suite.add('TinySonic Stringify', () => {
  tinysonic.stringify(obj)
})

suite.add('JSON Stringify', () => {
  JSON.stringify(obj)
})

suite.on('cycle', cycle)

suite.run()

function cycle (e) {
  console.log(e.target.toString())
}
