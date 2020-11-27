(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cryptoPro", [], factory);
	else if(typeof exports === 'object')
		exports["cryptoPro"] = factory();
	else
		root["cryptoPro"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./crypto-pro.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/base64-js/index.js":
/*!******************************************!*\
  !*** ../node_modules/base64-js/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../node_modules/buffer/index.js":
/*!***************************************!*\
  !*** ../node_modules/buffer/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "../node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "../node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "../node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/ieee754/index.js":
/*!****************************************!*\
  !*** ../node_modules/ieee754/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../node_modules/isarray/index.js":
/*!****************************************!*\
  !*** ../node_modules/isarray/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./api/certificate/certificate.ts":
/*!****************************************!*\
  !*** ./api/certificate/certificate.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../../constants */ "./constants/index.ts");
var exportBase64_1 = __webpack_require__(/*! ./exportBase64 */ "./api/certificate/exportBase64.ts");
var getAlgorithm_1 = __webpack_require__(/*! ./getAlgorithm */ "./api/certificate/getAlgorithm.ts");
var getCadesProp_1 = __webpack_require__(/*! ./getCadesProp */ "./api/certificate/getCadesProp.ts");
var getDecodedExtendedKeyUsage_1 = __webpack_require__(/*! ./getDecodedExtendedKeyUsage */ "./api/certificate/getDecodedExtendedKeyUsage.ts");
var getExtendedKeyUsage_1 = __webpack_require__(/*! ./getExtendedKeyUsage */ "./api/certificate/getExtendedKeyUsage.ts");
var getInfo_1 = __webpack_require__(/*! ./getInfo */ "./api/certificate/getInfo.ts");
var hasExtendedKeyUsage_1 = __webpack_require__(/*! ./hasExtendedKeyUsage */ "./api/certificate/hasExtendedKeyUsage.ts");
var isValid_1 = __webpack_require__(/*! ./isValid */ "./api/certificate/isValid.ts");
var Certificate = /** @class */ (function () {
    function Certificate(_cadesCertificate, name, issuerName, subjectName, thumbprint, validFrom, validTo, hasPrivateKey) {
        this._cadesCertificate = _cadesCertificate;
        this.name = name;
        this.issuerName = issuerName;
        this.subjectName = subjectName;
        this.thumbprint = thumbprint;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.hasPrivateKey = hasPrivateKey;
    }
    Certificate.prototype.getOwnerInfo = function () {
        return getInfo_1.getInfo.call(this, constants_1.SUBJECT_TAGS_TRANSLATIONS, 'SubjectName');
    };
    Certificate.prototype.getIssuerInfo = function () {
        return getInfo_1.getInfo.call(this, constants_1.ISSUER_TAGS_TRANSLATIONS, 'IssuerName');
    };
    Certificate.prototype.getExtendedKeyUsage = function () {
        return getExtendedKeyUsage_1.getExtendedKeyUsage.call(this);
    };
    Certificate.prototype.getDecodedExtendedKeyUsage = function () {
        return getDecodedExtendedKeyUsage_1.getDecodedExtendedKeyUsage.call(this);
    };
    Certificate.prototype.getAlgorithm = function () {
        return getAlgorithm_1.getAlgorithm.call(this);
    };
    Certificate.prototype.getCadesProp = function (propName) {
        return getCadesProp_1.getCadesProp.call(this, propName);
    };
    Certificate.prototype.isValid = function () {
        return isValid_1.isValid.call(this);
    };
    Certificate.prototype.exportBase64 = function () {
        return exportBase64_1.exportBase64.call(this);
    };
    Certificate.prototype.hasExtendedKeyUsage = function (oids) {
        return hasExtendedKeyUsage_1.hasExtendedKeyUsage.call(this, oids);
    };
    return Certificate;
}());
exports.Certificate = Certificate;


/***/ }),

/***/ "./api/certificate/exportBase64.ts":
/*!*****************************************!*\
  !*** ./api/certificate/exportBase64.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Экспортирует сертификат в формате base64
 *
 * @returns сертификат в формате base64
 */
exports.exportBase64 = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    var cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function exportBase64() {
        var base64;
        try {
            base64 = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.Export(0);
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при экспорте сертификата');
        }
        return base64;
    }));
});


/***/ }),

/***/ "./api/certificate/getAlgorithm.ts":
/*!*****************************************!*\
  !*** ./api/certificate/getAlgorithm.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает информацию об алгоритме сертификата
 *
 * @returns информацию об алгоритме и его OID'е
 */
exports.getAlgorithm = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    var cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function getAlgorithm() {
        var algorithmInfo = {
            algorithm: null,
            oid: null,
        };
        var cadesPublicKey;
        try {
            cadesPublicKey = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.PublicKey();
            cadesPublicKey = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.Algorithm;
            algorithmInfo.algorithm = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.FriendlyName;
            algorithmInfo.oid = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.Value;
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при получении алгоритма');
        }
        return algorithmInfo;
    }));
});


/***/ }),

/***/ "./api/certificate/getCadesProp.ts":
/*!*****************************************!*\
  !*** ./api/certificate/getCadesProp.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает указанное внутренее свойство у сертификата в формате Cades
 *
 * @param propName = наименование свойства
 * @returns значение запрошенного свойства
 */
exports.getCadesProp = _afterPluginsLoaded_1._afterPluginsLoaded(function (propName) {
    var cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function getCadesProp() {
        var propertyValue;
        try {
            propertyValue = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate[propName];
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при обращении к свойству сертификата');
        }
        return propertyValue;
    }));
});


/***/ }),

/***/ "./api/certificate/getDecodedExtendedKeyUsage.ts":
/*!*******************************************************!*\
  !*** ./api/certificate/getDecodedExtendedKeyUsage.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../../constants */ "./constants/index.ts");
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
/**
 * Возвращает расшифрованные ОИД'ы сертификата
 *
 * @returns словарь расшифрованных ОИД'ов
 */
exports.getDecodedExtendedKeyUsage = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    return __awaiter(this, void 0, void 0, function () {
        var certificateOids;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.getExtendedKeyUsage()];
                case 1:
                    certificateOids = _a.sent();
                    return [2 /*return*/, certificateOids.reduce(function (decodedOids, oidCode) {
                            var _a;
                            return (__assign(__assign({}, decodedOids), (_a = {}, _a[oidCode] = constants_1.OIDS_DICTIONARY[oidCode] || null, _a)));
                        }, {})];
            }
        });
    });
});


/***/ }),

/***/ "./api/certificate/getExtendedKeyUsage.ts":
/*!************************************************!*\
  !*** ./api/certificate/getExtendedKeyUsage.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает ОИД'ы сертификата
 *
 * @returns список ОИД'ов
 */
exports.getExtendedKeyUsage = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    var cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function getExtendedKeyUsage() {
        var OIDS = [];
        var count;
        try {
            count = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
            count = _generateCadesFn_1.__cadesAsyncToken__ + count.EKUs;
            count = _generateCadesFn_1.__cadesAsyncToken__ + count.Count;
            if (count > 0) {
                while (count > 0) {
                    var cadesExtendedKeyUsage = void 0;
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.EKUs;
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.Item(count);
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.OID;
                    OIDS.push(cadesExtendedKeyUsage);
                    count--;
                }
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "Ошибка при получении ОИД'ов");
        }
        return OIDS;
    }));
});


/***/ }),

/***/ "./api/certificate/getInfo.ts":
/*!************************************!*\
  !*** ./api/certificate/getInfo.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _parseCertInfo_1 = __webpack_require__(/*! ../../helpers/_parseCertInfo */ "./helpers/_parseCertInfo.ts");
var getCadesProp_1 = __webpack_require__(/*! ./getCadesProp */ "./api/certificate/getCadesProp.ts");
/**
 * Возвращает расшифрованную информацию о сертификате из указанного свойства по тэгам
 *
 * @param tags = словарь
 * @param entitiesPath = путь к разбираемой сущности
 * @returns расшифрованная информация по отдельным тэгам
 */
exports.getInfo = _afterPluginsLoaded_1._afterPluginsLoaded(function (tags, entitiesPath) {
    return __awaiter(this, void 0, void 0, function () {
        var entities, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCadesProp_1.getCadesProp.call(this, entitiesPath)];
                case 1:
                    entities = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error_1) || 'Ошибка при извлечении информации из сертификата');
                case 3: return [2 /*return*/, _parseCertInfo_1._parseCertInfo(tags, entities)];
            }
        });
    });
});


/***/ }),

/***/ "./api/certificate/hasExtendedKeyUsage.ts":
/*!************************************************!*\
  !*** ./api/certificate/hasExtendedKeyUsage.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
/**
 * Проверяет наличие ОИД'а (ОИД'ов) у сертификата
 *
 * @param oids - ОИД'ы для проверки
 * @returns флаг наличия ОИД'ов у сертификата
 */
exports.hasExtendedKeyUsage = _afterPluginsLoaded_1._afterPluginsLoaded(function (oids) {
    return __awaiter(this, void 0, void 0, function () {
        var certOids, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.getExtendedKeyUsage()];
                case 1:
                    certOids = _a.sent();
                    if (Array.isArray(oids)) {
                        result = oids.every(function (oidToCheck) { return certOids.some(function (certOid) { return certOid === oidToCheck; }); });
                    }
                    else {
                        result = certOids.some(function (certOid) { return certOid === oids; });
                    }
                    return [2 /*return*/, result];
            }
        });
    });
});


/***/ }),

/***/ "./api/certificate/index.ts":
/*!**********************************!*\
  !*** ./api/certificate/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./certificate */ "./api/certificate/certificate.ts"));


/***/ }),

/***/ "./api/certificate/isValid.ts":
/*!************************************!*\
  !*** ./api/certificate/isValid.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Проверяет действительность сертификата
 *
 * @returns флаг валидности
 */
exports.isValid = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    var cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function isValid() {
        var isValid;
        try {
            isValid = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.IsValid();
            isValid = _generateCadesFn_1.__cadesAsyncToken__ + isValid.Result;
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при проверке сертификата');
        }
        return Boolean(isValid);
    }));
});


/***/ }),

/***/ "./api/createAttachedSignature.ts":
/*!****************************************!*\
  !*** ./api/createAttachedSignature.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _getCadesCert_1 = __webpack_require__(/*! ../helpers/_getCadesCert */ "./helpers/_getCadesCert.ts");
