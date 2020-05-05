/**
 * Пример получения сведений о системе
 */
;(function () {
  'use strict';

  var $systemInfo = document.getElementById('systemInfo'),
    $systemInfoError = document.getElementById('systemInfoError');

  window.cryptoPro.getSystemInfo().then(function (systemInfo) {
    window.cryptoPro.isValidSystemSetup().then(function (isValidSystemSetup) {
      systemInfo.isValidSystemSetup = isValidSystemSetup;

      $systemInfo.textContent = JSON.stringify(systemInfo, null, '  ');
    }, handleError);
  }, handleError);

  function handleError(error) {
    $systemInfoError.textContent = '\n' + error.message;
  }
})();
