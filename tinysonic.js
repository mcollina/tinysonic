'use strict'

function parse (string) {
  if (string instanceof Buffer) {
    string = string.toString()
  }
  if (typeof string !== 'string') {
    // Err: we can only parse strings
    return null
  }

  const stack = []
  let result = {}
  let key = ''
  let parsingKey = true
  let last = 0
  let i = 0
  const strlen = string.length
  while (i < strlen) {
    const char = string[i]
    if (parsingKey) {
      if (char === ':') {
        key = string.substring(last, i).trim()
        last = i + 1
        parsingKey = false
      } else if (char === '{') {
        // Err: a key can only be a string
        return null
      }
    } else if (char === '{') {
      result[key] = {}
      stack.push(result)
      result = result[key]
      key = ''
      parsingKey = true
      last = i + 1
    } else if (char === '}') {
      result[key] = asValue(string.substring(last, i).trim())
      key = ''
      parsingKey = true
      while (string[i] === '}') {
        result = stack.pop()
        i++
        while (i < strlen && (string[i] === ' ' || string[i] === ',')) {
          i++
        }
        last = i
      }
    } else if (char === ',') {
      result[key] = asValue(string.substring(last, i).trim())
      last = i + 1
      parsingKey = true
      key = ''
    }
    i++
  }

  if (!parsingKey) {
    result[key] = asValue(string.substring(last).trim())
  } else if (key.length === 0 && string[strlen - 1] !== '}') {
    // Err: cant end input with a key, need a val or a ctrl char
    return null
  }

  return result
}

function asValue (str) {
  switch (str) {
    case 'true':
      return true
    case 'false':
      return false
    case 'null':
      return null
    case 'undefined':
      return undefined
    default: {
      if (Number.isNaN(Number(str))) {
        return str
      }
      const number = Number.parseFloat(str)
      return Number.isNaN(number)
        ? str
        : number
    }
  }
}

function stringify (data) {
  if (!(data instanceof Object)) {
    return null
  }

  const keys = Object.keys(data)
  const len = keys.length - 1
  if (len === -1) {
    return ''
  }
  let result = ''
  const lastKey = keys.pop()
  let key
  for (key of keys) {
    result += `${key}:${stringifyChunk(data[key])},`
  }
  result += `${lastKey}:${stringifyChunk(data[lastKey])}`

  return result
}

function stringifyChunk (data) {
  if (typeof data === 'string') {
    return data
  } if (data instanceof Object) {
    return fromObject(data)
  } if (Number.isFinite(data)) {
    return `${data}`
  } if (data === true || data === false) {
    return !!data
  }
  return null
}

const fromObject = (data) => {
  const keys = Object.keys(data)
  if (keys.length - 1 === -1) {
    return '{}'
  }
  let result = '{'
  const lastKey = keys.pop()
  for (const key of keys) {
    result += `${key}:${stringifyChunk(data[key])},`
  }
  result += `${lastKey}:${stringifyChunk(data[lastKey])}}`

  return result
}

parse.stringify = stringify
parse.parse = parse

module.exports = parse
