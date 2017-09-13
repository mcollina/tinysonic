'use strict'

var tinysonic = require('./')

console.log(tinysonic('hello:world'))
console.log(tinysonic('a:b,c:d'))
console.log(tinysonic('hello:world,my:{world:data}'))
console.log(tinysonic('a:true,c:d'))