var _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
/**
 * Создает присоединенную подпись сообщения по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param message - подписываемое сообщение
 * @returns подпись в формате PKCS#7
 */
exports.createAttachedSignature = _afterPluginsLoaded_1._afterPluginsLoaded(function (thumbprint, unencryptedMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin, cadesCertificate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cadesplugin = window.cadesplugin;
                return [4 /*yield*/, _getCadesCert_1._getCadesCert(thumbprint)];
            case 1:
                cadesCertificate = _a.sent();
                return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function createAttachedSignature() {
                        var cadesAttrs;
                        var cadesSignedData;
                        var cadesSigner;
                        try {
                            cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
                            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
                            cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
                        }
                        var currentTime = _getDateObj_1._getDateObj(new Date());
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при установке времени подписи');
                        }
                        var messageBase64;
                        try {
                            messageBase64 = Buffer.from(unencryptedMessage).toString('base64');
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error('Ошибка при преобразовании сообщения в Base64');
                        }
                        var cadesAuthAttrs;
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                            cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_Content(messageBase64));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
                        }
                        var signature;
                        try {
                            signature = _generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.SignCades(cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
                        }
                        return signature;
                    }))];
        }
    });
}); });

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/buffer/index.js */ "../node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./api/createCoSignature.ts":
/*!**********************************!*\
  !*** ./api/createCoSignature.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
/**
 * Добавляет подписанта к уже существующим для данного подписанного сообщения
 *
 * @param oCertificate - объект класса Certificate, которым необходимо подписать сообщение
 * @param oHashedData - объект oHashedData с установленным алгоритмом шифрования
 * @param sSignedMessage - сообщение к которому необходимо добавить подписанта
 * @returns строку с подписанным сообщением
 */
exports.createCoSignature = _afterPluginsLoaded_1._afterPluginsLoaded(function (oCertificate, oHashedData, sSignedMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin, cadesCertificate, algorithm, hashValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cadesplugin = window.cadesplugin;
                cadesCertificate = oCertificate._cadesCertificate;
                return [4 /*yield*/, oHashedData.Algorithm];
            case 1:
                algorithm = _a.sent();
                return [4 /*yield*/, oHashedData.Value];
            case 2:
                hashValue = _a.sent();
                return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function createCoSignature() {
                        var cadesAttrs;
                        var cadesSigner;
                        var cadesSignedData;
                        var cadesHashedData;
                        try {
                            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
                            cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
                        }
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_Algorithm(algorithm));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.SetHashValue(hashValue));
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для верификации');
                        }
                        try {
                            cadesSignedData.VerifyHash(cadesHashedData, sSignedMessage, cadesplugin.CADESCOM_BASE64_TO_BINARY);
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при верификации данных');
                        }
                        try {
                            cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
                            cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
                        }
                        var currentTime = _getDateObj_1._getDateObj(new Date());
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при установке времени подписи');
                        }
                        var cadesAuthAttrs;
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                            cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                            //          void (__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
                        }
                        var signature;
                        try {
                            signature =
                                _generateCadesFn_1.__cadesAsyncToken__ +
                                    cadesSignedData.CoSignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_CADES_BES);
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || e);
                        }
                        return signature;
                    }))];
        }
    });
}); });


/***/ }),

/***/ "./api/createDetachedSignature.ts":
/*!****************************************!*\
  !*** ./api/createDetachedSignature.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _getCadesCert_1 = __webpack_require__(/*! ../helpers/_getCadesCert */ "./helpers/_getCadesCert.ts");
var _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
/**
 * Создает отсоединенную подпись хеша по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param messageHash - хеш подписываемого сообщения, сгенерированный по ГОСТ Р 34.11-2012 256 бит
 * @returns подпись в формате PKCS#7
 */
exports.createDetachedSignature = _afterPluginsLoaded_1._afterPluginsLoaded(function (thumbprint, messageHash) { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin, cadesCertificate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cadesplugin = window.cadesplugin;
                return [4 /*yield*/, _getCadesCert_1._getCadesCert(thumbprint)];
            case 1:
                cadesCertificate = _a.sent();
                return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function createDetachedSignature() {
                        var cadesAttrs;
                        var cadesHashedData;
                        var cadesSignedData;
                        var cadesSigner;
                        try {
                            cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
                            cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
                            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
                            cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
                        }
                        var currentTime = _getDateObj_1._getDateObj(new Date());
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при установке времени подписи');
                        }
                        var cadesAuthAttrs;
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                            cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при установке сертификата');
                        }
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ +
                                cadesHashedData.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.SetHashValue(messageHash));
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при установке хеша');
                        }
                        var signature;
                        try {
                            signature =
                                _generateCadesFn_1.__cadesAsyncToken__ +
                                    cadesSignedData.SignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
                        }
                        catch (error) {
                            console.error(error);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
                        }
                        return signature;
                    }))];
        }
    });
}); });


/***/ }),

/***/ "./api/createHash.ts":
/*!***************************!*\
  !*** ./api/createHash.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Создает хеш сообщения по ГОСТ Р 34.11-2012 256 бит
 * https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%B8%D0%B1%D0%BE%D0%B3_(%D1%85%D0%B5%D1%88-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F)
 *
 * @param unencryptedMessage - сообщение для хеширования
 *
 * @returns хеш
 */
exports.createHash = _afterPluginsLoaded_1._afterPluginsLoaded(function (unencryptedMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin;
    return __generator(this, function (_a) {
        cadesplugin = window.cadesplugin;
        return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function createHash() {
                var cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
                var messageBase64;
                var hash;
                try {
                    messageBase64 = Buffer.from(unencryptedMessage).toString('base64');
                }
                catch (error) {
                    console.error(error);
                    throw new Error('Ошибка при преобразовании сообщения в Base64');
                }
                try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ +
                        cadesHashedData.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.Hash(messageBase64));
                }
                catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации хэширования');
                }
                try {
                    hash = _generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.Value;
                }
                catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при создании хэша');
                }
                return hash;
            }))];
    });
}); });

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/buffer/index.js */ "../node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./api/createHashSignature.ts":
/*!************************************!*\
  !*** ./api/createHashSignature.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
/**
 * Создаёт подпись для хешированного сообщения
 *
 * @param oCertificate - объект класса Certificate для подписания сообщения
 * @param oHashedData - объект класса oHashedData содержащий в себе захэшированное сообщение
 * @returns строку с подписанным хэшем
 */
exports.createHashSignature = _afterPluginsLoaded_1._afterPluginsLoaded(function (oCertificate, oHashedData) { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin, cadesCertificate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cadesplugin = window.cadesplugin;
                cadesCertificate = oCertificate._cadesCertificate;
                return [4 /*yield*/, oHashedData.Algorithm];
            case 1:
                _a.sent();
                return [4 /*yield*/, oHashedData.Value];
            case 2:
                _a.sent();
                return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function createHashSignature() {
                        var cadesAttrs;
                        var cadesSignedData;
                        var cadesSigner;
                        try {
                            cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
                            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
                            cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
                        }
                        var currentTime = _getDateObj_1._getDateObj(new Date());
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при установке времени подписи');
                        }
                        var cadesAuthAttrs;
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                            cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(constants_1.CADESCOM_BASE64_TO_BINARY));
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
                        }
                        var signature;
                        try {
                            signature =
                                _generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.SignHash(oHashedData, cadesSigner, cadesplugin.CADESCOM_CADES_BES);
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || e);
                        }
                        return signature;
                    }))];
        }
    });
}); });


/***/ }),

/***/ "./api/createSignature.ts":
/*!********************************!*\
  !*** ./api/createSignature.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _getCadesCert_1 = __webpack_require__(/*! ../helpers/_getCadesCert */ "./helpers/_getCadesCert.ts");
var _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
/**
 * Создает подпись base64 строки по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param messageHash - хеш подписываемого сообщения, сгенерированный по ГОСТ Р 34.11
 * @param detachedSignature = true - тип подписи открепленная (true) / присоединенная (false)
 * @returns подпись
 */
exports.createSignature = _afterPluginsLoaded_1._afterPluginsLoaded(function (thumbprint, messageHash, detachedSignature) {
    if (detachedSignature === void 0) { detachedSignature = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var cadesplugin, cadesCertificate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.warn([
                        'cryptoPro: Метод "createSignature" является устаревшим и будет убран из будущих версий.',
                        'Используйте "createAttachedSignature" и "createDetachedSignature".',
                    ].join('\n'));
                    cadesplugin = window.cadesplugin;
                    return [4 /*yield*/, _getCadesCert_1._getCadesCert(thumbprint)];
                case 1:
                    cadesCertificate = _a.sent();
                    return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function createSignature() {
                            var cadesAttrs;
                            var cadesSignedData;
                            var cadesSigner;
                            try {
                                cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
                                cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
                                cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
                            }
                            catch (error) {
                                console.error(error);
                                throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
                            }
                            var currentTime = _getDateObj_1._getDateObj(new Date());
                            try {
                                void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                                void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                            }
                            catch (error) {
                                console.error(error);
                                throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при установке времени подписи');
                            }
                            var cadesAuthAttrs;
                            try {
                                void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                                cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                                void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                                void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                                void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_Content(messageHash));
                                void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY));
                            }
                            catch (error) {
                                console.error(error);
                                throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
                            }
                            var signature;
                            try {
                                signature =
                                    _generateCadesFn_1.__cadesAsyncToken__ +
                                        cadesSignedData.SignCades(cadesSigner, cadesplugin.CADESCOM_CADES_BES, detachedSignature);
                            }
                            catch (error) {
                                console.error(error);
                                throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
                            }
                            return signature;
                        }))];
            }
        });
    });
});


/***/ }),

/***/ "./api/decryptEnvelopedData.ts":
/*!*************************************!*\
  !*** ./api/decryptEnvelopedData.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
/**
 * Расшифровывает сообщение полученное вызовом метода encryptEnvelopedData
 *
 * @param sSignedData - строка с зашифрованным сообщением
 * @returns строку исходного сообщения
 */
exports.decryptEvelopedData = _afterPluginsLoaded_1._afterPluginsLoaded(function (sSignedData) { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin;
    return __generator(this, function (_a) {
        cadesplugin = window.cadesplugin;
        return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function decryptEnvelopedData() {
                var cadesEnvelopedData;
                try {
                    cadesEnvelopedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
                }
                catch (e) {
                    console.error(e);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации объекта шифрования');
                }
                try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                }
                catch (e) {
                    console.error(e);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для проверки шифрования');
                }
                var encData;
                try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Decrypt(sSignedData));
                    encData = _generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Content;
                }
                catch (e) {
                    console.log(e);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка расшифровки сообщения');
                }
                return encData;
            }))];
    });
}); });


