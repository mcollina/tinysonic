# tinysonic

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
```

## Syntax

The full syntax is:

* each key value pair is separated by `:`
* multiple pairs are separated by `,`
* each key or value are trimmed for spaces
* numbers are parsed as numbers

## License

MIT
