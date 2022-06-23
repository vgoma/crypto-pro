/**
 * Пример получения списка сертификатов
 * */
;(function () {
  'use strict';

  var $certificate = document.getElementById('certificate'),
    $createSignature = document.getElementById('createSignature'),
    $certificateDetails = document.getElementById('certificateDetails'),
    $certificateError = document.getElementById('certificateListError');

  $certificate.addEventListener('change', function handleCertSelection() {
    var thumbprint = $certificate.value;

    $createSignature.disabled = !thumbprint;
    $certificateDetails.style.display = thumbprint ? 'block' : 'none';
  });

  window.cryptoPro.getCertificates().then(function (certificateList) {
    certificateList.forEach(function (certificate) {
      var $certOption = document.createElement('option');

      $certOption.textContent = certificate.name + ' (действителен до: ' + certificate.validTo + ')';
      $certOption.value = certificate.thumbprint;

      $certificate.appendChild($certOption);
    });
  }, function (error) {
    $certificateError.textContent = error.message;
  });
})();
