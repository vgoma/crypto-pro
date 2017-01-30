var cryptoCommon = require('./common'),
    cryptoConstants = require('./constants'),

    _certProto = {
        /**
         * Проверяет, валиден ли сертификат
         * */
        isValid: function isValid() {
            var cert = this._cert;

            return new Promise(function (resolve, reject) {
                var result;

                try {
                    result = cert.IsValid();
                    result = result.Result;
                } catch (err) {
                    reject('Ошибка при проверке сертификата: ', err.message);
                    return;
                }

                resolve(result);
            });
        },

        /**
         * Достает указанное свойство у сертификата
         * */
        getProp: function (propName) {
            var cert = this._cert;

            return new Promise(function (resolve, reject) {
                var result;

                try {
                    result = cert[propName];
                } catch (err) {
                    reject('Ошибка при обращении к свойству сертификата: ', err.message);
                    return;
                }

                resolve(result);
            });
        },

        /**
         * Экспорт base64 представления сертификата пользователя
         * */
        exportBase64: function exportBase64() {
            var cert = this._cert;

            return new Promise(function (resolve, reject) {
                var base64;

                try {
                    base64 = cert.Export(0);
                } catch (err) {
                    reject('Ошибка при экспорте сертификата: ', err.message);
                    return;
                }

                resolve(base64);
            });
        },

        /**
         * Возвращает информацию об алгоритме
         * */
        getAlgorithm: function getAlgorithm() {
            var cert = this._cert;

            return new Promise(function (resolve, reject) {
                var result = {},
                    algorithm;

                try {
                    algorithm = cert.PublicKey();
                    algorithm = algorithm.Algorithm;

                    result.algorithm = algorithm.FriendlyName;
                    result.oid = algorithm.Value;
                } catch (err) {
                    reject('Ошибка при получении алгоритма: ', err.message);
                    return;
                }

                resolve(result);
            });
        },

        /**
         * Разбирает SubjectName сертификата по тэгам
         * */
        getOwnerInfo: function getOwnerInfo() {
            return getCertInfo.call(this, cryptoCommon.subjectNameTagsTranslations, 'SubjectName');
        },

        /**
         * Разбирает IssuerName сертификата по тэгам
         * */
        getIssuerInfo: function getIssuerInfo() {
            return getCertInfo.call(this, cryptoCommon.issuerNameTagsTranslations, 'IssuerName');
        },

        /**
         * Получение OID сертификата
         * Возвращает массив OID (улучшенного ключа)
         * */
        getExtendedKeyUsage: function getExtendedKeyUsage() {
            var cert = this._cert;

            return new Promise(function (resolve, reject) {
                var OIDS = [],
                    count,
                    item;

                try {
                    count = cert.ExtendedKeyUsage();
                    count = count.EKUs;
                    count = count.Count;

                    if (count > 0) {
                        while (count > 0) {
                            item = cert.ExtendedKeyUsage();
                            item = item.EKUs;
                            item = item.Item(count);
                            item = item.OID;

                            OIDS.push(item);

                            count--;
                        }
                    }
                } catch (err) {
                    reject('Ошибка при получении ОИД\'ов: ', err.message);
                    return;
                }

                resolve(OIDS);
            });
        },

        getDecodedExtendedKeyUsage: cryptoCommon.getDecodedExtendedKeyUsage,

        hasExtendedKeyUsage: cryptoCommon.hasExtendedKeyUsage
    },

    _certListCache;

/**
 * Проверяет корректность настроек ЭП на машине
 * */
function isValidEDSSettings() {
    return new Promise(function (resolve, reject) {
        var result;

        try {
            result = cadesplugin.CreateObject('CAdESCOM.About');
        } catch (error) {
            reject('Настройки ЭП на данной машине не верны');
        }

        resolve();
    });
}

/**
 * Получить сертификат в формате cades по хэшу
 * */