/***/ }),

/***/ "./api/encryptEnvelopedData.ts":
/*!*************************************!*\
  !*** ./api/encryptEnvelopedData.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
/**
 * Создаёт зашифрованное сообщение из base64 строки по списку сертификатов
 * @param oCertificateList - массив объектов Certificate для добавления в список реципиентов сообщения
 * @param dataBase64 - строковые данные в формате base64
 * @returns строку с зашифрованным сообщением
 */
exports.encryptEnvelopedData = _afterPluginsLoaded_1._afterPluginsLoaded(function (oCertificateList, dataBase64) { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin;
    return __generator(this, function (_a) {
        cadesplugin = window.cadesplugin;
        return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function encryptEnvelopedData() {
                var cadesEnvelopedData;
                try {
                    cadesEnvelopedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
                }
                catch (e) {
                    console.error(e);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации объекта шифрования');
                }
                var cadesReceipients = _generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Recipients;
                try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.propset_Content(dataBase64));
                    for (var _i = 0, oCertificateList_1 = oCertificateList; _i < oCertificateList_1.length; _i++) {
                        var oCertificate = oCertificateList_1[_i];
                        void (_generateCadesFn_1.__cadesAsyncToken__ + cadesReceipients.Add(oCertificate._cadesCertificate));
                    }
                }
                catch (e) {
                    console.error(e);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для шифрования');
                }
                var signature;
                try {
                    signature = _generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Encrypt();
                }
                catch (e) {
                    console.error(e);
                }
                return signature;
            }))];
    });
}); });


/***/ }),

/***/ "./api/getCertificate.ts":
/*!*******************************!*\
  !*** ./api/getCertificate.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var getUserCertificates_1 = __webpack_require__(/*! ./getUserCertificates */ "./api/getUserCertificates.ts");
/**
 * Возвращает сертификат по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат
 */
exports.getCertificate = _afterPluginsLoaded_1._afterPluginsLoaded(function (thumbprint) { return __awaiter(void 0, void 0, void 0, function () {
    var availableCertificates, foundCertificate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!thumbprint) {
                    throw new Error('Отпечаток не указан');
                }
                return [4 /*yield*/, getUserCertificates_1.getUserCertificates()];
            case 1:
                availableCertificates = _a.sent();
                foundCertificate = availableCertificates.find(function (cert) { return cert.thumbprint === thumbprint; });
                if (!foundCertificate) {
                    throw new Error("\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0441 \u043E\u0442\u043F\u0435\u0447\u0430\u0442\u043A\u043E\u043C: \"" + thumbprint + "\" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
                }
                return [2 /*return*/, foundCertificate];
        }
    });
}); });


/***/ }),

/***/ "./api/getEnvelopedData.ts":
/*!*********************************!*\
  !*** ./api/getEnvelopedData.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
/**
 * Создаёт объект CAdESCOM.CPEnvelopedData
 * @returns объект CAdESCOM.CPEnvelopedData
 */
exports.getEnvelopedData = _afterPluginsLoaded_1._afterPluginsLoaded(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cadesplugin;
    return __generator(this, function (_a) {
        cadesplugin = window.cadesplugin;
        return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function streamEncryptEnvelopedData() {
                var cadesEnvelopedData;
                try {
                    cadesEnvelopedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
                }
                catch (e) {
                    console.log(e);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
                }
                try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                }
                catch (e) {
                    console.error(e);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных подписи');
                }
                return cadesEnvelopedData;
            }))];
    });
}); });


/***/ }),

/***/ "./api/getHashedData.ts":
/*!******************************!*\
  !*** ./api/getHashedData.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
/**
 * Создаёт объект oHashedData с заданным алгоритмом шифрования
 *
 * @param hashAlg = 101 - код алгоритма хеширования из списка констант(/src/constants/cades-constants.ts)
 * @returns объект oHashedData
 */
exports.getHashedData = _afterPluginsLoaded_1._afterPluginsLoaded(function (hashAlg) {
    if (hashAlg === void 0) { hashAlg = constants_1.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function createHashedData() {
                    var oHashedData;
                    try {
                        oHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
                    }
                    catch (error) {
                        console.error(error);
                        throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Не удалось получить хэш функцию');
                    }
                    try {
                        void (_generateCadesFn_1.__cadesAsyncToken__ + oHashedData.propset_Algorithm(hashAlg));
                        void (_generateCadesFn_1.__cadesAsyncToken__ + oHashedData.propset_DataEncoding(constants_1.CADESCOM_BASE64_TO_BINARY));
                    }
                    catch (error) {
                        console.error(error);
                        throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Не удалось установить настройки хеширования');
                    }
                    return oHashedData;
                }))];
        });
    });
});


/***/ }),

/***/ "./api/getSystemInfo.ts":
/*!******************************!*\
  !*** ./api/getSystemInfo.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о CSP и плагине
 */
exports.getSystemInfo = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    var sysInfo = {
        cadesVersion: null,
        cspVersion: null,
    };
    return eval(_generateCadesFn_1._generateCadesFn(function getSystemInfo() {
        var cadesAbout;
        try {
            cadesAbout = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.About');
            sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.PluginVersion;
            sysInfo.cspVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.CSPVersion();
            if (!sysInfo.cadesVersion) {
                sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.Version;
            }
            sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + sysInfo.cadesVersion.toString();
            sysInfo.cspVersion = _generateCadesFn_1.__cadesAsyncToken__ + sysInfo.cspVersion.toString();
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о системе');
        }
        return sysInfo;
    }));
});


/***/ }),

/***/ "./api/getUserCertificates.ts":
/*!************************************!*\
  !*** ./api/getUserCertificates.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var certificate_1 = __webpack_require__(/*! ./certificate */ "./api/certificate/index.ts");
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractCommonName_1 = __webpack_require__(/*! ../helpers/_extractCommonName */ "./helpers/_extractCommonName.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var certificatesCache;
/**
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @param skipCheck = false - позволяет пропустить проверку наличия закрытых ключей
 * @returns список сертификатов
 */
exports.getUserCertificates = _afterPluginsLoaded_1._afterPluginsLoaded(function (resetCache, skipCheck) {
    if (resetCache === void 0) { resetCache = false; }
    if (skipCheck === void 0) { skipCheck = false; }
    var cadesplugin = window.cadesplugin;
    if (!resetCache && certificatesCache) {
        return certificatesCache;
    }
    return eval(_generateCadesFn_1._generateCadesFn(function getUserCertificates() {
        var cadesStore;
        try {
            cadesStore = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.Store');
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ +
                cadesStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }
        var cadesCertificates;
        var cadesCertificatesCount;
        try {
            cadesCertificates = _generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Certificates;
            if (cadesCertificates) {
                cadesCertificates =
                    _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
                if (!skipCheck) {
                    /**
                     * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
                     * или не действительны на данный момент
                     */
                    cadesCertificates =
                        _generateCadesFn_1.__cadesAsyncToken__ +
                            cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY, constants_1.CAPICOM_PROPID_KEY_PROV_INFO);
                }
                cadesCertificatesCount = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Count;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }
        if (!cadesCertificatesCount) {
            throw new Error('Нет доступных сертификатов');
        }
        var certificateList = [];
        try {
            while (cadesCertificatesCount) {
                var cadesCertificate = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Item(cadesCertificatesCount);
                certificateList.push(new certificate_1.Certificate(cadesCertificate, _extractCommonName_1._extractCommonName(_generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.SubjectName), _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.IssuerName, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.SubjectName, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.Thumbprint, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ValidFromDate, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ValidToDate, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.HasPrivateKey()));
                cadesCertificatesCount--;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка обработки сертификатов');
        }
        cadesStore.Close();
        certificatesCache = certificateList;
        return certificatesCache;
    }));
});


/***/ }),

/***/ "./api/index.ts":
/*!**********************!*\
  !*** ./api/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./getCertificate */ "./api/getCertificate.ts"));
__export(__webpack_require__(/*! ./getUserCertificates */ "./api/getUserCertificates.ts"));
__export(__webpack_require__(/*! ./getSystemInfo */ "./api/getSystemInfo.ts"));
__export(__webpack_require__(/*! ./isValidSystemSetup */ "./api/isValidSystemSetup.ts"));
__export(__webpack_require__(/*! ./createSignature */ "./api/createSignature.ts"));
__export(__webpack_require__(/*! ./getHashedData */ "./api/getHashedData.ts"));
__export(__webpack_require__(/*! ./createHashSignature */ "./api/createHashSignature.ts"));
__export(__webpack_require__(/*! ./createCoSignature */ "./api/createCoSignature.ts"));
__export(__webpack_require__(/*! ./verifyHashSignature */ "./api/verifyHashSignature.ts"));
__export(__webpack_require__(/*! ./getEnvelopedData */ "./api/getEnvelopedData.ts"));
__export(__webpack_require__(/*! ./encryptEnvelopedData */ "./api/encryptEnvelopedData.ts"));
__export(__webpack_require__(/*! ./decryptEnvelopedData */ "./api/decryptEnvelopedData.ts"));
__export(__webpack_require__(/*! ./createDetachedSignature */ "./api/createDetachedSignature.ts"));
__export(__webpack_require__(/*! ./createAttachedSignature */ "./api/createAttachedSignature.ts"));
__export(__webpack_require__(/*! ./createHash */ "./api/createHash.ts"));
__export(__webpack_require__(/*! ./certificate */ "./api/certificate/index.ts"));


/***/ }),

/***/ "./api/isValidSystemSetup.ts":
/*!***********************************!*\
  !*** ./api/isValidSystemSetup.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _isSupportedCadesVersion_1 = __webpack_require__(/*! ../helpers/_isSupportedCadesVersion */ "./helpers/_isSupportedCadesVersion.ts");
var _isSupportedCSPVersion_1 = __webpack_require__(/*! ../helpers/_isSupportedCSPVersion */ "./helpers/_isSupportedCSPVersion.ts");
var getSystemInfo_1 = __webpack_require__(/*! ./getSystemInfo */ "./api/getSystemInfo.ts");
/**
 * Проверяет корректность настроек ЭП на машине
 *
 * @returns флаг корректности настроек
 */
