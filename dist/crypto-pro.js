var CryptoPro =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var bowser = __webpack_require__(1),
	    browserInfo = bowser._detect(navigator.userAgent),
	    global = Function('return this')(),
	    canPromise = Boolean(global.Promise),
	    CryptoProConfig = global.CryptoProConfig,
	    canAsync,
	    cadesplugin,
	    cryptoService,
	    _errorMsg = '',
	    _isLoaded = false,
	    _onLoadCbQueue = [];
	
	global.allow_firefox_cadesplugin_async = browserInfo.firefox && browserInfo.version >= 52;
	
	__webpack_require__(3);
	
	cadesplugin = global.cadesplugin;
	
	canAsync = Boolean(cadesplugin.CreateObjectAsync);
	
	cryptoService = __webpack_require__(9);
	
	function execOnloadQueue() {
	    _onLoadCbQueue.forEach(function (callback) {
	        callback();
	    });
	}
	
	function passToWaitOnLoad(callback) {
	    if (Object.prototype.toString.call(callback) === '[object Function]') {
	        _onLoadCbQueue.push(callback);
	    }
	}
	
	function callOnLoad(method) {
	    _isLoaded ? method() : passToWaitOnLoad(method);
	}
	
	function finishLoading() {
	    _isLoaded = true;
	
	    execOnloadQueue();
	}
	
	function call() {
	    var args = Array.prototype.slice.call(arguments),
	        methodName = args.shift();
	
	    return new Promise(function (resolve, reject) {
	        callOnLoad(function () {
	            var method;
	
	            if (_errorMsg) {
	                reject(_errorMsg);
	                return;
	            }
	
	            method = cryptoService[methodName];
	
	            if (!method) {
	                reject('Метод "' + methodName + '" не доступен');
	                return;
	            }
	
	            method.apply(null, args).then(resolve, reject);
	        });
	    });
	}
	
	if (cadesplugin) {
	    // Уровень отладки (LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, LOG_LEVEL_ERROR)
	    cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);
	
	    if (canPromise) {
	        cadesplugin.then(finishLoading, function () {
	            _errorMsg = 'КриптоПРО ЭЦП Browser Plug-In не доступен';
	            finishLoading();
	        });
	    } else {
	        throw new Error('Не поддерживаются промисы. Необходим полифилл.');
	    }
	} else {
	    throw new Error('Не подключен модуль для работы с cades plugin');
	}
	
	module.exports = {
	    call: call
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Bowser - a browser detector
	 * https://github.com/ded/bowser
	 * MIT License | (c) Dustin Diaz 2015
	 */
	
	!function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) __webpack_require__(2)(name, definition)
	  else this[name] = definition()
	}('bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */
	
	  var t = true
	
	  function detect(ua) {
	
	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[1]) || '';
	    }
	
	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[2]) || '';
	    }
	
	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
	      , likeAndroid = /like android/i.test(ua)
	      , android = !likeAndroid && /android/i.test(ua)
	      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
	      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
	      , chromeos = /CrOS/.test(ua)
	      , silk = /silk/i.test(ua)
	      , sailfish = /sailfish/i.test(ua)
	      , tizen = /tizen/i.test(ua)
	      , webos = /(web|hpw)os/i.test(ua)
	      , windowsphone = /windows phone/i.test(ua)
	      , samsungBrowser = /SamsungBrowser/i.test(ua)
	      , windows = !windowsphone && /windows/i.test(ua)
	      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
	      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
	      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
	      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
	      , tablet = /tablet/i.test(ua)
	      , mobile = !tablet && /[^-]mobi/i.test(ua)
	      , xbox = /xbox/i.test(ua)
	      , result
	
	    if (/opera/i.test(ua)) {
	      //  an old Opera
	      result = {
	        name: 'Opera'
	      , opera: t
	      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
	      }
	    } else if (/opr|opios/i.test(ua)) {
	      // a new Opera
	      result = {
	        name: 'Opera'
	        , opera: t
	        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
	      }
	    }
	    else if (/SamsungBrowser/i.test(ua)) {
	      result = {
	        name: 'Samsung Internet for Android'
	        , samsungBrowser: t
	        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/coast/i.test(ua)) {
	      result = {
	        name: 'Opera Coast'
	        , coast: t
	        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/yabrowser/i.test(ua)) {
	      result = {
	        name: 'Yandex Browser'
	      , yandexbrowser: t
	      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/ucbrowser/i.test(ua)) {
	      result = {
	          name: 'UC Browser'
	        , ucbrowser: t
	        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/mxios/i.test(ua)) {
	      result = {
	        name: 'Maxthon'
	        , maxthon: t
	        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/epiphany/i.test(ua)) {
	      result = {
	        name: 'Epiphany'
	        , epiphany: t
	        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/puffin/i.test(ua)) {
	      result = {
	        name: 'Puffin'
	        , puffin: t
	        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
	      }
	    }
	    else if (/sleipnir/i.test(ua)) {
	      result = {
	        name: 'Sleipnir'
	        , sleipnir: t
	        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/k-meleon/i.test(ua)) {
	      result = {
	        name: 'K-Meleon'
	        , kMeleon: t
	        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (windowsphone) {
	      result = {
	        name: 'Windows Phone'
	      , windowsphone: t
	      }
	      if (edgeVersion) {
	        result.msedge = t
	        result.version = edgeVersion
	      }
	      else {
	        result.msie = t
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer'
	      , msie: t
	      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      }
	    } else if (chromeos) {
	      result = {
	        name: 'Chrome'
	      , chromeos: t
	      , chromeBook: t
	      , chrome: t
	      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      }
	    } else if (/chrome.+? edge/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge'
	      , msedge: t
	      , version: edgeVersion
	      }
	    }
	    else if (/vivaldi/i.test(ua)) {
	      result = {
	        name: 'Vivaldi'
	        , vivaldi: t
	        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
	      }
	    }
	    else if (sailfish) {
	      result = {
	        name: 'Sailfish'
	      , sailfish: t
	      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey'
	      , seamonkey: t
	      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/firefox|iceweasel|fxios/i.test(ua)) {
	      result = {
	        name: 'Firefox'
	      , firefox: t
	      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
	      }
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t
	      }
	    }
	    else if (silk) {
	      result =  {
	        name: 'Amazon Silk'
	      , silk: t
	      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS'
	      , phantom: t
	      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/slimerjs/i.test(ua)) {
	      result = {
	        name: 'SlimerJS'
	        , slimer: t
	        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry'
	      , blackberry: t
	      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (webos) {
	      result = {
	        name: 'WebOS'
	      , webos: t
	      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t)
	    }
	    else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada'
	      , bada: t
	      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (tizen) {
	      result = {
	        name: 'Tizen'
	      , tizen: t
	      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/qupzilla/i.test(ua)) {
	      result = {
	        name: 'QupZilla'
	        , qupzilla: t
	        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
	      }
	    }
	    else if (/chromium/i.test(ua)) {
	      result = {
	        name: 'Chromium'
	        , chromium: t
	        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
	      }
	    }
	    else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome'
	        , chrome: t
	        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (android) {
	      result = {
	        name: 'Android'
	        , version: versionIdentifier
	      }
	    }
	    else if (/safari|applewebkit/i.test(ua)) {
	      result = {
	        name: 'Safari'
	      , safari: t
	      }
	      if (versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    }
	    else if (iosdevice) {
	      result = {
	        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      }
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    }
	    else if(/googlebot/i.test(ua)) {
	      result = {
	        name: 'Googlebot'
	      , googlebot: t
	      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
	      }
	    }
	    else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	     };
	   }
	
	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      if (/(apple)?webkit\/537\.36/i.test(ua)) {
	        result.name = result.name || "Blink"
	        result.blink = t
	      } else {
	        result.name = result.name || "Webkit"
	        result.webkit = t
	      }
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko"
	      result.gecko = t
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
	    }
	
	    // set OS flags for platforms that have multiple browsers
	    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
	      result.android = t
	    } else if (!result.windowsphone && !result.msedge && iosdevice) {
	      result[iosdevice] = t
	      result.ios = t
	    } else if (mac) {
	      result.mac = t
	    } else if (xbox) {
	      result.xbox = t
	    } else if (windows) {
	      result.windows = t
	    } else if (linux) {
	      result.linux = t
	    }
	
	    // OS version extraction
	    var osVersion = '';
	    if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }
	
	    // device type extraction
	    var osMajorVersion = osVersion.split('.')[0];
	    if (
	         tablet
	      || nexusTablet
	      || iosdevice == 'ipad'
	      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
	      || result.silk
	    ) {
	      result.tablet = t
	    } else if (
	         mobile
	      || iosdevice == 'iphone'
	      || iosdevice == 'ipod'
	      || android
	      || nexusMobile
	      || result.blackberry
	      || result.webos
	      || result.bada
	    ) {
	      result.mobile = t
	    }
	
	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge ||
	        (result.msie && result.version >= 10) ||
	        (result.yandexbrowser && result.version >= 15) ||
			    (result.vivaldi && result.version >= 1.0) ||
	        (result.chrome && result.version >= 20) ||
	        (result.samsungBrowser && result.version >= 4) ||
	        (result.firefox && result.version >= 20.0) ||
	        (result.safari && result.version >= 6) ||
	        (result.opera && result.version >= 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
	        (result.blackberry && result.version >= 10.1)
	        || (result.chromium && result.version >= 20)
	        ) {
	      result.a = t;
	    }
	    else if ((result.msie && result.version < 10) ||
	        (result.chrome && result.version < 20) ||
	        (result.firefox && result.version < 20.0) ||
	        (result.safari && result.version < 6) ||
	        (result.opera && result.version < 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
	        || (result.chromium && result.version < 20)
	        ) {
	      result.c = t
	    } else result.x = t
	
	    return result
	  }
	
	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
	
	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem=== 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  }
	
	  /**
	   * Get version precisions count
	   *
	   * @example
	   *   getVersionPrecision("1.10.3") // 3
	   *
	   * @param  {string} version
	   * @return {number}
	   */
	  function getVersionPrecision(version) {
	    return version.split(".").length;
	  }
	
	  /**
	   * Array::map polyfill
	   *
	   * @param  {Array} arr
	   * @param  {Function} iterator
	   * @return {Array}
	   */
	  function map(arr, iterator) {
	    var result = [], i;
	    if (Array.prototype.map) {
	      return Array.prototype.map.call(arr, iterator);
	    }
	    for (i = 0; i < arr.length; i++) {
	      result.push(iterator(arr[i]));
	    }
	    return result;
	  }
	
	  /**
	   * Calculate browser version weight
	   *
	   * @example
	   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
	   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
	   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
	   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
	   *
	   * @param  {Array<String>} versions versions to compare
	   * @return {Number} comparison result
	   */
	  function compareVersions(versions) {
	    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
	    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
	    var chunks = map(versions, function (version) {
	      var delta = precision - getVersionPrecision(version);
	
	      // 2) "9" -> "9.0" (for precision = 2)
	      version = version + new Array(delta + 1).join(".0");
	
	      // 3) "9.0" -> ["000000000"", "000000009"]
	      return map(version.split("."), function (chunk) {
	        return new Array(20 - chunk.length).join("0") + chunk;
	      }).reverse();
	    });
	
	    // iterate in reverse order by reversed chunks array
	    while (--precision >= 0) {
	      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
	      if (chunks[0][precision] > chunks[1][precision]) {
	        return 1;
	      }
	      else if (chunks[0][precision] === chunks[1][precision]) {
	        if (precision === 0) {
	          // all version chunks are same
	          return 0;
	        }
	      }
	      else {
	        return -1;
	      }
	    }
	  }
	
	  /**
	   * Check if browser is unsupported
	   *
	   * @example
	   *   bowser.isUnsupportedBrowser({
	   *     msie: "10",
	   *     firefox: "23",
	   *     chrome: "29",
	   *     safari: "5.1",
	   *     opera: "16",
	   *     phantom: "534"
	   *   });
	   *
	   * @param  {Object}  minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function isUnsupportedBrowser(minVersions, strictMode, ua) {
	    var _bowser = bowser;
	
	    // make strictMode param optional with ua param usage
	    if (typeof strictMode === 'string') {
	      ua = strictMode;
	      strictMode = void(0);
	    }
	
	    if (strictMode === void(0)) {
	      strictMode = false;
	    }
	    if (ua) {
	      _bowser = detect(ua);
	    }
	
	    var version = "" + _bowser.version;
	    for (var browser in minVersions) {
	      if (minVersions.hasOwnProperty(browser)) {
	        if (_bowser[browser]) {
	          if (typeof minVersions[browser] !== 'string') {
	            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
	          }
	
	          // browser version and min supported version.
	          return compareVersions([version, minVersions[browser]]) < 0;
	        }
	      }
	    }
	
	    return strictMode; // not found
	  }
	
	  /**
	   * Check if browser is supported
	   *
	   * @param  {Object} minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function check(minVersions, strictMode, ua) {
	    return !isUnsupportedBrowser(minVersions, strictMode, ua);
	  }
	
	  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
	  bowser.compareVersions = compareVersions;
	  bowser.check = check;
	
	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;
	
	  return bowser
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 3 */
/***/ function(module, exports) {

	;(function () {
	    //already loaded
	    if(window.cadesplugin)
	        return;
	
	    var pluginObject;
	    var plugin_resolved = 0;
	    var plugin_reject;
	    var plugin_resolve;
	    var isOpera = 0;
	    var isYaBrowser = 0;
	    var isFireFox = 0;
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
	
	    function cpcsp_console_log(level, msg){
	        //IE9 не может писать в консоль если не открыта вкладка developer tools
	        if(typeof(console) == 'undefined')
	            return;
	        if (level <= cadesplugin.current_log_level ){
	            if (level == cadesplugin.LOG_LEVEL_DEBUG)
	                console.log("DEBUG: %s", msg);
	            if (level == cadesplugin.LOG_LEVEL_INFO)
	                console.info("INFO: %s", msg);
	            if (level == cadesplugin.LOG_LEVEL_ERROR)
	                console.error("ERROR: %s", msg);
	            return;
	        }
	    }
	
	    function set_log_level(level){
	        if (!((level == cadesplugin.LOG_LEVEL_DEBUG) ||
	              (level == cadesplugin.LOG_LEVEL_INFO) ||
	              (level == cadesplugin.LOG_LEVEL_ERROR))){
	            cpcsp_console_log(cadesplugin.LOG_LEVEL_ERROR, "cadesplugin_api.js: Incorrect log_level: " + level);
	            return;
	        }
	        cadesplugin.current_log_level = level;
	        if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_DEBUG)
	            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = DEBUG");
	        if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_INFO)
	            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = INFO");
	        if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_ERROR)
	            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = ERROR");
	        if(isNativeMessageSupported())
	        {
	            if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_DEBUG)
	                window.postMessage("set_log_level=debug", "*");
	            if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_INFO)
	                window.postMessage("set_log_level=info", "*");
	            if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_ERROR)
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
	
	        cadesplugin.LOG_LEVEL_DEBUG = 4;
	        cadesplugin.LOG_LEVEL_INFO = 2;
	        cadesplugin.LOG_LEVEL_ERROR = 1;
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
	        var retVal = (("Microsoft Internet Explorer" == navigator.appName) || // IE < 11
	            navigator.userAgent.match(/Trident\/./i)); // IE 11
	        return retVal;
	    }
	
	    function isIOS() {
	        var retVal = (navigator.userAgent.match(/ipod/i) ||
	          navigator.userAgent.match(/ipad/i) ||
	          navigator.userAgent.match(/iphone/i));
	        return retVal;
	    }
	
	    function isNativeMessageSupported()
	    {
	        var retVal_chrome = navigator.userAgent.match(/chrome/i);
	        isOpera = navigator.userAgent.match(/opr/i);
	        isYaBrowser = navigator.userAgent.match(/YaBrowser/i);
	        isFireFox = navigator.userAgent.match(/Firefox/i);
	
	        if(isFireFox && window.allow_firefox_cadesplugin_async)
	            return true;
	
	        if(retVal_chrome == null) // В IE работаем через NPAPI
	            return false;
	        else
	        {
	            // В Chrome и Opera работаем через асинхронную версию
	            if(retVal_chrome.length > 0 || isOpera != null )
	            {
	                return true;
	            }
	        }
	        return false;
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
	                    // Объекты CertEnroll создаются через CX509EnrollmentWebClassFactory
	                    var objCertEnrollClassFactory = document.getElementById("certEnrollClassFactory");
	                    return objCertEnrollClassFactory.CreateObject(name);
	                }
	                catch (e) {
	                    throw("Для создания обьектов X509Enrollment следует настроить веб-узел на использование проверки подлинности по протоколу HTTPS");
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
	        // В Firefox, Safari создаются объекты NPAPI
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
	        var hasCallback = callback && typeof callback == "function";
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
	                                          if (typeof (tmpobj) == "string"){
	                                                tmpobj = tmpobj.replace(/\\\n/gm, "\n");
	                                            tmpobj = tmpobj.replace(/\\\r/gm, "\r");
	                                          }
	                                          });
	        if(ex)
	            throw ex;
	        return tmpobj;
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
	
	    function firefox_nmcades_onload() {
	        cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
	    }
	
	    function nmcades_api_onload () {
	        window.postMessage("cadesplugin_echo_request", "*");
	        window.addEventListener("message", function (event){
	            if (typeof(event.data) != "string" || !event.data.match("cadesplugin_loaded"))
	               return;
	            if(isFireFox)
	            {
	                // Для Firefox вместе с сообщением cadesplugin_loaded прилетает url для загрузки nmcades_plugin_api.js
	                var url = event.data.substring(event.data.indexOf("url:") + 4);
	                var fileref = document.createElement('script');
	                fileref.setAttribute("type", "text/javascript");
	                fileref.setAttribute("src", url);
	                fileref.onerror = plugin_loaded_error;
	                fileref.onload = firefox_nmcades_onload;
	                document.getElementsByTagName("head")[0].appendChild(fileref);
	
	            }else {
	                cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
	            }
	        }, false);
	    }
	
	    //Загружаем расширения для Chrome, Opera, YaBrowser, FireFox, Edge
	    function load_extension()
	    {
	
	        if(isFireFox){
	            // вызываем callback руками т.к. нам нужно узнать ID расширения. Он уникальный для браузера.
	            nmcades_api_onload();
	            return;
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
	            if(isOpera && (typeof(msg) == 'undefined'|| typeof(msg) == 'object'))
	            {
	                install_opera_extension();
	                return;
	            }
	        }
	        if(typeof(msg) == 'undefined' || typeof(msg) == 'object')
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
	        if(plugin_resolved == 1)
	            return;
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
	        div.innerHTML = "<!--[if lt IE 9]><iecheck></iecheck><![endif]-->";
	        var isIeLessThan9 = (div.getElementsByTagName("iecheck").length == 1);
	        if (isIeLessThan9) {
	            plugin_loaded_error("Internet Explorer версии 8 и ниже не поддерживается");
	            return;
	        }
	
	        if(isNativeMessageSupported())
	        {
	            load_extension();
	        }else if(!canPromise) {
	                window.addEventListener("message", function (event){
	                    if (event.data != "cadesplugin_echo_request")
	                       return;
	                    load_npapi_plugin();
	                    check_npapi_plugin();
	                    },
	                false);
	        }else
	        {
	            window.addEventListener("load", function (event) {
	                load_npapi_plugin();
	                check_npapi_plugin();
	            }, false);
	        }
	    }
	
	    function set_pluginObject(obj)
	    {
	        pluginObject = obj;
	    }
	
	    //Export
	    cadesplugin.JSModuleVersion = "2.1.0";
	    cadesplugin.async_spawn = async_spawn;
	    cadesplugin.set = set_pluginObject;
	    cadesplugin.set_log_level = set_log_level;
	    cadesplugin.getLastError = getLastError;
	
	    if(isNativeMessageSupported())
	    {
	        cadesplugin.CreateObjectAsync = CreateObjectAsync;
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


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var bowser = __webpack_require__(1);
	var oids = __webpack_require__(6);
	
	var subjectNameTagsTranslations = [
	        {possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя'},
	        {possibleNames: ['CN'], translation: 'Владелец'},
	        {possibleNames: ['SN'], translation: 'Фамилия'},
	        {possibleNames: ['G'], translation: 'Имя Отчество'},
	        {possibleNames: ['C'], translation: 'Страна'},
	        {possibleNames: ['S'], translation: 'Регион'},
	        {possibleNames: ['STREET'], translation: 'Адрес'},
	        {possibleNames: ['O'], translation: 'Компания'},
	        {possibleNames: ['OU'], translation: 'Отдел/подразделение'},
	        {possibleNames: ['T'], translation: 'Должность'},
	        {possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН'},
	        {possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП'},
	        {possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС'},
	        {possibleNames: ['ИНН', 'INN'], translation: 'ИНН'},
	        {possibleNames: ['E'], translation: 'Email'},
	        {possibleNames: ['L'], translation: 'Город'}
	    ],
	
	    issuerNameTagsTranslations = [
	        {possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя'},
	        {possibleNames: ['CN'], translation: 'Удостоверяющий центр'},
	        {possibleNames: ['S'], translation: 'Регион'},
	        {possibleNames: ['C'], translation: 'Страна'},
	        {possibleNames: ['STREET'], translation: 'Адрес'},
	        {possibleNames: ['O'], translation: 'Компания'},
	        {possibleNames: ['OU'], translation: 'Тип'},
	        {possibleNames: ['T'], translation: 'Должность'},
	        {possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН'},
	        {possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП'},
	        {possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС'},
	        {possibleNames: ['ИНН', 'INN'], translation: 'ИНН'},
	        {possibleNames: ['E'], translation: 'Email'},
	        {possibleNames: ['L'], translation: 'Город'}
	    ];
	
	function generateAsyncFn(cb) {
	    var canAsync = cadesplugin.CreateObjectAsync;
	
	    cb = String(cb);
	
	    var args = cb.match(/^function\s*?\((.*?)\)/);
	
	    args = (args && args[1]) || '';
	
	    cb = cb.replace(/^.*?{([\s\S]*?)}$/, '$1');
	
	    function GeneratorFunction() {
	        return (new Function('', 'return Object.getPrototypeOf(function*(){}).constructor'))();
	    }
	
	    cb = String(new (canAsync ? GeneratorFunction() : Function)(args, cb));
	
	    cb = cb.replace(/cryptoCommon\.createObj(\([\s\S]*?\))/gm, 'cadesplugin.CreateObject' + (canAsync ? 'Async' : '') + '$1');
	    cb = cb.replace(/("|')(yield)(\1)\s*?\+\s*?\b/gm, canAsync ? '$2 ' : '');
	
	    if (!canAsync) {
	        cb = cb.replace(/propset_(.*?)\((.*?)\)/gm, '$1 = $2');
	    }
	
	    return canAsync ?
	        'cadesplugin.async_spawn(' + cb + ');'
	        : '(' + cb + ')();';
	}
	
	/**
	 * Парсит информацию из строки с информацией о сертификате
	 * */
	function parseCertInfo(tags, infoString) {
	    /**
	     * Пример входной строки:
	     *
	
	     T=Генеральный директор, UnstructuredName="INN=7811514257/KPP=781101001/OGRN=1127847087884",
	     STREET="Крыленко, д.3, лит.Б", CN=Король Анатолий Евгеньевич, G=Анатолий Евгеньевич, SN=Король,
	     OU=Администрация, O="ООО ""Аксиома""", L=Санкт-Петербург, S=78 г. Санкт-Петербург, C=RU, E=korol@sferasro.ru,
	     INN=007811514257, OGRN=1127847087884, SNILS=11617693460
	
	     * */
	    var result = infoString.match(/([а-яА-Яa-zA-Z0-9\.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);
	
	    if (result) {
	        result = result.map(function (group) {
	            /**
	             * Пример входной строки:
	             *
	
	             UnstructuredName="INN=7811514257/KPP=781101001/OGRN=1127847087884",
	
	             * */
	            var parts = group.match(/^([а-яА-Яa-zA-Z0-9\.]+)=(.+?),?$/),
	                title = parts && parts[1],
	                descr = parts && parts[2],
	                translated = false,
	                oidTitle;
	
	            // Если тайтл содержит ОИД, пытаемся расшифровать
	            if (/^OID./.test(title)) {
	                oidTitle = title.match(/^OID\.(.*)/);
	
	                if (oidTitle && oidTitle[1]) {
	                    oidTitle = oids[oidTitle[1]];
	
	                    if (oidTitle) {
	                        title = oidTitle;
	                    }
	                }
	            }
	
	            // Вырезаем лишние кавычки
	            descr = descr.replace(/^"(.*)"/, '$1');
	            descr = descr.replace(/"{2}/g, '"');
	
	            tags.some(function (tag) {
	                return tag.possibleNames.some(function (possible) {
	                    var match = possible === title;
	
	                    if (match) {
	                        title = tag.translation;
	                        translated = true;
	                    }
	
	                    return match;
	                });
	            });
	
	            return {
	                title: title,
	                descr: descr,
	                translated: translated
	            };
	        });
	    }
	
	    return result;
	}
	
	/**
	 * Возвращает дату в формате (dd.mm.yyyy hh:mm:ss) из строки, формата, используемого плагином cryptoPro
	 * */
	function getReadableDate(date) {
	    date = new Date(date);
	
	    return ([
	        date.getDate(),
	        date.getMonth() + 1,
	        date.getFullYear()
	    ].join('.') + ' ' + [
	        date.getHours(),
	        date.getMinutes(),
	        date.getSeconds()
	    ].join(':')).replace(/\b(\d)\b/g, '0$1');
	}
	
	/**
	 * Преобразует дату для IE
	 * */
	function getDateObj(dateObj) {
	    return bowser.msie ? dateObj.getVarDate() : dateObj;
	}
	
	/**
	 * Подготавливает информацию о сертификатах
	 * */
	function prepareCertsInfo(items) {
	    return items.map(function (c) {
	        c.name = c.subjectName.match(/CN=(.+?),/);
	
	        // Удалось ли вытащить Common Name
	        if (c.name && c.name[1]) {
	            c.name = c.name[1];
	        }
	
	        c.validFrom = getReadableDate(c.validFrom);
	        c.validTo = getReadableDate(c.validTo);
	
	        c.label = c.name + ' (до ' + c.validTo + ')';
	
	        return c;
	    });
	}
	
	/**
	 * Возвращает расшифрованные ОИД'ы
	 * */
	function getDecodedExtendedKeyUsage() {
	    var that = this;
	
	    return new Promise(function (resolve) {
	        that.getExtendedKeyUsage().then(function (certOids) {
	            resolve(certOids.reduce(function (oidsLst, oid) {
	                oid = {
	                    id: oid,
	                    descr: oids[oid] || null
	                };
	
	                if (oid.descr) {
	                    oidsLst.unshift(oid);
	                } else {
	                    oidsLst.push(oid);
	                }
	
	                return oidsLst;
	            }, []));
	        });
	    });
	}
	
	/**
	 * Проверка наличия ОИД'а(ОИД'ов) у сертификата
	 *
	 * @param {String|Array} oids - ОИД'ы для проверки
	 * @returns {Promise} с отложенным результатом типа {Boolean}
	 * */
	function hasExtendedKeyUsage(oids) {
	    var that = this;
	
	    return new Promise(function (resolve) {
	        that.getExtendedKeyUsage().then(function (certOids) {
	            var result;
	
	            if (Array.isArray(oids)) {
	                result = oids.every(function (oidToCheck) {
	                    return certOids.some(function (certOid) {
	                        return certOid === oidToCheck;
	                    });
	                });
	            } else {
	                result = certOids.some(function (certOid) {
	                    return certOid === oids;
	                });
	            }
	
	            resolve(result);
	        });
	    });
	}
	
	/**
	 * Выводит информацию о системе пользователя
	 * */
	function getEnvInfo() {
	    var parsed = bowser._detect(navigator.userAgent),
	        info = {
	            browserName: parsed.name,
	            browserVersion: parsed.version
	        };
	
	    if (parsed.mac) {
	        info.os = 'Mac';
	    } else if (parsed.windows) {
	        info.os = 'Windows';
	    } else if (parsed.linux) {
	        info.os = 'Linux';
	    }
	
	    return info;
	}
	
	/**
	 * Подходящая ли версия CSP
	 * */
	function isValidCSPVersion(version) {
	    version = version.match(/\d+?\b(?:\.\d+)?/);
	
	    return version >= 3.6;
	}
	
	/**
	 * Подходящая ли версия cades плагина
	 * */
	function isValidCadesVersion(version) {
	    version = version.split('.').reduce(function (verInfo, number, i) {
	        if (i === 0) {
	            verInfo.major = number;
	        } else if (i === 1) {
	            verInfo.minor = number;
	        } else if (i === 2) {
	            verInfo.patch = number;
	        }
	
	        return verInfo;
	    }, {});
	
	    if (version.major < 2) {
	        return false;
	    }
	
	    return version.patch >= 12438;
	}
	
	module.exports = {
	    generateAsyncFn: generateAsyncFn,
	    subjectNameTagsTranslations: subjectNameTagsTranslations,
	    issuerNameTagsTranslations: issuerNameTagsTranslations,
	    parseCertInfo: parseCertInfo,
	    getReadableDate: getReadableDate,
	    getDateObj: getDateObj,
	    prepareCertsInfo: prepareCertsInfo,
	    getDecodedExtendedKeyUsage: getDecodedExtendedKeyUsage,
	    hasExtendedKeyUsage: hasExtendedKeyUsage,
	    getEnvInfo: getEnvInfo,
	    isValidCSPVersion: isValidCSPVersion,
	    isValidCadesVersion: isValidCadesVersion
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	    '1.2.840.113549.1.9.2': 'Неструктурированное имя',
	    '1.2.643.3.141.1.1': 'РНС ФСС',
	    '1.2.643.3.141.1.2': 'КП ФСС',
	    '1.2.643.3.131.1.1': 'ИНН',
	    '1.3.6.1.5.5.7.3.2': 'Проверка подлинности клиента',
	    '1.3.6.1.5.5.7.3.4': 'Защищенная электронная почта',
	    '1.2.643.3.8.100.1': 'Сертификат типа "ekey-ГОСТ"',
	    '1.2.643.3.8.100.1.1': 'Общее использование в системах ИОК без права заверения финансовых документов',
	    '1.2.643.3.8.100.1.2': 'Передача отчетности по ТКС',
	    '1.2.643.3.8.100.1.3': 'Оформление взаимных обязательств, соглашений, договоров, актов и т.п.',
	    '1.2.643.3.8.100.1.4': 'Внутрикорпоративный документооборот',
	    '1.2.643.3.8.100.1.5': 'Использование в системах электронной торговли',
	    '1.2.643.3.8.100.1.6': 'Использование в торгово-закупочной системе "ЭЛЕКТРА"',
	    '1.2.643.6.2.1.7.2': 'Использование физическим лицом в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских прав и обязанностей в отношении инвестиционных паев паевых инвестиционных фондов, в том числе отношения, связанные с учетом и/или фиксацией прав на инвестиционные паи паевых инвестиционных фондов',
	    '1.2.643.6.2.1.7.1': 'Использование единоличным исполнительным органом юридического лица или уполномоченными представителями юридического лица в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских и иных прав и обязанностей в сфере негосударственного пенсионного обеспечения, негосударственного пенсионного страхования, в сфере деятельности паевых инвестиционных фондов, акционерных инвестиционных фондов, профессиональных участников рынка ценных бумаг, а также связанной с обслуживанием указанной деятельности услуг кредитных и иных организаций',
	    '1.3.6.1.4.1.29919.21': 'Использование в системе Портал государственных закупок  Ростовской области "Рефери".',
	    '1.2.643.3.2.100.65.13.11': 'Использование в системе АИС "Госзакупки" Сахалинской области.',
	    '1.2.643.3.8.100.1.7': 'Использование в системе Портал государственных закупок Ставропольского края.',
	    '1.2.643.3.8.100.1.8': 'Использование в Единой системе электронной торговли B2B-Center и B2G.',
	    '1.2.643.3.8.100.1.9': 'Для участия в электронных торгах и подписания государственного контракта в  электронной площадке ОАО «ЕЭТП» уполномоченными лицами участников размещения  государственного или муниципального заказа',
	    '1.2.643.3.8.100.1.10': 'Для участия в электронных торгах и подписания государственного контракта в  информационных системах Тендерного комитета города Москвы уполномоченными  лицами участников размещения государственного заказа города Москвы',
	    '1.2.643.3.8.100.1.11': 'Подписание электронных документов в автоматизированной информационной  системе размещения государственного и муниципального заказа Саратовской области',
	    '1.2.643.3.8.100.1.12': 'Использование в системе государственного заказа Иркутской области',
	    '1.2.643.3.8.100.1.13': 'Использование в электронной торговой площадке агентства государственного  заказа Красноярского края',
	    '1.3.6.1.4.1.24138.1.1.8.1': 'Обеспечение юридической значимости в Системе "Электронная Торговая Площадка"',
	    '1.2.643.3.8.100.1.14': 'Использование в электронной торговой площадке "Тендер"',
	    '1.2.643.6.3': 'Использование в электронных торговых системах и в программном обеспечении, связанным с обменом электронных сообщений',
	    '1.2.643.2.2.34.6': 'Пользователь Центра Регистрации',
	    '1.2.643.2.39.1.1': 'Использование в программных продуктах системы "1С:Предприятие 8"',
	    '1.2.643.5.1.24.2.1.3': 'Формирование документов для получения государственных  услуг в сфере ведения государственного кадастра недвижимости со стороны заявителя',
	    '1.2.643.5.1.24.2.1.3.1': 'Формирование кадастровым инженером документов  для получения государственных услуг в сфере ведения государственного кадастра недвижимости со стороны  заявителя',
	    '1.2.643.5.1.24.2.2.2': 'Формирование документов как результата оказания  услуги со стороны органов регистрации прав',
	    '1.2.643.5.1.24.2.2.3': 'Формирование документов для получения государственных  услуг в сфере государственной регистрации прав на недвижимое имущество и сделок с ним со стороны заявителя',
	    '1.2.643.6.3.1.1': 'Использование на электронных площадок отобранных для проведения аукционах в электронной форме',
	    '1.2.643.6.3.1.2.1': 'Тип участника - Юридическое лицо',
	    '1.2.643.6.3.1.2.2': 'Тип участника - Физическое лицо',
	    '1.2.643.6.3.1.2.3': 'Тип участника - Индивидуальный предприниматель',
	    '1.2.643.6.3.1.3.1': 'Участник размещения заказа',
	    '1.2.643.6.3.1.4.1': 'Администратор организации',
	    '1.2.643.6.3.1.4.2': 'Уполномоченный специалист',
	    '1.2.643.6.3.1.4.3': 'Специалист с правом подписи контракта',
	    '1.3.643.3.8.100.15': 'Использование в ЭТП "uTender"'
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	    // CAPICOM_STORE_LOCATION enumeration
	    StoreLocation: {
	        CAPICOM_MEMORY_STORE: 0,
	        CAPICOM_LOCAL_MACHINE_STORE: 1,
	        CAPICOM_CURRENT_USER_STORE: 2,
	        CAPICOM_ACTIVE_DIRECTORY_USER_STORE: 3,
	        CAPICOM_SMART_CARD_USER_STORE: 4
	    },
	    // CAPICOM_STORE_OPEN_MODE enumeration
	    StoreOpenMode: {
	        CAPICOM_STORE_OPEN_READ_ONLY: 0,
	        CAPICOM_STORE_OPEN_READ_WRITE: 1,
	        CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: 2,
	        CAPICOM_STORE_OPEN_EXISTING_ONLY: 128,
	        CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED: 256
	    },
	    // CAPICOM_CERTIFICATE_FIND_TYPE enumeration
	    CertFindType: {
	        CAPICOM_CERTIFICATE_FIND_SHA1_HASH: 0,
	        CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: 1,
	        CAPICOM_CERTIFICATE_FIND_ISSUER_NAME: 2,
	        CAPICOM_CERTIFICATE_FIND_ROOT_NAME: 3,
	        CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME: 4,
	        CAPICOM_CERTIFICATE_FIND_EXTENSION: 5,
	        CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY: 6,
	        CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY: 7,
	        CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY: 8,
	        CAPICOM_CERTIFICATE_FIND_TIME_VALID: 9,
	        CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID: 10,
	        CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED: 11,
	        CAPICOM_CERTIFICATE_FIND_KEY_USAGE: 12
	    },
	    Time: {
	        AUTHENTICATED_ATTRIBUTE_SIGNING_TIME: 0
	    },
	    Check: {
	        CHECK_NONE: 0,
	        CHECK_TRUSTED_ROOT: 1,
	        CHECK_TIME_VALIDITY: 2,
	        CHECK_SIGNATURE_VALIDITY: 4,
	        CHECK_ONLINE_REVOCATION_STATUS: 8,
	        CHECK_OFFLINE_REVOCATION_STATUS: 16,
	        TRUST_IS_NOT_TIME_VALID: 1,
	        TRUST_IS_NOT_TIME_NESTED: 2,
	        TRUST_IS_REVOKED: 4,
	        TRUST_IS_NOT_SIGNATURE_VALID: 8,
	        TRUST_IS_NOT_VALID_FOR_USAGE: 16,
	        TRUST_IS_UNTRUSTED_ROOT: 32,
	        TRUST_REVOCATION_STATUS_UNKNOWN: 64,
	        TRUST_IS_CYCLIC: 128,
	        TRUST_IS_PARTIAL_CHAIN: 65536,
	        TRUST_CTL_IS_NOT_TIME_VALID: 131072,
	        TRUST_CTL_IS_NOT_SIGNATURE_VALID: 262144,
	        TRUST_CTL_IS_NOT_VALID_FOR_USAGE: 524288,
	    },
	    // CAPICOM_PROPID enumeration
	    PropId: {
	        CAPICOM_PROPID_UNKNOWN: 0,
	        CAPICOM_PROPID_KEY_PROV_HANDLE: 1,
	        CAPICOM_PROPID_KEY_PROV_INFO: 2,
	        CAPICOM_PROPID_SHA1_HASH: 3,
	        CAPICOM_PROPID_HASH_PROP: 3,
	        CAPICOM_PROPID_MD5_HASH: 4,
	        CAPICOM_PROPID_KEY_CONTEXT: 5,
	        CAPICOM_PROPID_KEY_SPEC: 6,
	        CAPICOM_PROPID_IE30_RESERVED: 7,
	        CAPICOM_PROPID_PUBKEY_HASH_RESERVED: 8,
	        CAPICOM_PROPID_ENHKEY_USAGE: 9,
	        CAPICOM_PROPID_CTL_USAGE: 9,
	        CAPICOM_PROPID_NEXT_UPDATE_LOCATION: 10,
	        CAPICOM_PROPID_FRIENDLY_NAME: 11,
	        CAPICOM_PROPID_PVK_FILE: 12,
	        CAPICOM_PROPID_DESCRIPTION: 13,
	        CAPICOM_PROPID_ACCESS_STATE: 14,
	        CAPICOM_PROPID_SIGNATURE_HASH: 15,
	        CAPICOM_PROPID_SMART_CARD_DATA: 16,
	        CAPICOM_PROPID_EFS: 17,
	        CAPICOM_PROPID_FORTEZZA_DATA: 18,
	        CAPICOM_PROPID_ARCHIVED: 19,
	        CAPICOM_PROPID_KEY_IDENTIFIER: 20,
	        CAPICOM_PROPID_AUTO_ENROLL: 21,
	        CAPICOM_PROPID_PUBKEY_ALG_PARA: 22,
	        CAPICOM_PROPID_CROSS_CERT_DIST_POINTS: 23,
	        CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH: 24,
	        CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH: 25,
	        CAPICOM_PROPID_ENROLLMENT: 26,
	        CAPICOM_PROPID_DATE_STAMP: 27,
	        CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH: 28,
	        CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH: 29,
	        CAPICOM_PROPID_EXTENDED_ERROR_INFO: 30,
	        CAPICOM_PROPID_RENEWAL: 64,
	        CAPICOM_PROPID_ARCHIVED_KEY_HASH: 65,
	        CAPICOM_PROPID_FIRST_RESERVED: 66,
	        CAPICOM_PROPID_LAST_RESERVED: 0x00007FFF,
	        CAPICOM_PROPID_FIRST_USER: 0x00008000,
	        CAPICOM_PROPID_LAST_USER: 0x0000FFFF
	    },
	    // CADESCOM_XML_SIGNATURE_TYPE enumeration
	    SignatureType: {
	        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED: 0,
	        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING: 1,
	        CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE: 2
	    },
	    // CADESCOM_HASH_ALGORITHM enumeration
	    HashAlgorithm: {
	        CADESCOM_HASH_ALGORITHM_CP_GOST_3411: 100,
	        CADESCOM_HASH_ALGORITHM_MD2: 1,
	        CADESCOM_HASH_ALGORITHM_MD4: 2,
	        CADESCOM_HASH_ALGORITHM_MD5: 3,
	        CADESCOM_HASH_ALGORITHM_SHA_256: 4,
	        CADESCOM_HASH_ALGORITHM_SHA_384: 5,
	        CADESCOM_HASH_ALGORITHM_SHA_512: 6,
	        CADESCOM_HASH_ALGORITHM_SHA1: 0
	    },
	    CadesType: {
	        CADESCOM_CADES_DEFAULT: 0,
	        CADESCOM_CADES_BES: 1,
	        CADESCOM_CADES_X_LONG_TYPE_1: 0x5d
	    },
	    ContentEncoding: {
	        CADESCOM_BASE64_TO_BINARY: 0x01,
	        CADESCOM_STRING_TO_UCS2LE: 0x00
	    },
	    StoreNames: {
	        CAPICOM_MY_STORE: 'My'
	    },
	    Chain: {
	        CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT: 0,
	        CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN: 1,
	        CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY: 2
	    },
	    GostXmlDSigUrls: {
	        XmlDsigGost3410Url: 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411',
	        XmlDsigGost3411Url: 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411',
	        XmlDsigGost3410UrlObsolete: 'http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411',
	        XmlDsigGost3411UrlObsolete: 'http://www.w3.org/2001/04/xmldsig-more#gostr3411'
	    }
	};

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var cryptoCommon = __webpack_require__(5),
	    cryptoConstants = __webpack_require__(7),
	    _certListCache;
	
	function Certificate(item) {
	    this._cert = item._cert;
	    this.thumbprint = item.thumbprint;
	    this.subjectName = item.subjectName;
	    this.issuerName = item.issuerName;
	    this.validFrom = item.validFrom;
	    this.validTo = item.validTo;
	}
	
	/**
	 * Проверяет, валиден ли сертификат
	 * */
	Certificate.prototype.isValid = function isValid() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var result;
	
	            try {
	                result = 'yield' + cert.IsValid();
	                result = 'yield' + result.Result;
	            } catch (err) {
	                reject('Ошибка при проверке сертификата: ', err.message);
	                return;
	            }
	
	            resolve(result);
	        }));
	    });
	};
	
	/**
	 * Достает указанное свойство у сертификата
	 * */
	Certificate.prototype.getProp = function (propName) {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var result;
	
	            try {
	                result = 'yield' + cert[propName];
	            } catch (err) {
	                reject('Ошибка при обращении к свойству сертификата: ', err.message);
	                return;
	            }
	
	            resolve(result);
	        }));
	    });
	};
	
	/**
	 * Экспорт base64 представления сертификата пользователя
	 * */
	Certificate.prototype.exportBase64 = function exportBase64() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var base64;
	
	            try {
	                base64 = 'yield' + cert.Export(0);
	            } catch (err) {
	                reject('Ошибка при экспорте сертификата: ', err.message);
	                return;
	            }
	
	            resolve(base64);
	        }));
	    });
	};
	
	/**
	 * Возвращает информацию об алгоритме
	 * */
	Certificate.prototype.getAlgorithm = function getAlgorithm() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var result = {},
	                algorithm;
	
	            try {
	                algorithm = 'yield' + cert.PublicKey();
	                algorithm = 'yield' + algorithm.Algorithm;
	
	                result.algorithm = 'yield' + algorithm.FriendlyName;
	                result.oid = 'yield' + algorithm.Value;
	            } catch (err) {
	                reject('Ошибка при получении алгоритма: ', err.message);
	                return;
	            }
	
	            resolve(result);
	        }));
	    });
	};
	
	/**
	 * Разбирает SubjectName сертификата по тэгам
	 * */
	Certificate.prototype.getOwnerInfo = function getOwnerInfo() {
	    return getCertInfo.call(this, cryptoCommon.subjectNameTagsTranslations, 'SubjectName');
	};
	
	/**
	 * Разбирает IssuerName сертификата по тэгам
	 * */
	Certificate.prototype.getIssuerInfo = function getIssuerInfo() {
	    return getCertInfo.call(this, cryptoCommon.issuerNameTagsTranslations, 'IssuerName');
	};
	
	/**
	 * Получение OID сертификата
	 *
	 * @returns {Array} Возвращает массив OID (улучшенного ключа)
	 * */
	Certificate.prototype.getExtendedKeyUsage = function getExtendedKeyUsage() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var OIDS = [],
	                count,
	                item;
	
	            try {
	                count = 'yield' + cert.ExtendedKeyUsage();
	                count = 'yield' + count.EKUs;
	                count = 'yield' + count.Count;
	
	                if (count > 0) {
	                    while (count > 0) {
	                        item = 'yield' + cert.ExtendedKeyUsage();
	                        item = 'yield' + item.EKUs;
	                        item = 'yield' + item.Item(count);
	                        item = 'yield' + item.OID;
	
	                        OIDS.push(item);
	
	                        count--;
	                    }
	                }
	            } catch (err) {
	                reject('Ошибка при получении ОИД\'ов: ', err.message);
	                return;
	            }
	
	            resolve(OIDS);
	        }));
	    });
	};
	
	Certificate.prototype.getDecodedExtendedKeyUsage = cryptoCommon.getDecodedExtendedKeyUsage;
	
	Certificate.prototype.hasExtendedKeyUsage = cryptoCommon.hasExtendedKeyUsage;
	
	/**
	 * Проверяет корректность настроек ЭП на машине
	 * */
	function isValidEDSSettings() {
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var result;
	
	            try {
	                result = 'yield' + cryptoCommon.createObj('CAdESCOM.About');
	            } catch (error) {
	                reject('Настройки ЭП на данной машине не верны');
	            }
	
	            resolve();
	        }));
	    });
	}
	
	/**
	 * Получить сертификат в формате cades по хэшу
	 * */
	function getCadesCert(hash) {
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var oStore = 'yield' + cryptoCommon.createObj('CAdESCOM.Store'),
	                certs,
	                certCnt,
	                cert;
	
	            if (!oStore) {
	                reject('Не удалось получить доступ к хранилищу сертификатов');
	                return;
	            }
	
	            // Открываем хранилище
	            try {
	                'yield' + oStore.Open(
	                    cadesplugin.CAPICOM_CURRENT_USER_STORE,
	                    cadesplugin.CAPICOM_MY_STORE,
	                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
	                );
	            } catch (err) {
	                reject('Ошибка при открытии хранилища: ' + err.message);
	                return;
	            }
	
	            // Получаем доступ к сертификатам
	            try {
	                certs = 'yield' + oStore.Certificates;
	                certCnt = 'yield' + certs.Count;
	            } catch (err) {
	                reject('Ошибка получения списка сертификатов: ' + err.message);
	                return;
	            }
	
	            if (!certCnt) {
	                reject('Нет доступных сертификатов');
	                return;
	            }
	
	            // Получаем сертификат по хэшу
	            try {
	                certs = 'yield' + certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, hash);
	
	                if (certs.Count) {
	                    cert = 'yield' + certs.Item(1);
	                } else {
	                    throw new Error(hash);
	                }
	            } catch (err) {
	                reject('Не удалось получить сертификат по хэшу: ' + err.message);
	                return;
	            }
	
	            oStore.Close();
	
	            resolve(cert);
	        }));
	    });
	}
	
	/**
	 * Разбирает информацию сертификата по тэгам
	 * */
	function getCertInfo(tags, propName) {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var propInfo;
	
	            try {
	                propInfo = 'yield' + cert[propName];
	            } catch (err) {
	                reject('Ошибка при извлечении данных из сертификата: ', err.message);
	                return;
	            }
	
	            resolve(cryptoCommon.parseCertInfo(tags, propInfo));
	        }));
	    });
	}
	
	/**
	 * Возвращает список сертификатов, доступных в системе
	 *
	 * @param {Boolean} [resetCache=false] -- нужно ли сбросить кэш списка сертификатов
	 * @returns {Promise} -- со списком сертификатов {Array}
	 * */
	function getCertsList(resetCache) {
	    return new Promise(function (resolve, reject) {
	        if (!resetCache && _certListCache) {
	            resolve(_certListCache);
	            return;
	        }
	
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var oStore = 'yield' + cryptoCommon.createObj('CAdESCOM.Store'),
	                result = [],
	                certs,
	                count,
	                item;
	
	            // Открываем хранилище
	            try {
	                'yield' + oStore.Open(
	                    cadesplugin.CAPICOM_CURRENT_USER_STORE,
	                    cadesplugin.CAPICOM_MY_STORE,
	                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
	                );
	            } catch (err) {
	                reject('Ошибка при открытии хранилища: ' + err.message);
	                return;
	            }
	
	            // Получаем доступ к сертификатам
	            try {
	                certs = 'yield' + oStore.Certificates;
	
	                if (certs) {
	                    certs = 'yield' + certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
	                    /**
	                     * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
	                     * или не действительны на данный момент
	                     * */
	                    certs = 'yield' + certs.Find(
	                        cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
	                        cryptoConstants.PropId.CAPICOM_PROPID_KEY_PROV_INFO
	                    );
	
	                    count = 'yield' + certs.Count;
	                }
	            } catch (err) {
	                reject('Ошибка получения списка сертификатов: ' + err.message);
	                return;
	            }
	
	            if (!count) {
	                reject('Нет доступных сертификатов');
	                return;
	            }
	
	            try {
	                while (count) {
	                    item = 'yield' + certs.Item(count);
	
	                    result.push(new Certificate({
	                        _cert: 'yield' + item,
	                        thumbprint: 'yield' + item.Thumbprint,
	                        subjectName: 'yield' + item.SubjectName,
	                        issuerName: 'yield' + item.IssuerName,
	                        validFrom: 'yield' + item.ValidFromDate,
	                        validTo: 'yield' + item.ValidToDate
	                    }));
	
	                    count--;
	                }
	            } catch (err) {
	                reject('Ошибка обработки сертификатов: ' + err.message);
	                return;
	            }
	
	            oStore.Close();
	
	            _certListCache = cryptoCommon.prepareCertsInfo(result);
	
	            resolve(_certListCache);
	        }));
	    });
	}
	
	/**
	 * Получить сертификат по хэшу
	 * */
	function getCert(hash) {
	    return new Promise(function (resolve, reject) {
	        if (!hash) {
	            reject('Хэш не указан');
	            return;
	        }
	
	        getCertsList().then(function (list) {
	            var foundCert;
	
	            list.some(function (cert) {
	                if (hash === cert.thumbprint) {
	                    foundCert = cert;
	                    return true;
	                }
	            });
	
	            if (foundCert) {
	                resolve(foundCert);
	            } else {
	                reject('Сертификат с хэшем: "' + hash + '" не найден');
	            }
	        }, reject);
	    });
	}
	
	/**
	 * Создает подпись base64 строки по hash'у сертификата
	 *
	 * @param {String} hash -- fingerprint (thumbprint) сертификата
	 * @param {String} dataBase64 -- строковые данные в формате base64
	 * @param {Boolean} signType -- тип подписи открепленная (true) / присоединенная (false) (default: true)
	 * @returns {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
	 * */
	function signData(hash, dataBase64, signType) {
	    signType = typeof signType === 'undefined' ? true : Boolean(signType);
	
	    return new Promise(function (resolve, reject) {
	        getCadesCert(hash).then(function (cert) {
	            eval(cryptoCommon.generateAsyncFn(function () {
	                var clientTime = new Date(),
	                    oAttrs = 'yield' + cryptoCommon.createObj('CADESCOM.CPAttribute'),
	                    oSignedData = 'yield' + cryptoCommon.createObj('CAdESCOM.CadesSignedData'),
	                    oSigner = 'yield' + cryptoCommon.createObj('CAdESCOM.CPSigner'),
	                    attrs,
	                    signature;
	
	                clientTime = cryptoCommon.getDateObj(clientTime);
	
	                try {
	                    'yield' + oAttrs.propset_Name(cryptoConstants.Time.AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
	                    'yield' + oAttrs.propset_Value(clientTime);
	                } catch (err) {
	                    reject('Ошибка при установке данных подписи: ' + err.message);
	                    return;
	                }
	
	                // Задаем настройки для подписи
	                try {
	                    'yield' + oSigner.propset_Certificate(cert);
	                    attrs = 'yield' + oSigner.AuthenticatedAttributes2;
	                    'yield' + attrs.Add(oAttrs);
	                    'yield' + oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
	                    'yield' + oSignedData.propset_Content(dataBase64);
	                    'yield' + oSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);
	                } catch (err) {
	                    reject('Не удалось установить настройки для подписи: ' + err.message);
	                    return;
	                }
	
	                try {
	                    signature = 'yield' + oSignedData.SignCades(
	                        oSigner,
	                        cadesplugin.CADESCOM_CADES_BES,
	                        signType
	                    );
	                } catch (err) {
	                    reject('Не удалось создать подпись: ' + err.message);
	                    return;
	                }
	
	                resolve(signature);
	            }));
	        }, reject);
	    });
	}
	
	/**
	 * Создает подпись XML строки по hash'у сертификата
	 *
	 * @param {String} hash -- fingerprint (thumbprint) сертификата
	 * @param {String} dataXML -- данные в формате XML
	 * @returns {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
	 * */
	function signDataXML(hash, dataXML) {
	    return new Promise(function (resolve, reject) {
	        getCadesCert(hash).then(function (cert) {
	            eval(cryptoCommon.generateAsyncFn(function () {
	                var oSigner = 'yield' + cryptoCommon.createObj('CAdESCOM.CPSigner'),
	                    signerXML = 'yield' + cryptoCommon.createObj('CAdESCOM.SignedXML'),
	                    cnts = cryptoConstants,
	                    signature;
	
	                // Задаем настройки для подписи
	                try {
	                    'yield' + oSigner.propset_Certificate(cert);
	                    // Добавляем данные для подписи
	                    'yield' + signerXML.propset_Content(dataXML);
	                    // Устанавливаем тип подписи
	                    'yield' + signerXML.propset_SignatureType(cnts.SignatureType.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED);
	                    // Устанавливаем алгоритм подписи
	                    'yield' + signerXML.propset_SignatureMethod(cnts.GostXmlDSigUrls.XmlDsigGost3410Url);
	                    // Устанавливаем алгоритм хэширования
	                    'yield' + signerXML.propset_DigestMethod(cnts.GostXmlDSigUrls.XmlDsigGost3411Url);
	                } catch (err) {
	                    reject('Не удалось установить настройки для подписи: ' + err.message);
	                    return;
	                }
	
	                try {
	                    signature = 'yield' + signerXML.Sign(oSigner);
	                } catch (err) {
	                    reject('Не удалось создать подпись: ' + err.message);
	                    return;
	                }
	
	                resolve(signature);
	            }));
	        }, reject);
	    });
	}
	
	/**
	 * Возвращает информацию о версии CSP и плагина
	 * */
	function getSystemInfo() {
	    var sysInfo = cryptoCommon.getEnvInfo();
	
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.generateAsyncFn(function () {
	            var e;
	
	            try {
	                e = 'yield' + cryptoCommon.createObj('CAdESCOM.About');
	
	                sysInfo.cadesVersion = 'yield' + e.PluginVersion;
	                // Возможен вызов в ранних версиях в виде sysInfo.cspVersion = 'yield' + e.CSPVersion('', 75);
	                sysInfo.cspVersion = 'yield' + e.CSPVersion();
	
	                if (!sysInfo.cadesVersion) {
	                    sysInfo.cadesVersion = 'yield' + e.Version;
	                }
	
	                sysInfo.cadesVersion = 'yield' + sysInfo.cadesVersion.toString();
	                sysInfo.cspVersion = 'yield' + sysInfo.cspVersion.toString();
	
	                resolve(sysInfo);
	            } catch (err) {
	                reject('Ошибка при получении информации о системе: ', err.message);
	            }
	        }));
	    });
	}
	
	/**
	 * Promise обертка для синхронного вызова проверки версии CSP
	 * */
	function isValidCSPVersion(version) {
	    return new Promise(function (resolve) {
	        resolve(cryptoCommon.isValidCSPVersion(version));
	    });
	}
	
	/**
	 * Promise обертка для синхронного вызова проверки версии плагина
	 * */
	function isValidCadesVersion(version) {
	    return new Promise(function (resolve) {
	        resolve(cryptoCommon.isValidCadesVersion(version));
	    });
	}
	
	module.exports = {
	    isValidEDSSettings: isValidEDSSettings,
	    getCertsList: getCertsList,
	    getCert: getCert,
	    signData: signData,
	    signDataXML: signDataXML,
	    getSystemInfo: getSystemInfo,
	    isValidCSPVersion: isValidCSPVersion,
	    isValidCadesVersion: isValidCadesVersion
	};

/***/ }
/******/ ]);
//# sourceMappingURL=crypto-pro.js.map