function getCadesCert(hash) {
    return new Promise(function (resolve, reject) {
        var oStore = cadesplugin.CreateObject('CAdESCOM.Store'),
            certs,
            certCnt,
            cert;

        if (!oStore) {
            reject('Не удалось получить доступ к хранилищу сертификатов');
            return;
        }

        // Открываем хранилище
        try {
            oStore.Open(
                cadesplugin.CAPICOM_CURRENT_USER_STORE,
                cadesplugin.CAPICOM_MY_STORE,
                cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
            );
        } catch (err) {
            reject('Ошибка при открытии хранилища: ' + err.message);
            return;
        }

        // Получаем доступ к сертификатам
        try {
            certs = oStore.Certificates;
            certCnt = certs.Count;
        } catch (err) {
            reject('Ошибка получения списка сертификатов: ' + err.message);
            return;
        }

        if (!certCnt) {
            reject('Нет доступных сертификатов');
            return;
        }

        // Получаем сертификат по хэшу
        try {
            certs = certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, hash);

            if (certs.Count) {
                cert = certs.Item(1);
            } else {
                throw new Error('Нет доступных сертификатов');
            }
        } catch (err) {
            reject('Не удалось получить сертификат по хэшу: ' + err.message);
            return;
        }

        oStore.Close();

        resolve(cert);
    });
}

/**
 * Разбирает информацию сертификата по тэгам
 * */
function getCertInfo(tags, propName) {
    var cert = this._cert;

    return new Promise(function (resolve, reject) {
        var propInfo;

        try {
            propInfo = cert[propName];
        } catch (err) {
            reject('Ошибка при извлечении данных из сертификата: ', err.message);
            return;
        }

        resolve(cryptoCommon.parseCertInfo(tags, propInfo));
    });
}

/**
 * Возвращает список сертификатов, доступных в системе
 *
 * @param {Boolean} [resetCache=false] -- нужно ли сбросить кэш списка сертификатов
 * @returns {Promise} -- со списком сертификатов {Array}
 * */
function getCertsList(resetCache) {
    return new Promise(function (resolve, reject) {
        if (!resetCache && _certListCache) {
            resolve(_certListCache);
            return;
        }

        var oStore = cadesplugin.CreateObject('CAdESCOM.Store'),
            result = [],
            certs,
            count,
            item;

        // Открываем хранилище
        try {
            oStore.Open(
                cadesplugin.CAPICOM_CURRENT_USER_STORE,
                cadesplugin.CAPICOM_MY_STORE,
                cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
            );
        } catch (err) {
            reject('Ошибка при открытии хранилища: ' + err.message);
            return;
        }

        // Получаем доступ к сертификатам
        try {
            certs = oStore.Certificates;

            if (certs) {
                certs = certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
                /**
                 * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
                 * или не действительны на данный момент
                 * */
                certs = certs.Find(
                    cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
                    cryptoConstants.PropId.CAPICOM_PROPID_KEY_PROV_INFO
                );

                count = certs.Count;
            }
        } catch (err) {
            reject('Ошибка получения списка сертификатов: ' + err.message);
            return;
        }

        if (!count) {
            reject('Нет доступных сертификатов');
            return;
        }

        try {
            while (count) {
                item = certs.Item(count);

                result.push(Object.assign(Object.create(_certProto), {
                    _cert: item,
                    thumbprint: item.Thumbprint,
                    subjectName: item.SubjectName,
                    issuerName: item.IssuerName,
                    validFrom: item.ValidFromDate,
                    validTo: item.ValidToDate
                }));

                count--;
            }
        } catch (err) {
            reject('Ошибка обработки сертификатов: ' + err.message);
            return;
        }

        oStore.Close();

        _certListCache = cryptoCommon.prepareCertsInfo(result);

        resolve(_certListCache);
    });
}

/**
 * Получить сертификат по хэшу
 * */
function getCert(hash) {
    return new Promise(function (resolve, reject) {
        if (!hash) {
            reject('Хэш не указан');
            return;
        }

        getCertsList().then(function (list) {
            var foundCert;

            list.some(function (cert) {
                if (hash === cert.thumbprint) {
                    foundCert = cert;
                    return true;
                }
            });

            if (foundCert) {
                resolve(foundCert);
            } else {
                reject('Сертификат с хэшем: "' + hash + '" не найден');
            }
        }, reject);
    });
}

