/**
 * Пример создания подписи данных, сгенерированных по ГОСТ Р 34.11-94
 * https://ru.wikipedia.org/wiki/%D0%93%D0%9E%D0%A1%D0%A2_%D0%A0_34.11-94
 * */
;(function () {
  'use strict';

  var $errorMsg = document.getElementById('errorMessage');

  document
    .getElementById('createSign')
    .addEventListener('click', function () {
      // Вычислинный hash по ГОСТ Р 34.11-94 для строки: "abc"
      var hash = 'b285056dbf18d7392d7677369524dd14747459ed8143997e163b2986f92fd42c',
        hashBase64 = window.btoa(hash),
        thumbprint = document.getElementById('certList').value;

      window.cryptoPro.createSignature(thumbprint, hashBase64).then(function (signature) {
        document.getElementById('createdSign').value = signature;

        window.cryptoPro.validateSignature(hashBase64, signature).then(function (isValid) {
          console.log(isValid);
        }, function (error) {
          $errorMsg.textContent = '\n' + error.message;
        });
      }, function (error) {
        $errorMsg.textContent = '\n' + error.message;
      });
    });
})();
