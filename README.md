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

console.log(tinysonic('hello:world'))
console.log(tinysonic('a:b,c:d'))
console.log(tinysonic('hello:world,my:{world:data}'))
console.log(tinysonic('a:true,c:d'))
```

## API

### tinysonic(string)

Returns `null` if it fails parsing.

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
