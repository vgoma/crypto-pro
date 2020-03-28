/**
 * Пример получения сведений о системе
 */
;(function () {
  'use strict';

  var $errorMsg = document.getElementById('errorMessage');

  window.cryptoPro.getSystemInfo().then(function (systemInfo) {
    window.cryptoPro.isValidSystemSetup().then(function (isValidSystemSetup) {
      systemInfo.isValidSystemSetup = isValidSystemSetup;

      document.getElementById('systemInfo').textContent = JSON.stringify(systemInfo, null, '  ');
    }, function (error) {
      $errorMsg.textContent = '\n' + error.message;
    });
  }, function (error) {
    $errorMsg.textContent = '\n' + error.message;
  });
})();
