## CryptoPro

Единое, асинхронное API для взаимодействия с КриптоПРО ЭЦП Browser Plug-In (IE8+)

``` js
CryptoService.call('getCertsList').then(function (certList) {
    console.log(certList);
});
```

Для работы с библиотекой, хост, с которого работает скрипт необходимо добавить
в доверенные узлы с помощью настроек КриптоПРО ЭЦП Browser Plug-In.

Полифиллы необходимо подключать самостоятельно.

### License
Licensed as MIT. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
