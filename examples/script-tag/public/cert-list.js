/**
 * Пример получения списка сертификатов
 * */
;(function () {
  'use strict';

  var $certs = document.getElementById('certList'),
    $errorMsg = document.getElementById('errorMessage');

  window.cryptoPro.getUserCertificates()
    .then(function (certificateList) {
      certificateList.forEach(function (certificate) {
        var $certOption = document.createElement('option');

        $certOption.textContent = certificate.name + ' (действителен до: ' + certificate.validTo + ')';

        $certOption.value = certificate.thumbprint;

        $certs.appendChild($certOption);
      });
    }, function (error) {
      $errorMsg.textContent = '\n' + error.message;
    });
})();
