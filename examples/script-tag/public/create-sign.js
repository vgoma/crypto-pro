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
      message = $message.value;

    event.preventDefault();

    $hash.placeholder = 'Вычисляется...';
    $hash.value = '';

    window.cryptoPro.createHash(message).then(function (hash) {
      var detachedSignature = document.querySelector('input[name="signatureType"]:checked').value,
        signaturePromise;

      detachedSignature = Boolean(Number(detachedSignature));

      $hash.value = hash;

      $signature.placeholder = 'Создается...';
      $signature.value = '';

      if (detachedSignature) {
        signaturePromise = window.cryptoPro.createDetachedSignature(thumbprint, hash);
      } else {
        signaturePromise = window.cryptoPro.createAttachedSignature(thumbprint, message);
      }

      signaturePromise.then(function (signature) {
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
