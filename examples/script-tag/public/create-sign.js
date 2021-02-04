/**
 * Пример создания подписи данных
 * */
;(function () {
  'use strict';

  var $createSignature = document.forms.createSignature,
    $certificate = document.getElementById('certificate'),
    $message = document.getElementById('message'),
    $messageFile = document.getElementById('messageFile'),
    $messageFileError = document.getElementById('messageFileError'),
    $hash = document.getElementById('hash'),
    $hashError = document.getElementById('hashError'),
    $signature = document.getElementById('signature'),
    $signatureError = document.getElementById('signatureError'),

    // https://support.cryptopro.ru/index.php?/Knowledgebase/Article/View/213/12/ogrnichenie-n-rzmer-podpisyvemogo-fjjl-v-bruzere
    MAX_FILE_SIZE = 25000000;

  function readFile(messageFile) {
    return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();

      fileReader.onload = function () {
        resolve(this.result);
      };

      if (messageFile.size > MAX_FILE_SIZE) {
        reject('Файл для подписи не должен превышать ' + MAX_FILE_SIZE / 1000000 + 'МБ');

        return;
      }

      fileReader.readAsArrayBuffer(messageFile);
    });
  }

  function createSignature(message, hash) {
    var thumbprint = $certificate.value,
      signatureType = document.querySelector('input[name="signatureType"]:checked').value,
      signaturePromise;

    $hash.value = hash;

    $signature.placeholder = 'Создается...';
    $signature.value = '';

    switch (signatureType) {
      case 'attached':
        signaturePromise = window.cryptoPro.createAttachedSignature(thumbprint, message);

        break;
      case 'xml':
        signaturePromise = window.cryptoPro.createXMLSignature(thumbprint, message);

        break;
      case 'detached':
        signaturePromise = window.cryptoPro.createDetachedSignature(thumbprint, hash);

        break;
    }

    signaturePromise.then(function (signature) {
      $signature.value = signature;
      $signatureError.textContent = '';
    }, function (error) {
      $signature.placeholder = 'Не создана';
      $signatureError.textContent = error.message;
    });
  }

  $message.addEventListener('keydown', function() {
    $messageFile.value = null;
  });

  if ($messageFile) {
    $messageFile.addEventListener('change', function() {
      $message.value = '';
    });
  }

  $createSignature.addEventListener('submit', function (event) {
    var messageFile = $messageFile && $messageFile.files.length && $messageFile.files[0],
      messagePromise = Promise.resolve($message.value);

    if (messageFile) {
      messagePromise = readFile(messageFile);
    }

    event.preventDefault();

    messagePromise.then(function (message) {
      $hash.placeholder = 'Вычисляется...';
      $hash.value = '';

      window.cryptoPro.createHash(message).then(createSignature.bind(null, message), function (hashError) {
        $hash.placeholder = 'Не вычислен';
        $hashError.textContent = hashError.message;
      });
    }, function (fileError) {
      $messageFileError.textContent = fileError;
    })
  });
})();
