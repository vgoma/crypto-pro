# CryptoPro
Единое, асинхронное API для взаимодействия с КриптоПРО ЭЦП Browser Plug-In (IE8+)

## Поддерживаемые браузеры
- [Google Chrome](https://www.google.ru/chrome/browser/desktop/) (v45+) с расширением [CryptoPro Extension for CAdES Browser Plug-in](https://chrome.google.com/webstore/detail/cryptopro-extension-for-c/iifchhfnnmpdbibifmljnfjhpififfog?utm_source=chrome-app-launcher-info-dialog)
- [Opera](https://www.google.ru/chrome/browser/desktop/) (v40+) с расширением [CryptoPro Extension for CAdES Browser Plug-in](https://addons.opera.com/en/extensions/details/cryptopro-extension-for-cades-browser-plug-in/)
- [Mozilla Firefox](https://www.mozilla.org/ru/firefox/new/) (v43+). Начиная с версии 52, с [расширением](https://www.cryptopro.ru/sites/default/files/products/cades/extensions/cryptopro_extension_for_cades_browser_plug_in-1.1.1-an+fx-windows.xpi).
- [Internet Explorer](http://windows.microsoft.com/ru-ru/internet-explorer/download-ie) (v8+).

Список необходимых полифиллов (подключаются самостоятельно):
- Promise
- EventTarget.addEventListener
- Array.prototype.forEach
- Array.prototype.map

## Установка и настройка
```bash
npm install crypto-pro
```

Для корректной работы используйте:
1. [КриптоПРО CSP](https://www.cryptopro.ru/products/csp/downloads) (v3.6+) *рекомендуется использование только сертифицированных версий*. Инструкция по установке:
    - [Linux / OSX](#install_csp_linux)
    - (в Windows следуйте указаниям программы-установщика)
1. [КриптоПРО ЭЦП browser plug-in](https://www.cryptopro.ru/products/cades/plugin) (v1.5+). Инструкция по установке:
   - [Linux](#install_plugin_linux)
   - (в Windows и OSX следуйте указаниям программы-установщика)

Затем установите необходимые сертификаты в систему. [Инструкция](#install_cert_linux) для Linux / OSX.

### <a name="install_csp_linux"></a> Установка КриптоПРО CSP в Linux / OSX 
> Процесс установки в OSX незначительно отличается от Linux, поэтому описание приведено на примере дистрибутива семейства Debian (x64).  

Некоторые команды могут потребовать запуска с `sudo`.
Названия файлов и директорий могут отличаться из-за различий в версиях.

После загрузки [КриптоПРО CSP](https://www.cryptopro.ru/products/csp/downloads) для нужной платформы, распакуйте архив:
```bash
tar -xzvf linux-amd64_deb.tgz
chmod 777 -R linux-amd64_deb/
```

Запустите скрипт установки:
```bash
linux-amd64_deb/install.sh
```

Проверьте **отсутствие** `cprocsp-rdr-gui`:
```bash
dpkg -l | grep cprocsp-rdr
```

Установите дополнительно `cprocsp-rdr-gui-gtk`:
```bash
dpkg -i linux-amd64_deb/cprocsp-rdr-gui-gtk-64_4.0.0-4_amd64.deb
```

[Дополнительная информация по установке](https://www.cryptopro.ru/faq/gde-vzyat-dokumentatsiyu-po-ustanovke-kakie-pakety-stavit)

### <a name="install_plugin_linux"></a> Установка КриптоПРО ЭЦП browser plug-in в Linux
Загрузите [КриптоПРО ЭЦП browser plug-in](https://www.cryptopro.ru/products/cades/plugin) и распакуйте его:
```bash
mkdir cades_linux_amd64
tar -xzvf cades_linux_amd64.tar.gz -C cades_linux_amd64
```

Сконвертируйте `rpm` в `deb` пакеты при помощи утилиты `alien`:
```bash
apt-get update && apt-get install alien
cd cades_linux_amd64
alien *
```

Установите пакеты:
```bash
dpkg -i cprocsp-pki-cades_2.0.0-2_amd64.deb
dpkg -i cprocsp-pki-plugin_2.0.0-2_amd64.deb
```

Проверьте наличие файлов плагина:
```bash
ls -la /opt/cprocsp/lib/amd64 | grep libnpcades

    lrwxrwxrwx 1 root root      19 Окт 21 12:33 libnpcades.so -> libnpcades.so.2.0.0
    lrwxrwxrwx 1 root root      19 Окт 21 12:33 libnpcades.so.2 -> libnpcades.so.2.0.0
    -rwxr-xr-x 1 root root 2727236 Июн  8 14:33 libnpcades.so.2.0.0
```

#### Настройка плагина для Firefox (до версии 52):
> После настройки плагина на страницах, запрашивающих работу с ЭП в панели навигации, рядом с url будет кнопка,
  позволяющая "разрешить и запомнить" использование установленного плагина.

```bash
cd /usr/lib/mozilla/plugins

cp /opt/cprocsp/lib/amd64/libnpcades.so.2.0.0 ./
ldd libnpcades.so.2.0.0

cp /opt/cprocsp/lib/amd64/libnpcades.so.2.0.0 ./libnpcades.so
ldd libnpcades.so
```
Перезапустите Firefox, и убедитесь в наличии CryptoPRO Cades plugin (см. Menu -> Addons).

### <a name="install_cert_linux"></a> Установка сертификатов в Linux
> В OSX процесс схож с Linux.

Подключите USB носитель с ключевыми контейнерами и проверьте результат команды:
```bash
/opt/cprocsp/bin/amd64/csptest -keyset -enum_cont -fqcn -verifyc

    CSP (Type:80) v4.0.9009 KC1 Release Ver:4.0.9797 OS:Linux CPU:AMD64 FastCode:READY:AVX.
        AcquireContext: OK. HCRYPTPROV: 16188003
        \\.\FLASH\ivanov
        \\.\FLASH\petrov
        \\.\FLASH\sidorov
        \\.\FLASH\vasiliev
        \\.\FLASH\smirnov
        OK.
        Total: SYS: 0,020 sec USR: 0,060 sec UTC: 0,180 sec
```

Скопируйте ключевой контейнер `\\.\FLASH\.\sidorov` на жесткий диск:
```bash
/opt/cprocsp/bin/amd64/csptest -keycopy -contsrc '\\.\FLASH\sidorov' -contdest '\\.\HDIMAGE\sidor'

    CSP (Type:80) v4.0.9009 KC1 Release Ver:4.0.9797 OS:Linux CPU:AMD64 FastCode:READY:AVX.
    CryptAcquireContext succeeded.HCRYPTPROV: 38556259
    CryptAcquireContext succeeded.HCRYPTPROV: 38770755
    Total: SYS: 0,000 sec USR: 0,100 sec UTC: 14,920 sec
    [ErrorCode: 0x00000000]
```
> Наличие [ErrorCode: 0x00000000] в завершении каждой команды КриптоПРО говорит о ее успешном выполнении.

Проверьте наличие нового контейнера `\\.\HDIMAGE\sidor`:
```bash
/opt/cprocsp/bin/amd64/csptest -keyset -enum_cont -fqcn -verifyc

    CSP (Type:80) v4.0.9009 KC1 Release Ver:4.0.9797 OS:Linux CPU:AMD64 FastCode:READY:AVX.
    AcquireContext: OK. HCRYPTPROV: 34554467
    \\.\FLASH\ivanov
    \\.\FLASH\petrov
    \\.\FLASH\sidorov
    \\.\FLASH\vasiliev
    \\.\FLASH\smirnov
    \\.\HDIMAGE\sidor
    OK.
    Total: SYS: 0,010 sec USR: 0,050 sec UTC: 0,130 sec
    [ErrorCode: 0x00000000]
```

Установите личный сертификат:
```bash
/opt/cprocsp/bin/amd64/certmgr -inst -cont '\\.\HDIMAGE\sidor'
```
> Возможно в выводе вы ссылку на сертификат УЦ

При необходимости загрузите сертификат удостоверяющего центра и установите его командой:
```bash
/opt/cprocsp/bin/amd64/certmgr -inst -store uroot -file <файл сертификата>.crt
```

После чего, при проверке установленного личного сертификата вы увидите `PrivateKey Link: Yes`:
```bash
/opt/cprocsp/bin/amd64/certmgr -list -store uMy
```

## API
Пример работы с API лежит в папке `example`.

``` js
window.CryptoPro.call('getCertsList').then(function (certList) {
    console.log(certList);
});
```

### Доступные методы
Список доступных методов можно посмотреть в файле `src/apiAsync.js`.

### License
Licensed as MIT. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