exports.isValidSystemSetup = _afterPluginsLoaded_1._afterPluginsLoaded(function () { return __awaiter(void 0, void 0, void 0, function () {
    var systemInfo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getSystemInfo_1.getSystemInfo()];
            case 1:
                systemInfo = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error_1) || 'Настройки ЭП на данной машине не верны');
            case 3:
                if (!_isSupportedCadesVersion_1._isSupportedCadesVersion(systemInfo.cadesVersion)) {
                    throw new Error('Не поддерживаемая версия плагина');
                }
                if (!_isSupportedCSPVersion_1._isSupportedCSPVersion(systemInfo.cspVersion)) {
                    throw new Error('Не поддерживаемая версия CSP');
                }
                return [2 /*return*/, true];
        }
    });
}); });


/***/ }),

/***/ "./api/verifyHashSignature.ts":
/*!************************************!*\
  !*** ./api/verifyHashSignature.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
/**
 * Валидация подписи хэшированного сообщения
 *
 * @param oHashedData - объект oHashedData с установленным значением Value и Algorithm
 * @param sSignedMessage - подписанное сообщение для валидации
 * @returns true или ошибку
 */
exports.verifyHashSignature = _afterPluginsLoaded_1._afterPluginsLoaded(function (oHashedData, sSignedMessage) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, oHashedData.Algorithm];
            case 1:
                _a.sent();
                return [4 /*yield*/, oHashedData.Value];
            case 2:
                _a.sent();
                return [2 /*return*/, eval(_generateCadesFn_1._generateCadesFn(function verifyHashSignature() {
                        var cadesSignedData;
                        try {
                            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
                        }
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(constants_1.CADESCOM_BASE64_TO_BINARY));
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для верификации');
                        }
                        var result = true;
                        try {
                            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.VerifyHash(oHashedData, sSignedMessage, constants_1.CADESCOM_CADES_BES));
                        }
                        catch (e) {
                            console.error(e);
                            result = false;
                        }
                        return result;
                    }))];
        }
    });
}); });


/***/ }),

/***/ "./constants/cades-constants.ts":
/*!**************************************!*\
  !*** ./constants/cades-constants.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CADESCOM_ATTRIBUTE_OTHER = -1;
exports.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
exports.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
exports.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
exports.CADESCOM_AllowNoOutstandingRequest = 1;
exports.CADESCOM_AllowNone = 0;
exports.CADESCOM_AllowUntrustedCertificate = 2;
exports.CADESCOM_AllowUntrustedRoot = 4;
exports.CADESCOM_BASE64_TO_BINARY = 0x01;
exports.CADESCOM_CADES_BES = 1;
exports.CADESCOM_CADES_DEFAULT = 0;
exports.CADESCOM_CADES_T = 5;
exports.CADESCOM_CADES_X_LONG_TYPE_1 = 0x5d;
exports.CADESCOM_CONTAINER_STORE = 100;
exports.CADESCOM_CURRENT_USER_STORE = 2;
exports.CADESCOM_DISPLAY_DATA_ATTRIBUTE = 2;
exports.CADESCOM_DISPLAY_DATA_CONTENT = 1;
exports.CADESCOM_DISPLAY_DATA_NONE = 0;
exports.CADESCOM_ENCODE_ANY = -1;
exports.CADESCOM_ENCODE_BASE64 = 0;
exports.CADESCOM_ENCODE_BINARY = 1;
exports.CADESCOM_ENCRYPTION_ALGORITHM_3DES = 3;
exports.CADESCOM_ENCRYPTION_ALGORITHM_AES = 4;
exports.CADESCOM_ENCRYPTION_ALGORITHM_DES = 2;
exports.CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 = 25;
exports.CADESCOM_ENCRYPTION_ALGORITHM_RC2 = 0;
exports.CADESCOM_ENCRYPTION_ALGORITHM_RC4 = 1;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 = 101;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256_HMAC = 111;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 = 102;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512_HMAC = 112;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_HMAC = 110;
exports.CADESCOM_HASH_ALGORITHM_MD2 = 1;
exports.CADESCOM_HASH_ALGORITHM_MD4 = 2;
exports.CADESCOM_HASH_ALGORITHM_MD5 = 3;
exports.CADESCOM_HASH_ALGORITHM_SHA1 = 0;
exports.CADESCOM_HASH_ALGORITHM_SHA_256 = 4;
exports.CADESCOM_HASH_ALGORITHM_SHA_384 = 5;
exports.CADESCOM_HASH_ALGORITHM_SHA_512 = 6;
exports.CADESCOM_LOCAL_MACHINE_STORE = 1;
exports.CADESCOM_PKCS7_TYPE = 65535;
exports.CADESCOM_STRING_TO_UCS2LE = 0x00;
exports.CADESCOM_SkipInstallToStore = 268435456;
exports.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;
exports.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;
exports.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;
exports.CAPICOM_ACTIVE_DIRECTORY_USER_STORE = 3;
exports.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
exports.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
exports.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
exports.CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7;
exports.CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8;
exports.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
exports.CAPICOM_CERTIFICATE_FIND_EXTENSION = 5;
exports.CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;
exports.CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;
exports.CAPICOM_CERTIFICATE_FIND_ROOT_NAME = 3;
exports.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
exports.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
exports.CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME = 4;
exports.CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED = 11;
exports.CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10;
exports.CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
exports.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT = 0;
exports.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY = 2;
exports.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
exports.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME = 1;
exports.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0;
exports.CAPICOM_CURRENT_USER_STORE = 2;
exports.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128;
exports.CAPICOM_EKU_CLIENT_AUTH = 2;
exports.CAPICOM_EKU_OTHER = 0;
exports.CAPICOM_EKU_SMARTCARD_LOGON = 5;
exports.CAPICOM_LOCAL_MACHINE_STORE = 1;
exports.CAPICOM_MEMORY_STORE = 0;
exports.CAPICOM_MY_STORE = 'My';
exports.CAPICOM_OID_KEY_USAGE_EXTENSION = 10;
exports.CAPICOM_OID_OTHER = 0;
exports.CAPICOM_PROPID_ACCESS_STATE = 14;
exports.CAPICOM_PROPID_ARCHIVED = 19;
exports.CAPICOM_PROPID_ARCHIVED_KEY_HASH = 65;
exports.CAPICOM_PROPID_AUTO_ENROLL = 21;
exports.CAPICOM_PROPID_CROSS_CERT_DIST_POINTS = 23;
exports.CAPICOM_PROPID_CTL_USAGE = 9;
exports.CAPICOM_PROPID_DATE_STAMP = 27;
exports.CAPICOM_PROPID_DESCRIPTION = 13;
exports.CAPICOM_PROPID_EFS = 17;
exports.CAPICOM_PROPID_ENHKEY_USAGE = 9;
exports.CAPICOM_PROPID_ENROLLMENT = 26;
exports.CAPICOM_PROPID_EXTENDED_ERROR_INFO = 30;
exports.CAPICOM_PROPID_FIRST_RESERVED = 66;
exports.CAPICOM_PROPID_FIRST_USER = 0x00008000;
exports.CAPICOM_PROPID_FORTEZZA_DATA = 18;
exports.CAPICOM_PROPID_FRIENDLY_NAME = 11;
exports.CAPICOM_PROPID_HASH_PROP = 3;
exports.CAPICOM_PROPID_IE30_RESERVED = 7;
exports.CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH = 24;
exports.CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH = 28;
exports.CAPICOM_PROPID_KEY_CONTEXT = 5;
exports.CAPICOM_PROPID_KEY_IDENTIFIER = 20;
exports.CAPICOM_PROPID_KEY_PROV_HANDLE = 1;
exports.CAPICOM_PROPID_KEY_PROV_INFO = 2;
exports.CAPICOM_PROPID_KEY_SPEC = 6;
exports.CAPICOM_PROPID_LAST_RESERVED = 0x00007fff;
exports.CAPICOM_PROPID_LAST_USER = 0x0000ffff;
exports.CAPICOM_PROPID_MD5_HASH = 4;
exports.CAPICOM_PROPID_NEXT_UPDATE_LOCATION = 10;
exports.CAPICOM_PROPID_PUBKEY_ALG_PARA = 22;
exports.CAPICOM_PROPID_PUBKEY_HASH_RESERVED = 8;
exports.CAPICOM_PROPID_PVK_FILE = 12;
exports.CAPICOM_PROPID_RENEWAL = 64;
exports.CAPICOM_PROPID_SHA1_HASH = 3;
exports.CAPICOM_PROPID_SIGNATURE_HASH = 15;
exports.CAPICOM_PROPID_SMART_CARD_DATA = 16;
exports.CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH = 29;
exports.CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH = 25;
exports.CAPICOM_PROPID_UNKNOWN = 0;
exports.CAPICOM_SMART_CARD_USER_STORE = 4;
exports.CAPICOM_STORE_OPEN_EXISTING_ONLY = 128;
exports.CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED = 256;
exports.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
exports.CAPICOM_STORE_OPEN_READ_ONLY = 0;
exports.CAPICOM_STORE_OPEN_READ_WRITE = 1;
exports.CHECK_NONE = 0;
exports.CHECK_OFFLINE_REVOCATION_STATUS = 16;
exports.CHECK_ONLINE_REVOCATION_STATUS = 8;
exports.CHECK_SIGNATURE_VALIDITY = 4;
exports.CHECK_TIME_VALIDITY = 2;
exports.CHECK_TRUSTED_ROOT = 1;
exports.LOG_LEVEL_DEBUG = 4;
exports.LOG_LEVEL_ERROR = 1;
exports.LOG_LEVEL_INFO = 2;
exports.TRUST_CTL_IS_NOT_SIGNATURE_VALID = 262144;
exports.TRUST_CTL_IS_NOT_TIME_VALID = 131072;
exports.TRUST_CTL_IS_NOT_VALID_FOR_USAGE = 524288;
exports.TRUST_IS_CYCLIC = 128;
exports.TRUST_IS_NOT_SIGNATURE_VALID = 8;
exports.TRUST_IS_NOT_TIME_NESTED = 2;
exports.TRUST_IS_NOT_TIME_VALID = 1;
exports.TRUST_IS_NOT_VALID_FOR_USAGE = 16;
exports.TRUST_IS_PARTIAL_CHAIN = 65536;
exports.TRUST_IS_REVOKED = 4;
exports.TRUST_IS_UNTRUSTED_ROOT = 32;
exports.TRUST_REVOCATION_STATUS_UNKNOWN = 64;
exports.XmlDsigGost3410Url = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411';
exports.XmlDsigGost3410UrlObsolete = 'http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411';
exports.XmlDsigGost3411Url = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411';
exports.XmlDsigGost3411UrlObsolete = 'http://www.w3.org/2001/04/xmldsig-more#gostr3411';


/***/ }),

