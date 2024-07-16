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

### tinysonic.parse(string/buffer)
Parses a tinysonic encoded string. Returns `null` if it fails parsing.

### tinysonic.stringify(object)
Stringifies a js object into a tinysonic string. Returns `null` on error.

### tinysonic(string/buffer)
Alternative for `tinysonic.parse()`


## Syntax

The full syntax is:

* each key value pair is separated by `:`
* multiple pairs are separated by `,`
* each key or value are trimmed for spaces
* numbers are parsed as numbers
* null are parsed as `null`
* booleans are parsed as booleans, e.g. `true` and `false`
* you can wrap objects with `{` and `}`

## License

MIT
