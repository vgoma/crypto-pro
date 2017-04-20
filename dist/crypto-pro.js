var CryptoPro =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonpCryptoPro"];
/******/ 	window["webpackJsonpCryptoPro"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".crypto-pro.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
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

	var bowser = __webpack_require__(4),
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
	
	__webpack_require__(1);
	
	cadesplugin = global.cadesplugin;
	
	canAsync = Boolean(cadesplugin.CreateObjectAsync);
	
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
	    canAsync = Boolean(cadesplugin.CreateObjectAsync);
	
	    // Уровень отладки (LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, LOG_LEVEL_ERROR)
	    cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);
	
	    // Получаем указанные конфиги
	    if (CryptoProConfig && CryptoProConfig.publicPath) {
	        __webpack_require__.p = CryptoProConfig.publicPath;
	    }
	
	    if (canPromise) {
	        cadesplugin.then(
	            function () {
	                if (canAsync) {
	                    __webpack_require__.e/* nsure */(1, function () {
	                        cryptoService = __webpack_require__(2);
	                        finishLoading();
	                    });
	                } else {
	                    __webpack_require__.e/* nsure */(2, function () {
	                        cryptoService = __webpack_require__(8);
	                        finishLoading();
	                    });
	                }
	            },
	
	            function () {
	                _errorMsg = 'КриптоПРО ЭЦП Browser Plug-In не доступен';
	                finishLoading();
	            }
	        );
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
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Bowser - a browser detector
	 * https://github.com/ded/bowser
	 * MIT License | (c) Dustin Diaz 2015
	 */
	
	!function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) __webpack_require__(5)(name, definition)
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
/* 5 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ]);
//# sourceMappingURL=crypto-pro.js.map