require('./vendor/cadesplugin_api');

var global = Function('return this')(),
    canPromise = Boolean(global.Promise),
    cadesplugin = global.cadesplugin,
    cryptoService = require('./api'),
    errorMsg = '',
    loadedPlugin = false,
    onLoadCallbacs = [],

    execOnloadQueue = function execOnloadQueue() {
        onLoadCallbacs.forEach(function (callback) {
            callback();
        });
    },

    passToWaitOnLoad = function passToWaitOnLoad(callback) {
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            onLoadCallbacs.push(callback);
        }
    },

    callOnLoad = function callOnLoad(method) {
        loadedPlugin ? method() : passToWaitOnLoad(method);
    },

    finishLoading = function finishLoading() {
        loadedPlugin = true;

        execOnloadQueue();
    },

    call = function call() {
        var args = Array.prototype.slice.call(arguments),
            methodName = args.shift();

        return new Promise(function (resolve, reject) {
            callOnLoad(function () {
                var method;

                if (errorMsg) {
                    reject(errorMsg);
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
    };

if (cadesplugin) {
    // Уровень отладки (LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, LOG_LEVEL_ERROR)
    cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);

    if (canPromise) {
        cadesplugin.then(finishLoading, function () {
            errorMsg = 'КриптоПРО ЭЦП Browser Plug-In не доступен';
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