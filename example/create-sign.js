;(function () {
    'use strict';

    /**
     * Пример создания подписи данных, сгенерированных по ГОСТ Р 34.11-94
     * https://ru.wikipedia.org/wiki/%D0%93%D0%9E%D0%A1%D0%A2_%D0%A0_34.11-94
     * */
    var $certs = document.querySelector('#certList'),
        $createSignBtn = document.querySelector('#createSign'),
        $signatureCnt = document.querySelector('#createdSign'),

        // Вычислинный hash по ГОСТ Р 34.11-94 для строки: "abc"
        hash = 'b285056dbf18d7392d7677369524dd14747459ed8143997e163b2986f92fd42c',

        hashBase64 = window.btoa(hash);

    $createSignBtn.addEventListener('click', function () {
        var thumbprint = $certs.value;

        window.CryptoPro.call('signData', thumbprint, hashBase64).then(function (signature) {
            $signatureCnt.value = signature;
        });
    });
}());