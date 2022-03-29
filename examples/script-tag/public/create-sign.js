/**
 * Пример создания подписи данных
 * */
;(function() {
  "use strict";

  cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_DEBUG);

  var $createSignature = document.forms.createSignature,
    $certificate = document.getElementById("certificate"),
    $message = document.getElementById("message"),
    $signedMessage = document.getElementById("signedMessage"),
    $messageFile = document.getElementById("messageFile"),
    $signatureFile = document.getElementById("signatureFile"),
    $messageFileError = document.getElementById("messageFileError"),
    $signatureFileError = document.getElementById("signatureFileError"),
    $hash = document.getElementById("hash"),
    $downloadSignature = document.getElementById("downloadSignature"),
    $hashError = document.getElementById("hashError"),
    $signature = document.getElementById("signature"),
    $signatureError = document.getElementById("signatureError"),

    // https://support.cryptopro.ru/index.php?/Knowledgebase/Article/View/213/12/ogrnichenie-n-rzmer-podpisyvemogo-fjjl-v-bruzere
    MAX_FILE_SIZE = 25000000;

  function readFile(messageFile) {
    return new Promise(function(resolve, reject) {
      var fileReader = new FileReader();

      fileReader.onload = function() {
        resolve(this.result);
      };

      if (messageFile.size > MAX_FILE_SIZE) {
        reject("Файл для подписи не должен превышать " + MAX_FILE_SIZE / 1000000 + "МБ");

        return;
      }

      fileReader.readAsArrayBuffer(messageFile);
    });
  }

  function createSignature(message, signedMessage, hash) {
    var thumbprint = $certificate.value,
      signatureType = document.querySelector("input[name=\"signatureType\"]:checked").value,
      signaturePromise;

    $hash.value = hash;

    $signature.placeholder = "Создается...";
    $signature.value = "";

    switch (signatureType) {
      case "attached":
        if (signedMessage) {
          signaturePromise = window.cryptoPro.addAttachedSignature(thumbprint, signedMessage, hash);
        } else {
          signaturePromise = window.cryptoPro.createAttachedSignature(thumbprint, message);
        }

        break;
      case "xml":
        signaturePromise = window.cryptoPro.createXMLSignature(thumbprint, message);

        break;
      case "detached":
        if (signedMessage) {
          signaturePromise = window.cryptoPro.addDetachedSignature(thumbprint, signedMessage, message);
        } else {
          signaturePromise = window.cryptoPro.createDetachedSignature(thumbprint, hash);
        }

        break;
    }

    signaturePromise.then(function(signature) {
      $signature.value = signature;
      $signatureError.textContent = "";
      $downloadSignature.disabled = false;
    }, function(error) {
      $signature.placeholder = "Не создана";
      $signatureError.textContent = error.message;
    });
  }

  $message.addEventListener("keydown", function() {
    $messageFile.value = null;
  });

  $downloadSignature.addEventListener("click", function() {
    var name = $messageFile.value.name;
    var signatureType = document.querySelector("input[name=\"signatureType\"]:checked").value;
    switch (signatureType) {
      case 'detached':
        name += '.sgn';
        break
      case 'attached':
        name += ".sig";
        break
      default:
        throw new Error('unknown signature type');
    }
    var resultSignFile = stringToFile($signature.value, name, 'application/pgp-signature');

    const url = window.URL.createObjectURL(resultSignFile);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });

  if ($messageFile) {
    $messageFile.addEventListener("change", function() {
      $message.value = "";
    });
  }

  if ($signatureFile) {
    $signatureFile.addEventListener("change", function() {
      $signedMessage.value = "";
    });
  }

  function stringToFile(str, name, type) {
    str = str.replace('\n', '');
    str = atob(str);
    const bufView = new Uint8Array(str.length);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return new File([bufView], name, { type });
  }

  $createSignature.addEventListener("submit", function(event) {
    var messageFile = $messageFile && $messageFile.files.length && $messageFile.files[0],
      signatureFile = $signatureFile && $signatureFile.files.length && $signatureFile.files[0],
      messagePromise = Promise.resolve($message.value),
      signaturePromise = Promise.resolve($signedMessage.value);

    if (messageFile) {
      messagePromise = readFile(messageFile).catch(function(fileError) {
        $messageFileError.textContent = fileError;
      });
    }

    if (signatureFile) {
      signaturePromise = readFile(signatureFile).catch(function(signatureError) {
        $signatureFileError.textContent = signatureError;
      });
    }

    event.preventDefault();

    Promise.all([messagePromise, signaturePromise]).then(function([message, signedMessage]) {
      $hash.placeholder = "Вычисляется...";
      $hash.value = "";

      window.cryptoPro.createHash(message).then(function(hash) {
        return createSignature(message, signedMessage, hash);
      }, function(hashError) {
        $hash.placeholder = "Не вычислен";
        $hashError.textContent = hashError.message;
      });
    });
  });
})();
