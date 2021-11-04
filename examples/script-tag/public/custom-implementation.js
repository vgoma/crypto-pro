/**
 * Пример написания своей реализации используя Cades плагин
 */
;(function () {
  'use strict';

  function customAboutImplementation() {
    // Crypto-Pro GOST R 34.10-2001 Cryptographic Service Provider
    var providerType = 75;

    return window.cryptoPro.execute(function (utils) {
      return eval(
        utils._generateCadesFn(function getVersion() {
          var cadesAbout, cadesVersion, minor, major, build, version, providerName;

          try {
            cadesAbout = utils.__cadesAsyncToken__ + utils.__createCadesPluginObject__('CAdESCOM.About');
            providerName = utils.__cadesAsyncToken__ + cadesAbout.CSPName();
            cadesVersion = utils.__cadesAsyncToken__ + cadesAbout.CSPVersion(providerName, providerType);
            minor = utils.__cadesAsyncToken__ + cadesVersion.MinorVersion;
            major = utils.__cadesAsyncToken__ + cadesVersion.MajorVersion;
            build = utils.__cadesAsyncToken__ + cadesVersion.BuildVersion;
            version = utils.__cadesAsyncToken__ + cadesVersion.toString();
          } catch (error) {
            console.error(error);

            throw new Error(utils._extractMeaningfulErrorMessage(error) || 'Ошибка при извлечении информации');
          }

          return [
            providerName,
            [major, minor, build].join('.'),
            version
          ].join(', ');
        })
      );
    });
  }

  customAboutImplementation().then(function (systemInfo) {
    var $customSystemInfo = document.getElementById('customSystemInfo');

    $customSystemInfo.textContent = systemInfo;
  }, function (error) {
    var $customSystemInfoError = document.getElementById('customSystemInfoError');

    $customSystemInfoError.textContent = error.message;
  });
})();
