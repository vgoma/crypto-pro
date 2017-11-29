var bowser = require('bowser/bowser');
var oids = require('./oids');

var subjectNameTagsTranslations = [
        {possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя'},
        {possibleNames: ['CN'], translation: 'Владелец'},
        {possibleNames: ['SN'], translation: 'Фамилия'},
        {possibleNames: ['G'], translation: 'Имя Отчество'},
        {possibleNames: ['C'], translation: 'Страна'},
        {possibleNames: ['S'], translation: 'Регион'},
        {possibleNames: ['STREET'], translation: 'Адрес'},
        {possibleNames: ['O'], translation: 'Компания'},
        {possibleNames: ['OU'], translation: 'Отдел/подразделение'},
        {possibleNames: ['T'], translation: 'Должность'},
        {possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН'},
        {possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП'},
        {possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС'},
        {possibleNames: ['ИНН', 'INN'], translation: 'ИНН'},
        {possibleNames: ['E'], translation: 'Email'},
        {possibleNames: ['L'], translation: 'Город'}
    ],

    issuerNameTagsTranslations = [
        {possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя'},
        {possibleNames: ['CN'], translation: 'Удостоверяющий центр'},
        {possibleNames: ['S'], translation: 'Регион'},
        {possibleNames: ['C'], translation: 'Страна'},
        {possibleNames: ['STREET'], translation: 'Адрес'},
        {possibleNames: ['O'], translation: 'Компания'},
        {possibleNames: ['OU'], translation: 'Тип'},
        {possibleNames: ['T'], translation: 'Должность'},
        {possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН'},
        {possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП'},
        {possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС'},
        {possibleNames: ['ИНН', 'INN'], translation: 'ИНН'},
        {possibleNames: ['E'], translation: 'Email'},
        {possibleNames: ['L'], translation: 'Город'}
    ];

function execute(cb) {
    if (cadesplugin.CreateObjectAsync) {
        var GeneratorFunction = (new Function('', 'return Object.getPrototypeOf(function*(){}).constructor'))();
        
        cb = String(cb);
        
        var args = cb.match(/^function\s*?\((.*?)\)/);
        
        args = (args && args[1]) || ''; 
        
        cb = cb.replace(/^.*?{([\s\S]*?)}$/, '$1');

        cb = String(new GeneratorFunction(args, cb));

        cb = cb.replace(/cryptoCommon\.createObj(\([\s\S]*?\))/gm, 'cadesplugin.CreateObjectAsync$1');
        cb = cb.replace(/("|')(yield)(\1)\s*?\+\s*?\b/gm, '$2 ');

        return 'cadesplugin.async_spawn(' + cb + ');';
    }
}

/**
 * Парсит информацию из строки с информацией о сертификате
 * */
function parseCertInfo(tags, infoString) {
    /**
     * Пример входной строки:
     *

     T=Генеральный директор, UnstructuredName="INN=7811514257/KPP=781101001/OGRN=1127847087884",
     STREET="Крыленко, д.3, лит.Б", CN=Король Анатолий Евгеньевич, G=Анатолий Евгеньевич, SN=Король,
     OU=Администрация, O="ООО ""Аксиома""", L=Санкт-Петербург, S=78 г. Санкт-Петербург, C=RU, E=korol@sferasro.ru,
     INN=007811514257, OGRN=1127847087884, SNILS=11617693460

     * */
    var result = infoString.match(/([а-яА-Яa-zA-Z0-9\.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);

    if (result) {
        result = result.map(function (group) {
            /**
             * Пример входной строки:
             *

             UnstructuredName="INN=7811514257/KPP=781101001/OGRN=1127847087884",

             * */
            var parts = group.match(/^([а-яА-Яa-zA-Z0-9\.]+)=(.+?),?$/),
                title = parts && parts[1],
                descr = parts && parts[2],
                translated = false,
                oidTitle;

            // Если тайтл содержит ОИД, пытаемся расшифровать
            if (/^OID./.test(title)) {
                oidTitle = title.match(/^OID\.(.*)/);

                if (oidTitle && oidTitle[1]) {
                    oidTitle = oids[oidTitle[1]];

                    if (oidTitle) {
                        title = oidTitle;
                    }
                }
            }

            // Вырезаем лишние кавычки
            descr = descr.replace(/^"(.*)"/, '$1');
            descr = descr.replace(/"{2}/g, '"');

            tags.some(function (tag) {
                return tag.possibleNames.some(function (possible) {
                    var match = possible === title;

                    if (match) {
                        title = tag.translation;
                        translated = true;
                    }

                    return match;
                });
            });

            return {
                title: title,
                descr: descr,
                translated: translated
            };
        });
    }

    return result;
}

/**
 * Возвращает дату в формате (dd.mm.yyyy hh:mm:ss) из строки, формата, используемого плагином cryptoPro
 * */
function getReadableDate(date) {
    date = new Date(date);

    return ([
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
    ].join('.') + ' ' + [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].join(':')).replace(/\b(\d)\b/g, '0$1');
}

/**
 * Преобразует дату для IE
 * */
function getDateObj(dateObj) {
    return bowser.msie ? dateObj.getVarDate() : dateObj;
}

/**
 * Подготавливает информацию о сертификатах
 * */
function prepareCertsInfo(items) {
    return items.map(function (c) {
        c.name = c.subjectName.match(/CN=(.+?),/);

        // Удалось ли вытащить Common Name
        if (c.name && c.name[1]) {
            c.name = c.name[1];
        }

        c.validFrom = getReadableDate(c.validFrom);
        c.validTo = getReadableDate(c.validTo);

        c.label = c.name + ' (до ' + c.validTo + ')';

        return c;
    });
}

/**
 * Возвращает расшифрованные ОИД'ы
 * */
function getDecodedExtendedKeyUsage() {
    var that = this;

    return new Promise(function (resolve) {
        that.getExtendedKeyUsage().then(function (certOids) {
            resolve(certOids.reduce(function (oidsLst, oid) {
                oid = {
                    id: oid,
                    descr: oids[oid] || null
                };

                if (oid.descr) {
                    oidsLst.unshift(oid);
                } else {
                    oidsLst.push(oid);
                }

                return oidsLst;
            }, []));
        });
    });
}

/**
 * Проверка наличия ОИД'а(ОИД'ов) у сертификата
 *
 * @param {String|Array} oids - ОИД'ы для проверки
 * @returns {Promise} с отложенным результатом типа {Boolean}
 * */
function hasExtendedKeyUsage(oids) {
    var that = this;

    return new Promise(function (resolve) {
        that.getExtendedKeyUsage().then(function (certOids) {
            var result;

            if (Array.isArray(oids)) {
                result = oids.every(function (oidToCheck) {
                    return certOids.some(function (certOid) {
                        return certOid === oidToCheck;
                    });
                });
            } else {
                result = certOids.some(function (certOid) {
                    return certOid === oids;
                });
            }

            resolve(result);
        });
    });
}

/**
 * Выводит информацию о системе пользователя
 * */
function getEnvInfo() {
    var parsed = bowser._detect(navigator.userAgent),
        info = {
            browserName: parsed.name,
            browserVersion: parsed.version
        };

    if (parsed.mac) {
        info.os = 'Mac';
    } else if (parsed.windows) {
        info.os = 'Windows';
    } else if (parsed.linux) {
        info.os = 'Linux';
    }

    return info;
}

/**
 * Подходящая ли версия CSP
 * */
function isValidCSPVersion(version) {
    version = version.match(/\d+?\b(?:\.\d+)?/);

    return version >= 3.6;
}

/**
 * Подходящая ли версия cades плагина
 * */
function isValidCadesVersion(version) {
    version = version.split('.').reduce(function (verInfo, number, i) {
        if (i === 0) {
            verInfo.major = number;
        } else if (i === 1) {
            verInfo.minor = number;
        } else if (i === 2) {
            verInfo.patch = number;
        }

        return verInfo;
    }, {});

    if (version.major < 2) {
        return false;
    }

    return version.patch >= 12438;
}

module.exports = {
    execute: execute,
    subjectNameTagsTranslations: subjectNameTagsTranslations,
    issuerNameTagsTranslations: issuerNameTagsTranslations,
    parseCertInfo: parseCertInfo,
    getReadableDate: getReadableDate,
    getDateObj: getDateObj,
    prepareCertsInfo: prepareCertsInfo,
    getDecodedExtendedKeyUsage: getDecodedExtendedKeyUsage,
    hasExtendedKeyUsage: hasExtendedKeyUsage,
    getEnvInfo: getEnvInfo,
    isValidCSPVersion: isValidCSPVersion,
    isValidCadesVersion: isValidCadesVersion
};