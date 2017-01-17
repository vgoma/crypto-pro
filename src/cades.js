;(function () {
    /**
     * Это переделанная версия cadesplugin_api.js с сайта Крипто ПРО,
     * в которую добавлена поддержка IE-8.
     *
     * Обсуждение:
     * https://www.cryptopro.ru/forum2/default.aspx?g=posts&t=9271
     *
     * Оригинальный файл:
     * https://www.cryptopro.ru/sites/default/files/products/cades/cadesplugin_api.js
     * */
    var pluginObject,
        plugin_resolved = 0,
        plugin_reject,
        plugin_resolve,
        isOpera = 0,
        isYaBrowser = 0,
        failed_extensions = 0,
        canPromise = Boolean(window.Promise),
        cadesplugin;

    if (window.cadesplugin) {
        return;
    }

    if (canPromise) {
        cadesplugin = new Promise(function (resolve, reject) {
            plugin_resolve = resolve;
            plugin_reject = reject;
        });
    } else {
        cadesplugin = {};
    }

    function cpcsp_console_log(level, msg) {
        if (level <= cadesplugin.current_log_level) {
            if (level == cadesplugin.LOG_LEVEL_DEBUG) {
                console.log('DEBUG: %s', msg);
            }

            if (level == cadesplugin.LOG_LEVEL_INFO) {
                console.info('INFO: %s', msg);
            }

            if (level == cadesplugin.LOG_LEVEL_ERROR) {
                console.error('ERROR: %s', msg);
            }
        }
    }

    function set_log_level(level) {
        var isSetLoglevel = (level == cadesplugin.LOG_LEVEL_DEBUG)
            || (level == cadesplugin.LOG_LEVEL_INFO)
            || (level == cadesplugin.LOG_LEVEL_ERROR);

        if (!isSetLoglevel) {
            cpcsp_console_log(cadesplugin.LOG_LEVEL_ERROR, 'cadesplugin_api.js: Incorrect log_level: ' + level);

            return;
        }

        cadesplugin.current_log_level = level;

        if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_DEBUG) {
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, 'cadesplugin_api.js: log_level = DEBUG');
        }

        if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_INFO) {
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, 'cadesplugin_api.js: log_level = INFO');
        }

        if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_ERROR) {
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, 'cadesplugin_api.js: log_level = ERROR');
        }

        if (isChromiumBased()) {
            if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_DEBUG) {
                window.postMessage('set_log_level=debug', '*');
            }

            if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_INFO) {
                window.postMessage('set_log_level=info', '*');
            }

            if (cadesplugin.current_log_level == cadesplugin.LOG_LEVEL_ERROR) {
                window.postMessage('set_log_level=error', '*');
            }
        }
    }

    function set_constantValues() {
        cadesplugin.CAPICOM_LOCAL_MACHINE_STORE = 1;
        cadesplugin.CAPICOM_CURRENT_USER_STORE = 2;
        cadesplugin.CAPICOM_MY_STORE = 'My';
        cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;
        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;
        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;
        cadesplugin.XmlDsigGost3410UrlObsolete = 'http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411';
        cadesplugin.XmlDsigGost3411UrlObsolete = 'http://www.w3.org/2001/04/xmldsig-more#gostr3411';
        cadesplugin.XmlDsigGost3410Url = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411';
        cadesplugin.XmlDsigGost3411Url = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411';
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
        var generator = generatorFunc(Array.prototype.slice.call(arguments, 1)),
            onFulfilled = continuer.bind(continuer, 'next'),
            onRejected = continuer.bind(continuer, 'throw');

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

        return onFulfilled();
    }

    function isIE() {
        return navigator.appName === 'Microsoft Internet Explorer' // IE < 11
            || navigator.userAgent.match(/Trident\/./i); // IE 11
    }

    function isIOS() {
        return navigator.userAgent.match(/ipod/i)
            || navigator.userAgent.match(/ipad/i)
            || navigator.userAgent.match(/iphone/i);
    }

    function isChromiumBased() {
        var retVal_chrome = navigator.userAgent.match(/chrome/i),

            // некоторых версиях IE8 с подключенным плагином chromeframe он определяется как
            // Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; chromeframe/29.0.1547.67;
            // и может попадать в ветку Chrome
            retVal_chromeframe = navigator.userAgent.match(/chromeframe/i);

        isOpera = navigator.userAgent.match(/opr/i);
        isYaBrowser = navigator.userAgent.match(/YaBrowser/i);

        if (retVal_chrome == null) {
            // В Firefox и IE работаем через NPAPI
            return false;
        } else {
            // В Chrome и Opera работаем через асинхронную версию
            if (retVal_chrome.length > 0 || isOpera != null) {
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
            return call_ru_cryptopro_npcades_10_native_bridge('CreateObject', [name]);
        }

        if (isIE()) {
            // В Internet Explorer создаются COM-объекты
            if (name.match(/X509Enrollment/i)) {
                try {
                    // Объекты CertEnroll создаются через CX509EnrollmentWebClassFactory
                    var objCertEnrollClassFactory = document.getElementById('certEnrollClassFactory');
                    return objCertEnrollClassFactory.CreateObject(name);
                } catch (e) {
                    throw(
                        'Для создания обьектов X509Enrollment следует настроить ' +
                        'веб-узел на использование проверки подлинности по протоколу HTTPS'
                    );
                }
            }

            // Объекты CAPICOM и CAdESCOM создаются через CAdESCOM.WebClassFactory
            try {
                var objWebClassFactory = document.getElementById('webClassFactory');

                return objWebClassFactory.CreateObject(name);
            } catch (e) {
                try {
                    // Для версий плагина ниже 2.0.12538
                    return new ActiveXObject(name);
                } catch (e) {
                    var mimetype = navigator.mimeTypes['application/x-cades'];

                    if (mimetype) {
                        if (mimetype.enabledPlugin) {
                            console.log(
                                'EDS:',
                                'Плагин КриптоПРО ЭЦП browser plug-in загружен,',
                                'но не создаются обьекты'
                            );
                        } else {
                            console.log('EDS:', 'Ошибка при загрузке плагина КриптоПРО ЭЦП browser plug-in');
                        }
                    } else {
                        console.log('EDS:', 'Плагин КриптоПРО ЭЦП browser plug-in недоступен');
                    }
                }
            }
        }

        // В Firefox, Safari создаются объекты NPAPI
        return pluginObject.CreateObject(name);
    }

    // Функция активации асинхронных объектов КриптоПро ЭЦП Browser plug-in
    function CreateObjectAsync(name) {
        return pluginObject.CreateObjectAsync(name);
    }

    // Функции для IOS
    var ru_cryptopro_npcades_10_native_bridge = {
        callbacksCount: 1,
        callbacks: {},

        // Automatically called by native layer when a result is available
        resultForCallback: function resultForCallback(callbackId, resultArray) {
            var callback = ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId];

            if (!callback) {
                return;
            }

            callback.apply(null, resultArray);
        },

        // Use this in javascript to request native objective-c code
        // functionName : string (I think the name is explicit :p)
        // args : array of arguments
        // callback : function with n-arguments that is going to be called when the native code returned
        call: function call(functionName, args, callback) {
            var hasCallback = callback && typeof callback == 'function',
                callbackId = hasCallback ? ru_cryptopro_npcades_10_native_bridge.callbacksCount++ : 0,
                iframe,
                arrObjs;

            if (hasCallback) {
                ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId] = callback;
            }

            iframe = document.createElement('IFRAME');

            arrObjs = new Array('_CPNP_handle');

            try {
                iframe.setAttribute(
                    'src',
                    'cpnp-js-call:' +
                    functionName + ':' + callbackId + ':' + encodeURIComponent(JSON.stringify(args, arrObjs))
                );
            } catch (e) {
                alert(e);
            }

            document.documentElement.appendChild(iframe);

            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
    };

    function call_ru_cryptopro_npcades_10_native_bridge(functionName, array) {
        var tmpobj,
            ex;

        ru_cryptopro_npcades_10_native_bridge.call(functionName, array, function (e, response) {
            ex = e;
            var str = 'tmpobj=' + response;

            eval(str);

            if (typeof (tmpobj) == 'string') {
                tmpobj = tmpobj.replace(/\\\n/gm, '\n');
                tmpobj = tmpobj.replace(/\\\r/gm, '\r');
            }
        });

        if (ex) {
            throw ex;
        }

        return tmpobj;
    }

    // Выводим окно поверх других с предложением установить расширение для Opera.
    // Если установленна переменная cadesplugin_skip_extension_install - не предлагаем установить расширение
    function install_opera_extension() {
        if (!window.cadesplugin_skip_extension_install) {
            document.addEventListener('DOMContentLoaded', function () {
                var ovr = document.createElement('div');

                ovr.id = 'cadesplugin_ovr';
                ovr.style = [
                    'visibility: hidden; position: fixed; left: 0px; top: 0px;',
                    'width:100%; height:100%; background-color: rgba(0,0,0,0.7)'
                ].join(' ');

                ovr.innerHTML = '\
                    <div id="cadesplugin_ovr_item" style="\
                        position:relative;\
                        width:400px;\
                        margin:100px auto;\
                        background-color:#fff;\
                        border:2px solid #000;\
                        padding:10px;\
                        text-align:center;\
                        opacity: 1;\
                        z-index: 1500\
                    ">\
                        <button id="cadesplugin_close_install"\
                        style="float: right; font-size: 10px; background: transparent; border: 1; margin: -5px">\
                        X\
                        </button>\
                        <p>\
                            Для работы КриптоПро ЭЦП Browser plugin на данном сайте необходимо установить\
                            расширение из каталога дополнений Opera.\
                        </p>\
                        <p><button id="cadesplugin_install" style="font:12px Arial">Установить расширение</button></p>\
                    </div>\
                ';

                document.getElementsByTagName('Body')[0].appendChild(ovr);

                var btn_install = document.getElementById('cadesplugin_install');

                btn_install.addEventListener('click', function (event) {
                    opr.addons.installExtension('epebfcehmdedogndhlcacafjaacknbcm',
                        function () {
                            document.getElementById('cadesplugin_ovr').style.visibility = 'hidden';
                            location.reload();
                        },
                        function () {}
                    );
                });

                document.getElementById('cadesplugin_close_install').addEventListener('click', function () {
                    plugin_loaded_error('Плагин недоступен');
                    document.getElementById('cadesplugin_ovr').style.visibility = 'hidden';
                });

                ovr.addEventListener('click', function () {
                    plugin_loaded_error('Плагин недоступен');
                    document.getElementById('cadesplugin_ovr').style.visibility = 'hidden';
                });

                ovr.style.visibility = 'visible';

                document.getElementById('cadesplugin_ovr_item').addEventListener('click', function (e) {
                    e.stopPropagation();
                });
            });
        } else {
            plugin_loaded_error('Плагин недоступен');
        }
    }

    function extension_onload() {
        window.postMessage('cadesplugin_echo_request', '*');

        window.addEventListener('message', function (event) {
            if (event.data != 'cadesplugin_loaded') {
                return;
            }

            cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
        }, false);
    }

    // Загружаем расширения для Chrome, Opera, YaBrowser
    function load_extension() {
        var fileref = document.createElement('script');

        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', 'chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js');
        fileref.onerror = plugin_loaded_error;
        fileref.onload = extension_onload;

        document.getElementsByTagName('head')[0].appendChild(fileref);

        fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', 'chrome-extension://epebfcehmdedogndhlcacafjaacknbcm/nmcades_plugin_api.js');
        fileref.onerror = plugin_loaded_error;
        fileref.onload = extension_onload;
        document.getElementsByTagName('head')[0].appendChild(fileref);
    }

    // Загружаем плагин для NPAPI
    function load_npapi_plugin() {
        var elem = document.createElement('object');

        elem.setAttribute('id', 'cadesplugin_object');
        elem.setAttribute('type', 'application/x-cades');
        elem.setAttribute('style', 'visibility=hidden');
        document.getElementsByTagName('body')[0].appendChild(elem);

        pluginObject = document.getElementById('cadesplugin_object');

        if (isIE()) {
            var elem1 = document.createElement('object');

            elem1.setAttribute('id', 'certEnrollClassFactory');
            elem1.setAttribute('classid', 'clsid:884e2049-217d-11da-b2a4-000e7bbb2b09');
            elem1.setAttribute('style', 'visibility=hidden');
            document.getElementsByTagName('body')[0].appendChild(elem1);

            var elem2 = document.createElement('object');
            elem2.setAttribute('id', 'webClassFactory');
            elem2.setAttribute('classid', 'clsid:B04C8637-10BD-484E-B0DA-B8A039F60024');
            elem2.setAttribute('style', 'visibility=hidden');

            document.getElementsByTagName('body')[0].appendChild(elem2);
        }
    }

    // Отправляем событие что все ок.
    function plugin_loaded() {
        plugin_resolved = 1;
        if (canPromise) {
            plugin_resolve();
        } else {
            window.postMessage('cadesplugin_loaded', '*');
        }
    }

    // Отправляем событие что сломались.
    function plugin_loaded_error(msg) {
        if (isChromiumBased()) {
            // в асинхронном варианте подключаем оба расширения, если сломались оба пробуем установить для Opera
            failed_extensions++;

            if (failed_extensions < 2) {
                return;
            }

            if (isOpera && (typeof(msg) == 'undefined' || typeof(msg) == 'object')) {
                install_opera_extension();
                return;
            }
        }

        if (typeof(msg) == 'undefined' || typeof(msg) == 'object') {
            msg = 'Плагин недоступен';
        }

        plugin_resolved = 1;

        if (canPromise) {
            plugin_reject(msg);
        } else {
            window.postMessage('cadesplugin_load_error', '*');
        }
    }

    // проверяем что у нас хоть какое то событие ушло, и если не уходило кидаем еще раз ошибку
    function check_load_timeout() {
        if (plugin_resolved == 1) {
            return;
        }

        plugin_resolved = 1;

        if (canPromise) {
            plugin_reject('Истекло время ожидания загрузки плагина');
        } else {
            window.postMessage('cadesplugin_load_error', '*');
        }

    }

    // Вспомогательная функция для NPAPI
    function createPromise(arg) {
        return new Promise(arg);
    }

    function check_npapi_plugin() {
        try {
            var oAbout = CreateObject('CAdESCOM.About');

            plugin_loaded();
        } catch (err) {
            document.getElementById('cadesplugin_object').style.display = 'none';
            // Объект создать не удалось, проверим, установлен ли
            // вообще плагин. Такая возможность есть не во всех браузерах
            var mimetype = navigator.mimeTypes['application/x-cades'];
            if (mimetype) {
                var plugin = mimetype.enabledPlugin;
                if (plugin) {
                    plugin_loaded_error('Плагин загружен, но не создаются обьекты');
                } else {
                    plugin_loaded_error('Ошибка при загрузке плагина');
                }
            } else {
                plugin_loaded_error('Плагин недоступен');
            }
        }
    }

    // Проверяем работает ли плагин
    function check_plugin_working() {
        if (isChromiumBased()) {
            load_extension();
        } else if (!canPromise) {
            window.addEventListener('message', function (event) {
                if (event.data != 'cadesplugin_echo_request') {
                    return;
                }

                load_npapi_plugin();
                check_npapi_plugin();
            }, false);
        } else {
            if (window.addEventListener) {
                window.addEventListener('load', function (event) {
                    load_npapi_plugin();
                    check_npapi_plugin();
                }, false);
            } else {
                load_npapi_plugin();
                check_npapi_plugin();
            }
        }
    }

    function set_pluginObject(obj) {
        pluginObject = obj;
    }

    // Export
    cadesplugin.JSModuleVersion = '2.0.2';
    cadesplugin.async_spawn = async_spawn;
    cadesplugin.set = set_pluginObject;
    cadesplugin.set_log_level = set_log_level;

    if (isChromiumBased()) {
        cadesplugin.CreateObjectAsync = CreateObjectAsync;
    }

    if (!isChromiumBased()) {
        cadesplugin.CreateObject = CreateObject;
    }

    if (window.cadesplugin_load_timeout) {
        setTimeout(check_load_timeout, window.cadesplugin_load_timeout);
    } else {
        /**
         * Даже при слабом интернете плагин успевает загрузиться
         * менее чем за секунду, тк отдается из кэша
         * */
        setTimeout(check_load_timeout, 20000);
    }

    set_constantValues();

    cadesplugin.current_log_level = cadesplugin.LOG_LEVEL_ERROR;

    window.cadesplugin = cadesplugin;

    check_plugin_working();
}());