'use strict'

function tinysonic (string) {
  if (typeof string !== 'string' && !(string instanceof Buffer)) {
    return null
  }

  string = string.toString()

  var stack = []
  var result = {}
  var key = ''
  var parsingKey = true
  var last = 0

  for (var i = 0; i < string.length; i++) {
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
        for (i++; i < string.length && (string.charAt(i) === ' ' || string.charAt(i) === ','); i++) {
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
    var number = parseFloat(str)
    if (!isNaN(number)) {
      return number
    }
    return str
  } else {
    return str
  }
}

module.exports = tinysonic
