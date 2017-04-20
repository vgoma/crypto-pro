var bowser = require('bowser/bowser'),
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

require('./cades');

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
        __webpack_public_path__ = CryptoProConfig.publicPath;
    }

    if (canPromise) {
        cadesplugin.then(
            function () {
                if (canAsync) {
                    require.ensure([], function () {
                        cryptoService = require('./apiAsync');
                        finishLoading();
                    });
                } else {
                    require.ensure([], function () {
                        cryptoService = require('./apiSync');
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