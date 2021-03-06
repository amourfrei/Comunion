/**
 * ARRAY POLYFILL
 */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback /*, thisArg */) {
    let T, k

    if (this == null) {
      throw new TypeError('this is null or not defined')
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    let O = Object(this)

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    let len = O.length >>> 0

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = arguments[1]
    }

    // 6. Let k be 0
    k = 0

    // 7. Repeat, while k < len
    while (k < len) {
      let kValue

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {
        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k]

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O)
      }
      // d. Increase k by 1.
      k++
    }
    // 8. return undefined
  }
}

if (!Array.prototype.clone) {
  Array.prototype.clone = function () {
    return this.slice(0)
  }
}

if (!Array.prototype.getMax) {
  Array.prototype.getMax =
    Array.prototype.getMax ||
    function () {
      return Math.max.apply(null, this)
    }
}

if (!Array.prototype.indexOfName) {
  Array.prototype.indexOfName = function (name) {
    return this.indexOf(this.filter(s => s.name == name)[0])
  }
}

if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function () {
    var currentIndex = this.length
    var temporaryValue
    var randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = this[currentIndex]
      this[currentIndex] = this[randomIndex]
      this[randomIndex] = temporaryValue
    }

    return this
  }
}

/**
 * NODELIST POLYFILL
 */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window

    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}

if (window.NodeList && !NodeList.prototype.reverse) {
  NodeList.prototype.reverse = function () {
    return [].slice.call(this, 0).reverse()
  }
}

if (window.NodeList && !NodeList.prototype.shuffle) {
  NodeList.prototype.shuffle = function () {
    var array = []

    this.forEach(function (el, i) {
      array.push(el)
    })

    return array.shuffle()
  }
}

/**
 * ELEMENT POLYFILL
 */
if (!Element.prototype.parents) {
  Element.prototype.parents = function (selector) {
    // Setup parents array
    var parents = []
    var elem = this

    // Get matching parent elements
    for (; elem && elem !== document; elem = elem.parentNode) {
      // Add matching parents to array
      if (selector) {
        if (elem.matches(selector)) {
          parents.push(elem)
        }
      } else {
        parents.push(elem)
      }
    }

    return parents
  }
}

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s)
      var i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }
}

/**
 * MEDIA POLYFILL
 */
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

window.AudioContext = window.AudioContext || window.webkitAudioContext

/**
 * PASSIVE POLYFILL
 */
window.passiveSupport = function () {
  let support = false

  try {
    let opts = Object.defineProperty({}, 'passive', {
      get: function () {
        support = true
      }
    })

    window.addEventListener('test', null, opts)
  } catch (e) {}

  return support
}