/**
 * Создает подпись base64 строки по hash'у сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @param {Boolean} signType -- тип подписи открепленная (true) / присоединенная (false) (default: true)
 * @returns {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
function signData(hash, dataBase64, signType) {
    signType = typeof signType === 'undefined' ? true : Boolean(signType);

    return new Promise(function (resolve, reject) {
        getCadesCert(hash).then(function (cert) {
            var clientTime = new Date(),
                oAttrs = cadesplugin.CreateObject('CADESCOM.CPAttribute'),
                oSignedData = cadesplugin.CreateObject('CAdESCOM.CadesSignedData'),
                oSigner = cadesplugin.CreateObject('CAdESCOM.CPSigner'),
                attrs,
                signature;

            clientTime = cryptoCommon.getDateObj(clientTime);

            try {
                oAttrs.Name = cryptoConstants.Time.AUTHENTICATED_ATTRIBUTE_SIGNING_TIME;
                oAttrs.Value = clientTime;
            } catch (err) {
                reject('Ошибка при установке данных подписи: ' + err.message);
                return;
            }

            // Задаем настройки для подписи
            try {
                oSigner.Certificate = cert;
                attrs = oSigner.AuthenticatedAttributes2;
                attrs.Add(oAttrs);
                oSignedData.ContentEncoding = cadesplugin.CADESCOM_BASE64_TO_BINARY;
                oSignedData.Content = dataBase64;
                oSigner.Options = cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY;
            } catch (err) {
                reject('Не удалось установить настройки для подписи: ' + err.message);
                return;
            }

            try {
                signature = oSignedData.SignCades(
                    oSigner,
                    cadesplugin.CADESCOM_CADES_BES,
                    signType
                );
            } catch (err) {
                reject('Не удалось создать подпись: ' + err.message);
                return;
            }

            resolve(signature);
        }, reject);
    });
}

/**
 * Создает подпись XML строки по hash'у сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataXML -- данные в формате XML
 * @returns {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
function signDataXML(hash, dataXML) {
    return new Promise(function (resolve, reject) {
        getCadesCert(hash).then(function (cert) {
            var oSigner = cadesplugin.CreateObject('CAdESCOM.CPSigner'),
                signerXML = cadesplugin.CreateObject('CAdESCOM.SignedXML'),
                cnts = cryptoConstants,
                signature;

            // Задаем настройки для подписи
            try {
                oSigner.Certificate = cert;
                // Добавляем данные для подписи
                signerXML.Content = dataXML;
                // Устанавливаем тип подписи
                signerXML.SignatureType = cnts.SignatureType.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED;
                // Устанавливаем алгоритм подписи
                signerXML.SignatureMethod = cnts.GostXmlDSigUrls.XmlDsigGost3410Url;
                // Устанавливаем алгоритм хэширования
                signerXML.DigestMethod = cnts.GostXmlDSigUrls.XmlDsigGost3411Url;
            } catch (err) {
                reject('Не удалось установить настройки для подписи: ' + err.message);
                return;
            }

            try {
                signature = signerXML.Sign(oSigner);
            } catch (err) {
                reject('Не удалось создать подпись: ' + err.message);
                return;
            }

            resolve(signature);
        }, reject);
    });
}

/**
 * Возвращает информацию о версии CSP и плагина
 * */
function getSystemInfo() {
    var sysInfo = cryptoCommon.getEnvInfo();

    return new Promise(function (resolve, reject) {
        var e;

        try {
            e = cadesplugin.CreateObject('CAdESCOM.About');

            sysInfo.cadesVersion = e.PluginVersion;
            // Возможен вызов в ранних версиях в виде sysInfo.cspVersion = e.CSPVersion('', 75);
            sysInfo.cspVersion = e.CSPVersion();

            if (!sysInfo.cadesVersion) {
                sysInfo.cadesVersion = e.Version;
            }

            sysInfo.cadesVersion = sysInfo.cadesVersion.toString();
            sysInfo.cspVersion = sysInfo.cspVersion.toString();

            resolve(sysInfo);
        } catch (err) {
            reject('Ошибка при получении информации о системе: ', err.message);
        }
    });
}

/**
 * Promise обертка для синхронного вызова проверки версии CSP
 * */
function isValidCSPVersion(version) {
    return new Promise(function (resolve) {
        resolve(cryptoCommon.isValidCSPVersion(version));
    });
}

/**
 * Promise обертка для синхронного вызова проверки версии плагина
 * */
function isValidCadesVersion(version) {
    return new Promise(function (resolve) {
        resolve(cryptoCommon.isValidCadesVersion(version));
    });
}

module.exports = {
    isValidEDSSettings: isValidEDSSettings,
    getCertsList: getCertsList,
    getCert: getCert,
    signData: signData,
    signDataXML: signDataXML,
    getSystemInfo: getSystemInfo,
    isValidCSPVersion: isValidCSPVersion,
    isValidCadesVersion: isValidCadesVersion
};