/***/ "./constants/index.ts":
/*!****************************!*\
  !*** ./constants/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./cades-constants */ "./constants/cades-constants.ts"));
__export(__webpack_require__(/*! ./issuer-tags-translations */ "./constants/issuer-tags-translations.ts"));
__export(__webpack_require__(/*! ./oids-dictionary */ "./constants/oids-dictionary.ts"));
__export(__webpack_require__(/*! ./subject-tags-translations */ "./constants/subject-tags-translations.ts"));


/***/ }),

/***/ "./constants/issuer-tags-translations.ts":
/*!***********************************************!*\
  !*** ./constants/issuer-tags-translations.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ISSUER_TAGS_TRANSLATIONS = [
    { possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя' },
    { possibleNames: ['CN'], translation: 'Удостоверяющий центр' },
    { possibleNames: ['C'], translation: 'Страна' },
    { possibleNames: ['S'], translation: 'Регион' },
    { possibleNames: ['STREET'], translation: 'Адрес' },
    { possibleNames: ['O'], translation: 'Компания' },
    { possibleNames: ['OU'], translation: 'Тип' },
    { possibleNames: ['T'], translation: 'Должность' },
    { possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН' },
    { possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП' },
    { possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС' },
    { possibleNames: ['ИНН', 'INN', 'ИНН организации'], translation: 'ИНН' },
    { possibleNames: ['E'], translation: 'Email' },
    { possibleNames: ['L'], translation: 'Город' },
];


/***/ }),

/***/ "./constants/oids-dictionary.ts":
/*!**************************************!*\
  !*** ./constants/oids-dictionary.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OIDS_DICTIONARY = {
    '1.2.643.2.2.34.6': 'Пользователь Центра Регистрации',
    '1.2.643.2.39.1.1': 'Использование в программных продуктах системы "1С:Предприятие 8"',
    '1.2.643.3.131.1.1': 'ИНН',
    '1.2.643.3.141.1.1': 'РНС ФСС',
    '1.2.643.3.141.1.2': 'КП ФСС',
    '1.2.643.3.2.100.65.13.11': 'Использование в системе АИС "Госзакупки" Сахалинской области.',
    '1.2.643.3.8.100.1': 'Сертификат типа "ekey-ГОСТ"',
    '1.2.643.3.8.100.1.1': 'Общее использование в системах ИОК без права заверения финансовых документов',
    '1.2.643.3.8.100.1.10': 'Для участия в электронных торгах и подписания государственного контракта в  информационных системах Тендерного комитета города Москвы уполномоченными  лицами участников размещения государственного заказа города Москвы',
    '1.2.643.3.8.100.1.11': 'Подписание электронных документов в автоматизированной информационной  системе размещения государственного и муниципального заказа Саратовской области',
    '1.2.643.3.8.100.1.12': 'Использование в системе государственного заказа Иркутской области',
    '1.2.643.3.8.100.1.13': 'Использование в электронной торговой площадке агентства государственного  заказа Красноярского края',
    '1.2.643.3.8.100.1.14': 'Использование в электронной торговой площадке "Тендер"',
    '1.2.643.3.8.100.1.2': 'Передача отчетности по ТКС',
    '1.2.643.3.8.100.1.3': 'Оформление взаимных обязательств, соглашений, договоров, актов и т.п.',
    '1.2.643.3.8.100.1.4': 'Внутрикорпоративный документооборот',
    '1.2.643.3.8.100.1.5': 'Использование в системах электронной торговли',
    '1.2.643.3.8.100.1.6': 'Использование в торгово-закупочной системе "ЭЛЕКТРА"',
    '1.2.643.3.8.100.1.7': 'Использование в системе Портал государственных закупок Ставропольского края.',
    '1.2.643.3.8.100.1.8': 'Использование в Единой системе электронной торговли B2B-Center и B2G.',
    '1.2.643.3.8.100.1.9': 'Для участия в электронных торгах и подписания государственного контракта в  электронной площадке ОАО «ЕЭТП» уполномоченными лицами участников размещения  государственного или муниципального заказа',
    '1.2.643.5.1.24.2.1.3': 'Формирование документов для получения государственных  услуг в сфере ведения государственного кадастра недвижимости со стороны заявителя',
    '1.2.643.5.1.24.2.1.3.1': 'Формирование кадастровым инженером документов  для получения государственных услуг в сфере ведения государственного кадастра недвижимости со стороны  заявителя',
    '1.2.643.5.1.24.2.2.2': 'Формирование документов как результата оказания  услуги со стороны органов регистрации прав',
    '1.2.643.5.1.24.2.2.3': 'Формирование документов для получения государственных  услуг в сфере государственной регистрации прав на недвижимое имущество и сделок с ним со стороны заявителя',
    '1.2.643.6.2.1.7.1': 'Использование единоличным исполнительным органом юридического лица или уполномоченными представителями юридического лица в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских и иных прав и обязанностей в сфере негосударственного пенсионного обеспечения, негосударственного пенсионного страхования, в сфере деятельности паевых инвестиционных фондов, акционерных инвестиционных фондов, профессиональных участников рынка ценных бумаг, а также связанной с обслуживанием указанной деятельности услуг кредитных и иных организаций',
    '1.2.643.6.2.1.7.2': 'Использование физическим лицом в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских прав и обязанностей в отношении инвестиционных паев паевых инвестиционных фондов, в том числе отношения, связанные с учетом и/или фиксацией прав на инвестиционные паи паевых инвестиционных фондов',
    '1.2.643.6.3': 'Использование в электронных торговых системах и в программном обеспечении, связанным с обменом электронных сообщений',
    '1.2.643.6.3.1.1': 'Использование на электронных площадок отобранных для проведения аукционах в электронной форме',
    '1.2.643.6.3.1.2.1': 'Тип участника - Юридическое лицо',
    '1.2.643.6.3.1.2.2': 'Тип участника - Физическое лицо',
    '1.2.643.6.3.1.2.3': 'Тип участника - Индивидуальный предприниматель',
    '1.2.643.6.3.1.3.1': 'Участник размещения заказа',
    '1.2.643.6.3.1.4.1': 'Администратор организации',
    '1.2.643.6.3.1.4.2': 'Уполномоченный специалист',
    '1.2.643.6.3.1.4.3': 'Специалист с правом подписи контракта',
    '1.2.840.113549.1.9.2': 'Неструктурированное имя',
    '1.3.6.1.4.1.24138.1.1.8.1': 'Обеспечение юридической значимости в Системе "Электронная Торговая Площадка"',
    '1.3.6.1.4.1.29919.21': 'Использование в системе Портал государственных закупок  Ростовской области "Рефери".',
    '1.3.6.1.5.5.7.3.2': 'Проверка подлинности клиента',
    '1.3.6.1.5.5.7.3.4': 'Защищенная электронная почта',
    '1.3.643.3.8.100.15': 'Использование в ЭТП "uTender"',
};


/***/ }),

/***/ "./constants/subject-tags-translations.ts":
/*!************************************************!*\
  !*** ./constants/subject-tags-translations.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBJECT_TAGS_TRANSLATIONS = [
    { possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя' },
    { possibleNames: ['CN'], translation: 'Владелец' },
    { possibleNames: ['SN'], translation: 'Фамилия' },
    { possibleNames: ['G'], translation: 'Имя Отчество' },
    { possibleNames: ['C'], translation: 'Страна' },
    { possibleNames: ['S'], translation: 'Регион' },
    { possibleNames: ['STREET'], translation: 'Адрес' },
    { possibleNames: ['O'], translation: 'Компания' },
    { possibleNames: ['OU'], translation: 'Отдел/подразделение' },
    { possibleNames: ['T'], translation: 'Должность' },
    { possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН' },
    { possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП' },
    { possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС' },
    { possibleNames: ['ИНН', 'INN', 'ИНН организации'], translation: 'ИНН' },
    { possibleNames: ['E'], translation: 'Email' },
    { possibleNames: ['L'], translation: 'Город' },
];


/***/ }),

/***/ "./crypto-pro.ts":
/*!***********************!*\
  !*** ./crypto-pro.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./api */ "./api/index.ts"));


/***/ }),

/***/ "./helpers/_afterPluginsLoaded.ts":
/*!****************************************!*\
  !*** ./helpers/_afterPluginsLoaded.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ./_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var isSetLogLevel = false;
var isPluginLoaded = false;
exports._afterPluginsLoaded = function (fn) {
    var canPromise = Boolean(window.Promise);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var cadesplugin, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isPluginLoaded) {
                            try {
                                __webpack_require__(/*! ../vendor/cadesplugin_api */ "./vendor/cadesplugin_api.js");
                            }
                            catch (error) {
                                console.error(error);
                                throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при подключении модуля для работы с Cades plugin');
                            }
                            isPluginLoaded = true;
                        }
                        cadesplugin = window.cadesplugin;
                        if (!canPromise) {
                            throw new Error('Необходим полифилл для Promise');
                        }
                        if (!cadesplugin) {
                            throw new Error('Не подключен модуль для работы с Cades plugin');
                        }
                        if (!isSetLogLevel) {
                            cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);
                            isSetLogLevel = true;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cadesplugin];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error_1) || 'Ошибка при инициализации модуля для работы с Cades plugin');
                    case 4: return [4 /*yield*/, fn.apply(this, args)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
};


/***/ }),

/***/ "./helpers/_extractCommonName.ts":
/*!***************************************!*\
  !*** ./helpers/_extractCommonName.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports._extractCommonName = function (subjectName) { var _a; return (_a = subjectName.match(/CN=(.+?)(?:,|$)/)) === null || _a === void 0 ? void 0 : _a[1]; };


/***/ }),

