'use strict'

const clones = require('clones')

function parse (string) {
  if (typeof string !== 'string' && !(string instanceof Buffer)) {
    return null
  }

  string = string.toString()

  const stack = []
  let result = {}
  let key = ''
  let parsingKey = true
  let last = 0
  let i

  for (i = 0; i < string.length; i++) {
    if (parsingKey) {
      if (string.charAt(i) === ':') {
        key = string.slice(last, i).trim()
        last = i + 1
        parsingKey = false
      } else if (string.charAt(i) === '{') {
        // break out, not valid
        return null
      }
    } else if (string.charAt(i) === '{') {
      result[key] = {}
      stack.unshift(result)
      result = result[key]
      key = ''
      parsingKey = true
      last = i + 1
    } else if (string.charAt(i) === '}') {
      result[key] = asValue(string.slice(last, i).trim())
      key = ''
      parsingKey = true
      while (string.charAt(i) === '}') {
        result = stack.shift()
        last = i + 1
        for (
          i++;
          i < string.length &&
          (string.charAt(i) === ' ' || string.charAt(i) === ',');
          i++
        ) {
          last = i + 1
        }
      }
    } else if (string.charAt(i) === ',') {
      result[key] = asValue(string.slice(last, i).trim())
      last = i + 1
      parsingKey = true
      key = ''
    }
  }

  if (!parsingKey) {
    result[key] = asValue(string.slice(last, i).trim())
  } else if (key.length === 0 && string.charAt(string.length - 1) !== '}') {
    result = null
  }

  return result
}

function asValue (str) {
  if (str === 'true') {
    return true
  } else if (str === 'false') {
    return false
  } else if (str === 'null') {
    return null
  } else if (str === 'undefined') {
    return undefined
  }

  if (!isNaN(str)) {
    const number = parseFloat(str)
    if (!isNaN(number)) {
      return number
    }
    return str
  } else {
    return str
  }
}

// Stringify function authored by Jairus Tanaka

// Pre-alloc in memory. (faster)
const nullVal = 'null'
// Much faster if functions are split up by types.
function fromString (data) {
  return `${data}`
}

function fromNumber (data) {
  return `${data}`
}

const fromObject = (data) => {
  const keys = Object.keys(data)
  const len = keys.length - 1
  if (len === -1) {
    return '{}'
  }
  let result = '{'
  const lastKey = keys.pop()
  // Just loop through all the keys and stringify them.
  let key
  for (key of keys) {
    // Iterate through all but the last. (To keep the commas clean)
    result += `${stringifyChunk(key)}:${stringifyChunk(data[key])},`
  }
  result += `${stringifyChunk(lastKey)}:${stringifyChunk(data[lastKey])}}`

  return result
}

function stringifyChunk (data) {
  let result = ''
  if (typeof data === 'string') {
    result += fromString(data)
  } else if (data instanceof Object) {
    result += fromObject(data)
  } else if (Number.isFinite(data)) {
    result += fromNumber(data)
  } else if (data === true || data === false) {
    result += data ? 'true' : 'false'
  } else {
    result += nullVal
  }

  return result
}

function stringify (data) {
  let result = ''
  if (typeof data === 'string') {
    result += fromString(data)
  } else if (data instanceof Object) {
    result += fromObject(data)
  } else if (Number.isFinite(data)) {
    result += fromNumber(data)
  } else if (data === true || data === false) {
    result += data ? 'true' : 'false'
  } else {
    result += nullVal
  }

  return result.slice(1, result.length - 1)
}

parse.stringify = stringify

parse.parse = clones(parse)

module.exports = parse
