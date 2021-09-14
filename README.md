[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

<a name="cryptopro"></a>
# cryptoPro
Асинхронный JavaScript API для работы с КриптоПРО ЭЦП Browser Plug-In

> **Это форк проекта [vgoma/crypto-pro](https://github.com/vgoma/crypto-pro)**
>
> **API форка отличается от оригинала**: внимательно читайте README

| [![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/62.2.25/src/chrome/chrome_64x64.png)](https://www.chromium.org/getting-involved/download-chromium#TOC-Downloading-old-builds-of-Chrome-Chromium)       | [![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/62.2.25/src/firefox/firefox_64x64.png)](https://ftp.mozilla.org/pub/firefox/releases/)                                     | [![IE](https://raw.githubusercontent.com/alrra/browser-logos/62.2.25/src/archive/internet-explorer_9-11/internet-explorer_9-11_64x64.png)](https://www.microsoft.com/ru-ru/download/details.aspx?id=43374)     | [![Opera](https://raw.githubusercontent.com/alrra/browser-logos/62.2.25/src/opera/opera_64x64.png)](http://get.opera.com/ftp/pub/opera/desktop/)                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __v45+__ с расширением [CryptoPro Extension for CAdES Browser Plug-in](https://chrome.google.com/webstore/detail/cryptopro-extension-for-c/iifchhfnnmpdbibifmljnfjhpififfog?utm_source=chrome-app-launcher-info-dialog) | __v43+__. Начиная с версии 52, с [расширением](https://www.cryptopro.ru/sites/default/files/products/cades/extensions/cryptopro_extension_for_cades_browser_plug_in-1.1.1-an+fx-windows.xpi) | __v9+__ с установленным [КриптоПро ЭЦП Browser plug-in](https://www.cryptopro.ru/products/cades/plugin)                                                                                                        | __v40+__ с расширением [CryptoPro Extension for CAdES Browser Plug-in](https://addons.opera.com/en/extensions/details/cryptopro-extension-for-cades-browser-plug-in/) |

## Ошибка `Параметр задан неверно. (0x80070057)`
Если при попытке подписать сообщение с использованием PKCS#7 подписи падает такая ошибка, то читайте [этот issue](https://github.com/webmasterskaya/crypto-pro-js/issues/20) 

- [cryptoPro](#cryptopro)
    - [Зачем мне этот пакет?](#why)
    - [Установка](#install)
    - [API](#api)
        - [Методы объекта cryptoPro](#api-cryptopro)
        - [Методы объекта сертификата](#api-certificate)
    - [Поддерживаемые СКЗИ](#supported-cist)
    - [Примеры](#examples)
        - [Тэг script (UMD)](#example-script-tag)
- [Тем, кто хочет помочь](#developers)
    - [Запуск режима разработки](#dev-mode)
    - [Запуск тестов](#tests-execution)
    - [Проверка пакета перед публикацией в NPM](#final-check)
- [Лицензия](#lisense)

<a name="why"></a>
## Зачем мне этот пакет?
КриптоПРО ЭЦП Browser Plug-In доступен в разных браузерах в двух версиях.
Асинхронной (в современных браузерах) и синхронной (в браузерах постарше).
С помощью этого пакета можно не писать реализацию под каждую версию плагина дважды.

<a name="install"></a>
## Установка
Для NPM:
```bash
npm install crypto-pro-js
```

Для Yarn:
```bash
yarn add crypto-pro-js
```

Для Bower:
```bash
bower install webmasterskaya/crypto-pro-js
```

Подключение пакета как UMD модуля через тэг script:
```html
<script src="crypto-pro-js/dist/crypto-pro.min.js"></script>
<script>
window.cryptoPro.getUserCertificates()
  .then(function (certificates) {
    //...
  })
  .catch(function (error) {
    //...
  });
</script>
```

Подключение пакета как ES модуля с Typescript или JavaScript:
```typescript
import { getUserCertificates, Certificate } from 'crypto-pro-js';

(async () => {
  let certificates: Certificate[];

  try {
    certificates = await getUserCertificates();
  } catch(error) {
    // ...
  }
})();
```

Список требуемых полифиллов (если необходимы, подключаются самостоятельно):
- Promise
- Array.prototype.find

<a name="api"></a>
## API

<a name="api-cryptopro"></a>
### Методы объекта cryptoPro
- [getUserCertificates](src/api/getUserCertificates.ts) - возвращает список [сертификатов](#api-certificate), доступных пользователю в системе
- [getCertificate](src/api/getCertificate.ts) - возвращает [сертификат](#api-certificate) по отпечатку
- [createAttachedSignature](src/api/createAttachedSignature.ts) - создает совмещенную (присоединенную) подпись сообщения
- [createDetachedSignature](src/api/createDetachedSignature.ts) - создает отсоединенную (открепленную) подпись сообщения
- [addAttachedSignature](src/api/addAttachedSignature.ts) - добавляет совмещенную (присоединенную) подпись к раннее подписанному документу (реализует метод coSign)
- [addDetachedSignature](src/api/addDetachedSignature.ts) - добавляет отсоединенную (открепленную) подпись к раннее подписанному документу (реализует метод coSign)
- [createXMLSignature](src/api/createXMLSignature.ts) - создает XML подпись для документа в формате XML
- [createHash](src/api/createHash.ts) - создает хеш сообщения по ГОСТ Р 34.11-2012 256 бит
- [getSystemInfo](src/api/getSystemInfo.ts) - возвращает информацию о CSP и плагине
- [isValidSystemSetup](src/api/isValidSystemSetup.ts) - возвращает флаг корректности настроек ЭП на машине

<a name="api-certificate"></a>
### Методы объекта сертификата
[Сертификат](src/api/certificate/certificate.ts) предоставляет следущее API:
- [isValid](src/api/certificate/isValid.ts) - возвращает флаг действительности сертификата
- [getCadesProp](src/api/certificate/getCadesProp.ts) - возвращает указанное внутренее свойство у сертификата в формате Cades
- [exportBase64](src/api/certificate/exportBase64.ts) - возвращает сертификат в формате base64
- [getAlgorithm](src/api/certificate/getAlgorithm.ts) - возвращает информацию об алгоритме сертификата
- [getOwnerInfo](src/api/certificate/getInfo.ts) - возвращает расшифрованную информацию о владельце сертификата
- [getIssuerInfo](src/api/certificate/getInfo.ts) - возвращает расшифрованную информацию об издателе сертификата
- [getExtendedKeyUsage](src/api/certificate/getExtendedKeyUsage.ts) - возвращает ОИД'ы сертификата
- [getDecodedExtendedKeyUsage](src/api/certificate/getDecodedExtendedKeyUsage.ts) - возвращает расшифрованные ОИД'ы
- [hasExtendedKeyUsage](src/api/certificate/hasExtendedKeyUsage.ts) - проверяет наличие ОИД'а (ОИД'ов) у сертификата

<a name="supported-cist"></a>
## Поддерживаемые СКЗИ
[КриптоПРО CSP](https://www.cryptopro.ru/products/csp/downloads) (v4.0+)

<a name="examples"></a>
## Примеры
Для их запуска необходим NodeJS LTS.

<a name="example-script-tag"></a>
### Тэг script (UMD)
```bash
cd examples/script-tag
npm i
npm start
```

<a name="developers"></a>
# Тем, кто хочет помочь
Буду благодарен за расширение/улучшение/доработку API.
Вам будут полезны [примеры](http://cpdn.cryptopro.ru/?url=/content/cades/plugin-samples-sign.html),
предоставляемые Крипто ПРО.

<a name="dev-mode"></a>
## Запуск режима разработки
Устанавливаем зависимости:
```bash
npm i
```

Во время работы с кодом необходим запущенный сборщик:
```bash
npm start
```

И пример, на котором можно тестировать изменения.
Удобнее всего тестировать на примере с тэгом script, тк он отвязан от фреймворков
и использует сборку в формате UMD из папки `dist/`, постоянно обновляемую пока работает
сборщик. Запускаем его таким образом:
```bash
cd examples/script-tag
npm i
npm link ../../
npm start
```
> После выполнения `npm link ../../` в директории `examples/script-tag/node_modules` папка `crypto-pro-js` станет ярлыком,
> указывающим на папку содержащую локально собранный пакет.

<a name="tests-execution"></a>
## Запуск тестов
Тесты написаны с использованием [Jest](https://jestjs.io/docs/en/configuration#testpathignorepatterns-arraystring):
```bash
npm test
```

<a name="final-check"></a>
## Проверка пакета перед публикацией в NPM
Необходимо протестировать работу в заявленных браузерах, сделав это на локально запакованной версии пакета.
Для этого собираем пакет:
```bash
npm run package
mv package ..
```
> Важно переместить папку `package` куда-нибудь выше для избежания конфликтов при линковке с текущим `package.json`.

Переходим в любую директорию с примером и создаем там ссылку на только что собранный пакет:
```bash
cd examples/script-tag
npm link ../../../package
```

Проверяем работу примеров в режимах разработки и продакшн.

После завершения экспериментов можно удалить глобальную ссылку из директории `../../../package` таким образом:
```bash
cd ../../../package
npm unlink
```

<a name="lisense"></a>
# Лицензия
[MIT](/LICENSE)

[npm-url]: https://npmjs.org/package/crypto-pro-js
[npm-version-image]: https://img.shields.io/npm/v/crypto-pro-js.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/crypto-pro-js.svg?style=flat
[downloads-url]: https://npmcharts.com/compare/crypto-pro-js?minimal=true
[travis-url]: https://www.travis-ci.com/webmasterskaya/crypto-pro-js
[travis-image]: http://img.shields.io/travis/webmasterskaya/crypto-pro-js/master.svg?style=flat
[coveralls-image]: https://coveralls.io/repos/github/webmasterskaya/crypto-pro-js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/webmasterskaya/crypto-pro-js?branch=master