/***/ "./helpers/_extractMeaningfulErrorMessage.ts":
/*!***************************************************!*\
  !*** ./helpers/_extractMeaningfulErrorMessage.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports._extractMeaningfulErrorMessage = function (error) {
    var _a;
    var errorContainer = ((_a = window.cadesplugin) === null || _a === void 0 ? void 0 : _a.getLastError) && window.cadesplugin.getLastError(error);
    if (!(errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.message)) {
        if (!error.message) {
            return null;
        }
        errorContainer = error;
    }
    var containsRussianLetters = /[а-яА-Я]/.test(errorContainer.message);
    if (!containsRussianLetters) {
        return null;
    }
    var searchResult = errorContainer.message.match(/^(.*?)(?:(?:\.?\s?\(?0x)|(?:\.?$))/);
    return searchResult ? searchResult[1] : null;
};


/***/ }),

/***/ "./helpers/_generateCadesFn.ts":
/*!*************************************!*\
  !*** ./helpers/_generateCadesFn.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// синтетические переменные, которые подменяются в рантайме
exports.__cadesAsyncToken__ = {};
exports.__createCadesPluginObject__ = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return ({});
};
function getGeneratorConstructor() {
    return new Function('', 'return Object.getPrototypeOf(function*(){}).constructor')();
}
exports._generateCadesFn = function (callback) {
    var _a;
    var cadesplugin = window.cadesplugin;
    var cadesGeneratorsAPI = Boolean(cadesplugin.CreateObjectAsync);
    var callbackName = callback.name || 'dynamicFn';
    var callbackLiteral = String(callback);
    var callbackArguments = ((_a = callbackLiteral.match(/^function[\s\w]*?\((.*?)\)/)) === null || _a === void 0 ? void 0 : _a[1]) || '';
    var callbackBody = callbackLiteral.replace(/^.*?{([\s\S]*?)}$/, '$1');
    var crossEnvCallbackLiteral = String(new (cadesGeneratorsAPI ? getGeneratorConstructor() : Function)(callbackArguments, callbackBody));
    crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/\w+?\.__createCadesPluginObject__(\([\s\S]*?\))/gm, "cadesplugin.CreateObject" + (cadesGeneratorsAPI ? 'Async' : '') + "$1");
    crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/\w+?\.__cadesAsyncToken__\s*?\+\s*?\b/gm, cadesGeneratorsAPI ? 'yield ' : '');
    if (!cadesGeneratorsAPI) {
        crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/propset_(.*?)\((.*?)\)/gm, '$1 = $2');
    }
    return [
        cadesGeneratorsAPI ? "cadesplugin.async_spawn(" + crossEnvCallbackLiteral + ");" : "(" + crossEnvCallbackLiteral + ")();",
        "//# sourceURL=crypto-pro_" + callbackName + ".js",
    ].join('');
};


/***/ }),

/***/ "./helpers/_getCadesCert.ts":
/*!**********************************!*\
  !*** ./helpers/_getCadesCert.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _afterPluginsLoaded_1 = __webpack_require__(/*! ./_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
var _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ./_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
var _generateCadesFn_1 = __webpack_require__(/*! ./_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает сертификат в формате Cades по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат в формате Cades
 */
exports._getCadesCert = _afterPluginsLoaded_1._afterPluginsLoaded(function (thumbprint) {
    var cadesplugin = window.cadesplugin;
    return eval(_generateCadesFn_1._generateCadesFn(function _getCadesCert() {
        var cadesStore;
        try {
            cadesStore = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.Store');
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
        }
        if (!cadesStore) {
            throw new Error('Не удалось получить доступ к хранилищу сертификатов');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ +
                cadesStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }
        var cadesCertificateList;
        var certificatesCount;
        try {
            cadesCertificateList = _generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Certificates;
            certificatesCount = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Count;
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }
        if (!certificatesCount) {
            throw new Error('Нет доступных сертификатов');
        }
        var cadesCertificate;
        try {
            cadesCertificateList =
                _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
            var count = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Count;
            if (!count) {
                throw new Error("\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0441 \u043E\u0442\u043F\u0435\u0447\u0430\u0442\u043A\u043E\u043C: \"" + thumbprint + "\" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
            }
            cadesCertificate = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Item(1);
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при получении сертификата');
        }
        cadesStore.Close();
        return cadesCertificate;
    }));
});


/***/ }),

/***/ "./helpers/_getDateObj.ts":
/*!********************************!*\
  !*** ./helpers/_getDateObj.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Возвращает объект даты, совместимый с Cades plugin'ом, зависящий от браузера.
 *
 * В IE необходимо использовать специфичный формат "VT_DATE"
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Microsoft_Extensions/Date.getVarDate
 */
exports._getDateObj = function (dateObj) { return (dateObj.getVarDate ? dateObj.getVarDate() : dateObj); };


/***/ }),

/***/ "./helpers/_isSupportedCSPVersion.ts":
/*!*******************************************!*\
  !*** ./helpers/_isSupportedCSPVersion.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var oldestSupportedCSPVersion = 4.0;
exports._isSupportedCSPVersion = function (version) {
    var _a;
    version = (_a = version.match(/\d+?\b(?:\.\d+)?/)) === null || _a === void 0 ? void 0 : _a[0];
    return Number(version) >= oldestSupportedCSPVersion;
};


/***/ }),

/***/ "./helpers/_isSupportedCadesVersion.ts":
/*!*********************************************!*\
  !*** ./helpers/_isSupportedCadesVersion.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports._isSupportedCadesVersion = function (version) {
    var match = version.match(/(\d+)\.(\d+)\.(\d+)/);
    if (!match) {
        return false;
    }
    var major = match[1], minor = match[2], patch = match[3];
    if (Number(major) < 2) {
        return false;
    }
    if (Number(major) === 2 && Number(patch) < 12438) {
        return false;
    }
    return true;
};


/***/ }),

/***/ "./helpers/_parseCertInfo.ts":
/*!***********************************!*\
  !*** ./helpers/_parseCertInfo.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
/**
 * Парсит информацию из строки с информацией о сертификате
 *
 * @param tagsTranslations - словарь с расшифровками тэгов
 * @param rawInfo - данные для парсинга
 * @returns расшифрованная информация по отдельным тэгам
 */
