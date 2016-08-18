'use strict'

function tinysonic (string) {
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
      }
    } else {
      if (string.charAt(i) === ',') {
        result[key] = asValue(string.slice(last, i).trim())
        last = i + 1
        parsingKey = true
        key = ''
      }
    }
  }

  if (!parsingKey) {
    result[key] = asValue(string.slice(last, i).trim())
  }

  return result
}

function asValue (str) {
  var number = parseFloat(str)
  if (isNaN(number)) {
    return str
  } else {
    return number
  }
}

module.exports = tinysonic
