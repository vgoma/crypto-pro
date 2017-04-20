;(function () {
    'use strict';

    var $certs = document.querySelector('#certList');

    /**
     * Пример получения списка сертификатов
     * */
    window.CryptoPro.call('getCertsList').then(function (list) {
        list.forEach(function (cert) {
            var $certOption = document.createElement('option');

            if (typeof $certOption.textContent !== 'undefined') {
                $certOption.textContent = cert.label;
            } else {
                $certOption.innerText = cert.label;
            }

            $certOption.value = cert.thumbprint;

            $certs.appendChild($certOption);
        });
    }, function (error) {
        console.error(error);
    });
}());