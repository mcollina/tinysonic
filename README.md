# tinysonic&nbsp;&nbsp;[![Build Status](https://travis-ci.org/mcollina/tinysonic.svg)](https://travis-ci.org/mcollina/tinysonic)


A quick syntax for JSON objects. Heavily inspired by
[jsonic](https://github.com/rjrodger/jsonic), but simpler.

## Install

```
$ npm install tinysonic --save
```

## Example

```js
'use strict'

var tinysonic = require('tinysonic')

const encoded = tinysonic.stringify({
    hello: 'world',
    my: {
        world: 'data'
    }
})

console.log('Encoded: ', encoded)
// Encoded: 'hello:world,my:{world:data}'

const decoded = tinysonic.parse(encoded)

console.log('Decoded: ', decoded)
// Decoded: { hello: 'world', my: { world: 'data' } }

```

## API

### tinysonic(string)

Returns `null` if it fails parsing.

### tinysonic.parse(string)
Parses the tinysonic encoded string

### tinysonic.stringify(any)
Stringifies data into tinysonic string

## Syntax

The full syntax is:

* each key value pair is separated by `:`
* multiple pairs are separated by `,`
* each key or value are trimmed for spaces
* numbers are parsed as numbers
* booleans are parsed as booleans, e.g. `true` and `false`
* you can wrap objects with `{` and `}`

## License

MIT