exports._parseCertInfo = function (tagsTranslations, rawInfo) {
    var extractedEntities = rawInfo.match(/([а-яА-Яa-zA-Z0-9\s.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);
    if (extractedEntities) {
        return extractedEntities.map(function (group) {
            var _a, _b, _c;
            var segmentsMatch = group.trim().match(/^([а-яА-Яa-zA-Z0-9\s.]+)=(.+?),?$/);
            var title = segmentsMatch === null || segmentsMatch === void 0 ? void 0 : segmentsMatch[1];
            // Вырезаем лишние кавычки
            var description = (_b = (_a = segmentsMatch === null || segmentsMatch === void 0 ? void 0 : segmentsMatch[2]) === null || _a === void 0 ? void 0 : _a.replace(/^"(.*)"/, '$1')) === null || _b === void 0 ? void 0 : _b.replace(/"{2}/g, '"');
            var oidIdentifierMatch = title === null || title === void 0 ? void 0 : title.match(/^OID\.(.*)/);
            var oidIdentifier = oidIdentifierMatch === null || oidIdentifierMatch === void 0 ? void 0 : oidIdentifierMatch[1];
            var isTranslated = false;
            // Если нашли в тайтле ОИД, пытаемся его расшифровать
            if (oidIdentifier) {
                var oidTranslation = constants_1.OIDS_DICTIONARY[oidIdentifier];
                if (oidTranslation) {
                    title = oidTranslation;
                    isTranslated = true;
                }
            }
            var tagTranslation = (_c = tagsTranslations.find(function (tag) { return tag.possibleNames.find(function (name) { return name === title; }); })) === null || _c === void 0 ? void 0 : _c.translation;
            if (tagTranslation) {
                title = tagTranslation;
                isTranslated = true;
            }
            return { description: description, title: title, isTranslated: isTranslated };
        });
    }
};


/***/ }),

/***/ "./vendor/cadesplugin_api.js":
/*!***********************************!*\
  !*** ./vendor/cadesplugin_api.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

;(function () {
    //already loaded
    if(window.cadesplugin)
        return;

    var pluginObject;
    var plugin_resolved = 0;
    var plugin_reject;
    var plugin_resolve;
    var isOpera = 0;
    var isFireFox = 0;
    var isEdge = 0;
    var isSafari = 0;
    var failed_extensions = 0;

    var canPromise = !!window.Promise;
    var cadesplugin;

    if(canPromise)
    {
        cadesplugin = new Promise(function(resolve, reject)
        {
            plugin_resolve = resolve;
            plugin_reject = reject;
        });
    } else
    {
        cadesplugin = {};
    }

    function check_browser() {
        var ua= navigator.userAgent, tem, M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name:'IE',version:(tem[1] || '')};
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return {name:M[0],version:M[1]};
    }
    var browserSpecs = check_browser();

    function cpcsp_console_log(level, msg){
        //IE9 не может писать в консоль если не открыта вкладка developer tools
        if(typeof(console) === 'undefined')
            return;
        if (level <= cadesplugin.current_log_level ){
            if (level === cadesplugin.LOG_LEVEL_DEBUG)
                console.log("DEBUG: %s", msg);
            if (level === cadesplugin.LOG_LEVEL_INFO)
                console.info("INFO: %s", msg);
            if (level === cadesplugin.LOG_LEVEL_ERROR)
                console.error("ERROR: %s", msg);
            return;
        }
    }

    function set_log_level(level){
        if (!((level === cadesplugin.LOG_LEVEL_DEBUG) ||
            (level === cadesplugin.LOG_LEVEL_INFO) ||
            (level === cadesplugin.LOG_LEVEL_ERROR))){
            cpcsp_console_log(cadesplugin.LOG_LEVEL_ERROR, "cadesplugin_api.js: Incorrect log_level: " + level);
            return;
        }
        cadesplugin.current_log_level = level;
        if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_DEBUG)
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = DEBUG");
        if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_INFO)
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = INFO");
        if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_ERROR)
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = ERROR");
        if(isNativeMessageSupported())
        {
            if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_DEBUG)
                window.postMessage("set_log_level=debug", "*");
            if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_INFO)
                window.postMessage("set_log_level=info", "*");
            if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_ERROR)
                window.postMessage("set_log_level=error", "*");
        }
    }

    function set_constantValues()
    {
        cadesplugin.CAPICOM_LOCAL_MACHINE_STORE = 1;
        cadesplugin.CAPICOM_CURRENT_USER_STORE = 2;
        cadesplugin.CADESCOM_LOCAL_MACHINE_STORE = 1;
        cadesplugin.CADESCOM_CURRENT_USER_STORE = 2;
        cadesplugin.CADESCOM_CONTAINER_STORE = 100;

        cadesplugin.CAPICOM_MY_STORE = "My";

        cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;

        cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;
        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;
        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;

        cadesplugin.XmlDsigGost3410UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411";
        cadesplugin.XmlDsigGost3411UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr3411";
        cadesplugin.XmlDsigGost3410Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411";
        cadesplugin.XmlDsigGost3411Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411";

        cadesplugin.CADESCOM_CADES_DEFAULT = 0;
        cadesplugin.CADESCOM_CADES_BES = 1;
        cadesplugin.CADESCOM_CADES_T = 0x5;
        cadesplugin.CADESCOM_CADES_X_LONG_TYPE_1 = 0x5d;
        cadesplugin.CADESCOM_PKCS7_TYPE = 0xffff;

        cadesplugin.CADESCOM_ENCODE_BASE64 = 0;
        cadesplugin.CADESCOM_ENCODE_BINARY = 1;
        cadesplugin.CADESCOM_ENCODE_ANY = -1;

        cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT = 0;
        cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
        cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY = 2;

        cadesplugin.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0;
        cadesplugin.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME = 1;

        cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_ROOT_NAME = 3;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME = 4;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENSION = 5;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED = 11;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;

        cadesplugin.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128;

        cadesplugin.CAPICOM_PROPID_ENHKEY_USAGE = 9;

        cadesplugin.CAPICOM_OID_OTHER = 0;
        cadesplugin.CAPICOM_OID_KEY_USAGE_EXTENSION = 10;

        cadesplugin.CAPICOM_EKU_CLIENT_AUTH = 2;
        cadesplugin.CAPICOM_EKU_SMARTCARD_LOGON = 5;
        cadesplugin.CAPICOM_EKU_OTHER = 0;

        cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
        cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
        cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
        cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
        cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
        cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
        cadesplugin.CADESCOM_ATTRIBUTE_OTHER = -1;

        cadesplugin.CADESCOM_STRING_TO_UCS2LE = 0;
        cadesplugin.CADESCOM_BASE64_TO_BINARY = 1;

        cadesplugin.CADESCOM_DISPLAY_DATA_NONE = 0;
        cadesplugin.CADESCOM_DISPLAY_DATA_CONTENT = 1;
        cadesplugin.CADESCOM_DISPLAY_DATA_ATTRIBUTE = 2;

        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_RC2 = 0;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_RC4 = 1;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_DES = 2;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_3DES = 3;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_AES = 4;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 = 25;

        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1 = 0;
        cadesplugin.CADESCOM_HASH_ALGORITHM_MD2 = 1;
        cadesplugin.CADESCOM_HASH_ALGORITHM_MD4 = 2;
        cadesplugin.CADESCOM_HASH_ALGORITHM_MD5 = 3;
        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256 = 4;
        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384 = 5;
        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512 = 6;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 = 101;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 = 102;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_HMAC = 110;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256_HMAC = 111;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512_HMAC = 112;

        cadesplugin.LOG_LEVEL_DEBUG = 4;
        cadesplugin.LOG_LEVEL_INFO = 2;
        cadesplugin.LOG_LEVEL_ERROR = 1;

        cadesplugin.CADESCOM_AllowNone = 0;
        cadesplugin.CADESCOM_AllowNoOutstandingRequest = 0x1;
        cadesplugin.CADESCOM_AllowUntrustedCertificate = 0x2;
        cadesplugin.CADESCOM_AllowUntrustedRoot = 0x4;
        cadesplugin.CADESCOM_SkipInstallToStore = 0x10000000;
    }

    function async_spawn(generatorFunc) {
        function continuer(verb, arg) {
            var result;
            try {
                result = generator[verb](arg);
            } catch (err) {
                return Promise.reject(err);
            }
            if (result.done) {
                return result.value;
            } else {
                return Promise.resolve(result.value).then(onFulfilled, onRejected);
            }
        }
        var generator = generatorFunc(Array.prototype.slice.call(arguments, 1));
        var onFulfilled = continuer.bind(continuer, "next");
        var onRejected = continuer.bind(continuer, "throw");
        return onFulfilled();
    }

    function isIE() {
        // var retVal = (("Microsoft Internet Explorer" == navigator.appName) || // IE < 11
        //     navigator.userAgent.match(/Trident\/./i)); // IE 11
        return (browserSpecs.name === 'IE' || browserSpecs.name === 'MSIE');
    }

    function isIOS() {
        return (navigator.userAgent.match(/ipod/i) ||
            navigator.userAgent.match(/ipad/i) ||
            navigator.userAgent.match(/iphone/i));
    }

    function isNativeMessageSupported()
    {
        // В IE работаем через NPAPI
        if(isIE())
            return false;
        // В Edge работаем через NativeMessage
        if(browserSpecs.name === 'Edge') {
            isEdge = true;
            return true;
        }
        // В Chrome, Firefox, Safari и Opera работаем через асинхронную версию в зависимости от версии
        if(browserSpecs.name === 'Opera') {
            isOpera = true;
            if(browserSpecs.version >= 33){
                return true;
            }
            else{
                return false;
            }
        }
        if(browserSpecs.name === 'Firefox') {
            isFireFox = true;
            if(browserSpecs.version >= 52){
                return true;
            }
            else{
                return false;
            }
        }
        if(browserSpecs.name === 'Chrome') {
            if(browserSpecs.version >= 42){
                return true;
            }
            else{
                return false;
            }
        }
        //В Сафари начиная с 12 версии нет NPAPI
        if(browserSpecs.name === 'Safari') {
            isSafari = true;
            if(browserSpecs.version >= 12) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Функция активации объектов КриптоПро ЭЦП Browser plug-in
    function CreateObject(name) {
        if (isIOS()) {
            // На iOS для создания объектов используется функция
            // call_ru_cryptopro_npcades_10_native_bridge, определенная в IOS_npcades_supp.js
            return call_ru_cryptopro_npcades_10_native_bridge("CreateObject", [name]);
        }
        if (isIE()) {
            // В Internet Explorer создаются COM-объекты
            if (name.match(/X509Enrollment/i)) {
                try {
                    // Объекты CertEnroll пробуем создавать через нашу фабрику,
                    // если не получилось то через CX509EnrollmentWebClassFactory
                    var objCertEnrollClassFactory = document.getElementById("webClassFactory");
                    return objCertEnrollClassFactory.CreateObject(name);
                }
                catch (e) {
                    try {
                        var objWebClassFactory = document.getElementById("certEnrollClassFactory");
                        return objWebClassFactory.CreateObject(name);
                    }
                    catch (err) {
                        throw ("Для создания обьектов X509Enrollment следует настроить веб-узел на использование проверки подлинности по протоколу HTTPS");
                    }
                }
            }
            // Объекты CAPICOM и CAdESCOM создаются через CAdESCOM.WebClassFactory
            try {
                var objWebClassFactory = document.getElementById("webClassFactory");
                return objWebClassFactory.CreateObject(name);
            }
            catch (e) {
                // Для версий плагина ниже 2.0.12538
                return new ActiveXObject(name);
            }
        }
        // создаются объекты NPAPI
        return pluginObject.CreateObject(name);
    }

    function decimalToHexString(number) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }

        return number.toString(16).toUpperCase();
    }

    function GetMessageFromException(e) {
        var err = e.message;
        if (!err) {
            err = e;
        } else if (e.number) {
            err += " (0x" + decimalToHexString(e.number) + ")";
        }
        return err;
    }

    function getLastError(exception) {
        if(isNativeMessageSupported() || isIE() || isIOS() ) {
            return GetMessageFromException(exception);
        }

        try {
            return pluginObject.getLastError();
        } catch(e) {
            return GetMessageFromException(exception);
        }
    }

    // Функция для удаления созданных объектов
    function ReleasePluginObjects() {
        return cpcsp_chrome_nmcades.ReleasePluginObjects();
    }

    // Функция активации асинхронных объектов КриптоПро ЭЦП Browser plug-in
    function CreateObjectAsync(name) {
        return pluginObject.CreateObjectAsync(name);
    }

    //Функции для IOS
    var ru_cryptopro_npcades_10_native_bridge = {
        callbacksCount : 1,
        callbacks : {},

        // Automatically called by native layer when a result is available
        resultForCallback : function resultForCallback(callbackId, resultArray) {
            var callback = ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId];
            if (!callback) return;
            callback.apply(null,resultArray);
        },

        // Use this in javascript to request native objective-c code
        // functionName : string (I think the name is explicit :p)
        // args : array of arguments
        // callback : function with n-arguments that is going to be called when the native code returned
        call : function call(functionName, args, callback) {
            var hasCallback = callback && typeof callback === "function";
            var callbackId = hasCallback ? ru_cryptopro_npcades_10_native_bridge.callbacksCount++ : 0;

            if (hasCallback)
                ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId] = callback;

            var iframe = document.createElement("IFRAME");
            var arrObjs = new Array("_CPNP_handle");
            try{
                iframe.setAttribute("src", "cpnp-js-call:" + functionName + ":" + callbackId+ ":" + encodeURIComponent(JSON.stringify(args, arrObjs)));
            } catch(e){
                alert(e);
            }
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
    };

    function call_ru_cryptopro_npcades_10_native_bridge(functionName, array){
        var tmpobj;
        var ex;
        ru_cryptopro_npcades_10_native_bridge.call(functionName, array, function(e, response){
            ex = e;
            var str='tmpobj='+response;
            eval(str);
            if (typeof (tmpobj) === "string"){
                tmpobj = tmpobj.replace(/\\\n/gm, "\n");
                tmpobj = tmpobj.replace(/\\\r/gm, "\r");
            }
        });
        if(ex)
            throw ex;
        return tmpobj;
    }

    function show_firefox_missing_extension_dialog()
    {
        if (!window.cadesplugin_skip_extension_install)
        {
            var ovr = document.createElement('div');
            ovr.id = "cadesplugin_ovr";
            ovr.style = "visibility: hidden; position: fixed; left: 0px; top: 0px; width:100%; height:100%; background-color: rgba(0,0,0,0.7)";
            ovr.innerHTML = "<div id='cadesplugin_ovr_item' style='position:relative; width:400px; margin:100px auto; background-color:#fff; border:2px solid #000; padding:10px; text-align:center; opacity: 1; z-index: 1500'>" +
                "<button id='cadesplugin_close_install' style='float: right; font-size: 10px; background: transparent; border: 1; margin: -5px'>X</button>" +
                "<p>Для работы КриптоПро ЭЦП Browser plugin на данном сайте необходимо расширение для браузера. Убедитесь, что оно у Вас включено или установите его." +
                "<p><a href='https://www.cryptopro.ru/sites/default/files/products/cades/extensions/firefox_cryptopro_extension_latest.xpi'>Скачать расширение</a></p>" +
                "</div>";
            document.getElementsByTagName("Body")[0].appendChild(ovr);
            document.getElementById("cadesplugin_close_install").addEventListener('click',function()
            {
                plugin_loaded_error("Плагин недоступен");
                document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
            });

            ovr.addEventListener('click',function()
            {
                plugin_loaded_error("Плагин недоступен");
                document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
            });
            ovr.style.visibility="visible";
        }
    }


    //Выводим окно поверх других с предложением установить расширение для Opera.
    //Если установленна переменная cadesplugin_skip_extension_install - не предлагаем установить расширение
    function install_opera_extension()
    {
        if (!window.cadesplugin_skip_extension_install)
        {
            document.addEventListener('DOMContentLoaded', function() {
                var ovr = document.createElement('div');
                ovr.id = "cadesplugin_ovr";
                ovr.style = "visibility: hidden; position: fixed; left: 0px; top: 0px; width:100%; height:100%; background-color: rgba(0,0,0,0.7)";
                ovr.innerHTML = "<div id='cadesplugin_ovr_item' style='position:relative; width:400px; margin:100px auto; background-color:#fff; border:2px solid #000; padding:10px; text-align:center; opacity: 1; z-index: 1500'>" +
                    "<button id='cadesplugin_close_install' style='float: right; font-size: 10px; background: transparent; border: 1; margin: -5px'>X</button>" +
                    "<p>Для работы КриптоПро ЭЦП Browser plugin на данном сайте необходимо установить расширение из каталога дополнений Opera." +
                    "<p><button id='cadesplugin_install' style='font:12px Arial'>Установить расширение</button></p>" +
                    "</div>";
                document.getElementsByTagName("Body")[0].appendChild(ovr);
                var btn_install = document.getElementById("cadesplugin_install");
                btn_install.addEventListener('click', function(event) {
                    opr.addons.installExtension("epebfcehmdedogndhlcacafjaacknbcm",
                        function()
                        {
                            document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
                            location.reload();
                        },
                        function(){})
                });
                document.getElementById("cadesplugin_close_install").addEventListener('click',function()
                {
                    plugin_loaded_error("Плагин недоступен");
                    document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
                });

                ovr.addEventListener('click',function()
                {
                    plugin_loaded_error("Плагин недоступен");
                    document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
                });
                ovr.style.visibility="visible";
                document.getElementById("cadesplugin_ovr_item").addEventListener('click',function(e){
                    e.stopPropagation();
                });
            });
        }else
        {
            plugin_loaded_error("Плагин недоступен");
        }
    }

    function firefox_or_edge_nmcades_onload() {
        cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
    }

    function nmcades_api_onload () {
        window.postMessage("cadesplugin_echo_request", "*");
        window.addEventListener("message", function (event){
            if (typeof(event.data) !== "string" || !event.data.match("cadesplugin_loaded"))
                return;
            if(isFireFox || isEdge || isSafari)
            {
                // Для Firefox, Сафари, Edge вместе с сообщением cadesplugin_loaded прилетает url для загрузки nmcades_plugin_api.js
                var url = event.data.substring(event.data.indexOf("url:") + 4);
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", url);
                fileref.onerror = plugin_loaded_error;
                fileref.onload = firefox_or_edge_nmcades_onload;
                document.getElementsByTagName("head")[0].appendChild(fileref);
                // Для Firefox, Safari и Edge у нас только по одному расширению.
                failed_extensions++;
            }else {
                cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
            }
        }, false);
    }

    //Загружаем расширения для Chrome, Opera, YaBrowser, FireFox, Edge, Safari
    function load_extension()
    {

        if(isFireFox || isEdge || isSafari){
            // вызываем callback руками т.к. нам нужно узнать ID расширения. Он уникальный для браузера.
            nmcades_api_onload();
        } else {
            // в асинхронном варианте для chrome и opera подключаем оба расширения
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", "chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js");
            fileref.onerror = plugin_loaded_error;
            fileref.onload = nmcades_api_onload;
            document.getElementsByTagName("head")[0].appendChild(fileref);
            fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", "chrome-extension://epebfcehmdedogndhlcacafjaacknbcm/nmcades_plugin_api.js");
            fileref.onerror = plugin_loaded_error;
            fileref.onload = nmcades_api_onload;
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }

    //Загружаем плагин для NPAPI
    function load_npapi_plugin()
    {
        var elem = document.createElement('object');
        elem.setAttribute("id", "cadesplugin_object");
        elem.setAttribute("type", "application/x-cades");
        elem.setAttribute("style", "visibility: hidden");
        document.getElementsByTagName("body")[0].appendChild(elem);
        pluginObject = document.getElementById("cadesplugin_object");
        if(isIE())
        {
            var elem1 = document.createElement('object');
            elem1.setAttribute("id", "certEnrollClassFactory");
            elem1.setAttribute("classid", "clsid:884e2049-217d-11da-b2a4-000e7bbb2b09");
            elem1.setAttribute("style", "visibility: hidden");
            document.getElementsByTagName("body")[0].appendChild(elem1);
            var elem2 = document.createElement('object');
            elem2.setAttribute("id", "webClassFactory");
            elem2.setAttribute("classid", "clsid:B04C8637-10BD-484E-B0DA-B8A039F60024");
            elem2.setAttribute("style", "visibility: hidden");
            document.getElementsByTagName("body")[0].appendChild(elem2);
        }
    }

    //Отправляем событие что все ок.
    function plugin_loaded()
    {
        plugin_resolved = 1;
        if(canPromise)
        {
            plugin_resolve();
        }else {
            window.postMessage("cadesplugin_loaded", "*");
        }
    }

    //Отправляем событие что сломались.
    function plugin_loaded_error(msg)
    {
        if(isNativeMessageSupported())
        {
            //в асинхронном варианте подключаем оба расширения, если сломались оба пробуем установить для Opera
            failed_extensions++;
            if(failed_extensions<2)
                return;
            if(isOpera && (typeof(msg) === 'undefined'|| typeof(msg) === 'object'))
            {
                install_opera_extension();
                return;
            }
        }
        if(typeof(msg) === 'undefined' || typeof(msg) === 'object')
            msg = "Плагин недоступен";
        plugin_resolved = 1;
        if(canPromise)
        {
            plugin_reject(msg);
        } else {
            window.postMessage("cadesplugin_load_error", "*");
        }
    }

    //проверяем что у нас хоть какое то событие ушло, и если не уходило кидаем еще раз ошибку
    function check_load_timeout()
    {
        if(plugin_resolved === 1)
            return;
        if(isFireFox)
        {
            show_firefox_missing_extension_dialog();
        }
        plugin_resolved = 1;
        if(canPromise)
        {
            plugin_reject("Истекло время ожидания загрузки плагина");
        } else {
            window.postMessage("cadesplugin_load_error", "*");
        }

    }

    //Вспомогательная функция для NPAPI
    function createPromise(arg)
    {
        return new Promise(arg);
    }

    function check_npapi_plugin (){
        try {
            var oAbout = CreateObject("CAdESCOM.About");
            plugin_loaded();
        }
        catch (err) {
            document.getElementById("cadesplugin_object").style.display = 'none';
            // Объект создать не удалось, проверим, установлен ли
            // вообще плагин. Такая возможность есть не во всех браузерах
            var mimetype = navigator.mimeTypes["application/x-cades"];
            if (mimetype) {
                var plugin = mimetype.enabledPlugin;
                if (plugin) {
                    plugin_loaded_error("Плагин загружен, но не создаются обьекты");
                }else
                {
                    plugin_loaded_error("Ошибка при загрузке плагина");
                }
            }else
            {
                plugin_loaded_error("Плагин недоступен");
            }
        }
    }

    //Проверяем работает ли плагин
    function check_plugin_working()
    {
        var div = document.createElement("div");
        div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
        var isIeLessThan9 = (div.getElementsByTagName("i").length === 1);
        if (isIeLessThan9) {
            plugin_loaded_error("Internet Explorer версии 8 и ниже не поддерживается");
            return;
        }

        if(isNativeMessageSupported())
        {
            load_extension();
        }else if(!canPromise) {
            window.addEventListener("message", function (event){
                    if (event.data !== "cadesplugin_echo_request")
                        return;
                    load_npapi_plugin();
                    check_npapi_plugin();
                },
                false);
        }else
        {
            if(document.readyState === "complete"){
                load_npapi_plugin();
                check_npapi_plugin();
            } else {
                window.addEventListener("load", function (event) {
                    load_npapi_plugin();
                    check_npapi_plugin();
                }, false);
            }
        }
    }

    function set_pluginObject(obj)
    {
        pluginObject = obj;
    }

    function is_capilite_enabled()
    {
        if ((typeof (cadesplugin.EnableInternalCSP) !== 'undefined') && cadesplugin.EnableInternalCSP)
            return true;
        return false;
    };

    //Export
    cadesplugin.JSModuleVersion = "2.1.2";
    cadesplugin.async_spawn = async_spawn;
    cadesplugin.set = set_pluginObject;
    cadesplugin.set_log_level = set_log_level;
    cadesplugin.getLastError = getLastError;
    cadesplugin.is_capilite_enabled = is_capilite_enabled;

    if(isNativeMessageSupported())
    {
        cadesplugin.CreateObjectAsync = CreateObjectAsync;
        cadesplugin.ReleasePluginObjects = ReleasePluginObjects;
    }

    if(!isNativeMessageSupported())
    {
        cadesplugin.CreateObject = CreateObject;
    }

    if(window.cadesplugin_load_timeout)
    {
        setTimeout(check_load_timeout, window.cadesplugin_load_timeout);
    }
    else
    {
        setTimeout(check_load_timeout, 20000);
    }

    set_constantValues();

    cadesplugin.current_log_level = cadesplugin.LOG_LEVEL_ERROR;
    window.cadesplugin = cadesplugin;
    check_plugin_working();
}());


/***/ })

/******/ });
});
//# sourceMappingURL=crypto-pro.js.map