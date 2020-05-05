/**
 * Пример создания подписи данных
 * */
;(function () {
  'use strict';

  var $createSignature = document.forms.createSignature,
    $certificate = document.getElementById('certificate'),
    $message = document.getElementById('message'),
    $hash = document.getElementById('hash'),
    $hashError = document.getElementById('hashError'),
    $signature = document.getElementById('signature'),
    $signatureError = document.getElementById('signatureError');

  $createSignature.addEventListener('reset', function () {
    window.location.reload();
  });

  $createSignature.addEventListener('submit', function (event) {
    var thumbprint = $certificate.value,
      message = $message.value,
      hashingAlgorithm = document.querySelector('input[name="hashingAlgorithm"]:checked').value;

    event.preventDefault();

    $hash.placeholder = 'Вычисляется...';
    $hash.value = '';

    window.cryptoPro.createHash(message, hashingAlgorithm).then(function (hash) {
      var detachedSignature = document.querySelector('input[name="signatureType"]:checked').value;

      detachedSignature = Boolean(Number(detachedSignature));

      $hash.value = hash;

      $signature.placeholder = 'Создается...';
      $signature.value = '';

      window.cryptoPro.createSignature(thumbprint, hash, detachedSignature).then(function (signature) {
        $signature.value = signature;
      }, function (error) {
        $signature.placeholder = 'Не создана';

        $signatureError.textContent = '\n' + error.message;
      });
    }, function (error) {
      $hash.placeholder = 'Не вычислен';

      $hashError.textContent = '\n' + error.message;
    });
  });
})();
