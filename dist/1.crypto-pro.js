webpackJsonpCryptoPro([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var cryptoCommon = __webpack_require__(5),
	    cryptoConstants = __webpack_require__(7),
	    _certListCache;
	
	function Certificate(item) {
	    this._cert = item._cert;
	    this.thumbprint = item.thumbprint;
	    this.subjectName = item.subjectName;
	    this.issuerName = item.issuerName;
	    this.validFrom = item.validFrom;
	    this.validTo = item.validTo;
	}
	
	/**
	 * Проверяет, валиден ли сертификат
	 * */
	Certificate.prototype.isValid = function isValid() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var result;
	
	            try {
	                result = yield cert.IsValid();
	                result = yield result.Result;
	            } catch (err) {
	                reject('Ошибка при проверке сертификата: ', err.message);
	                return;
	            }
	
	            resolve(result);
	        });
	    });
	};
	
	/**
	 * Достает указанное свойство у сертификата
	 * */
	Certificate.prototype.getProp = function (propName) {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var result;
	
	            try {
	                result = yield cert[propName];
	            } catch (err) {
	                reject('Ошибка при обращении к свойству сертификата: ', err.message);
	                return;
	            }
	
	            resolve(result);
	        });
	    });
	};
	
	/**
	 * Экспорт base64 представления сертификата пользователя
	 * */
	Certificate.prototype.exportBase64 = function exportBase64() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var base64;
	
	            try {
	                base64 = yield cert.Export(0);
	            } catch (err) {
	                reject('Ошибка при экспорте сертификата: ', err.message);
	                return;
	            }
	
	            resolve(base64);
	        });
	    });
	};
	
	/**
	 * Возвращает информацию об алгоритме
	 * */
	Certificate.prototype.getAlgorithm = function getAlgorithm() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var result = {},
	                algorithm;
	
	            try {
	                algorithm = yield cert.PublicKey();
	                algorithm = yield algorithm.Algorithm;
	
	                result.algorithm = yield algorithm.FriendlyName;
	                result.oid = yield algorithm.Value;
	            } catch (err) {
	                reject('Ошибка при получении алгоритма: ', err.message);
	                return;
	            }
	
	            resolve(result);
	        });
	    });
	};
	
	/**
	 * Разбирает SubjectName сертификата по тэгам
	 * */
	Certificate.prototype.getOwnerInfo = function getOwnerInfo() {
	    return getCertInfo.call(this, cryptoCommon.subjectNameTagsTranslations, 'SubjectName');
	};
	
	/**
	 * Разбирает IssuerName сертификата по тэгам
	 * */
	Certificate.prototype.getIssuerInfo = function getIssuerInfo() {
	    return getCertInfo.call(this, cryptoCommon.issuerNameTagsTranslations, 'IssuerName');
	};
	
	/**
	 * Получение OID сертификата
	 *
	 * @returns {Array} Возвращает массив OID (улучшенного ключа)
	 * */
	Certificate.prototype.getExtendedKeyUsage = function getExtendedKeyUsage() {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var OIDS = [],
	                count,
	                item;
	
	            try {
	                count = yield cert.ExtendedKeyUsage();
	                count = yield count.EKUs;
	                count = yield count.Count;
	
	                if (count > 0) {
	                    while (count > 0) {
	                        item = yield cert.ExtendedKeyUsage();
	                        item = yield item.EKUs;
	                        item = yield item.Item(count);
	                        item = yield item.OID;
	
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
	    });
	};
	
	Certificate.prototype.getDecodedExtendedKeyUsage = cryptoCommon.getDecodedExtendedKeyUsage;
	
	Certificate.prototype.hasExtendedKeyUsage = cryptoCommon.hasExtendedKeyUsage;
	
	/**
	 * Проверяет корректность настроек ЭП на машине
	 * */
	function isValidEDSSettings() {
	    return new Promise(function (resolve, reject) {
	        eval(cryptoCommon.execute(function () {
	            var result;
	
	            try {
	                result = cryptoCommon.createObj('CAdESCOM.About');
	            } catch (error) {
	                reject('Настройки ЭП на данной машине не верны');
	            }
	
	            resolve();
	        }));
	    });
	}
	
	/**
	 * Получить сертификат в формате cades по хэшу
	 * */
	function getCadesCert(hash) {
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store'),
	                certs,
	                certCnt,
	                cert;
	
	            if (!oStore) {
	                reject('Не удалось получить доступ к хранилищу сертификатов');
	                return;
	            }
	
	            // Открываем хранилище
	            try {
	                yield oStore.Open(
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
	                certs = yield oStore.Certificates;
	                certCnt = yield certs.Count;
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
	                certs = yield certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, hash);
	
	                if (certs.Count) {
	                    cert = yield certs.Item(1);
	                } else {
	                    throw new Error(hash);
	                }
	            } catch (err) {
	                reject('Не удалось получить сертификат по хэшу: ' + err.message);
	                return;
	            }
	
	            oStore.Close();
	
	            resolve(cert);
	        });
	    });
	}
	
	/**
	 * Разбирает информацию сертификата по тэгам
	 * */
	function getCertInfo(tags, propName) {
	    var cert = this._cert;
	
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var propInfo;
	
	            try {
	                propInfo = yield cert[propName];
	            } catch (err) {
	                reject('Ошибка при извлечении данных из сертификата: ', err.message);
	                return;
	            }
	
	            resolve(cryptoCommon.parseCertInfo(tags, propInfo));
	        });
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
	
	        cadesplugin.async_spawn(function* () {
	            var oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store'),
	                result = [],
	                certs,
	                count,
	                item;
	
	            // Открываем хранилище
	            try {
	                yield oStore.Open(
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
	                certs = yield oStore.Certificates;
	
	                if (certs) {
	                    certs = yield certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
	                    /**
	                     * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
	                     * или не действительны на данный момент
	                     * */
	                    certs = yield certs.Find(
	                        cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
	                        cryptoConstants.PropId.CAPICOM_PROPID_KEY_PROV_INFO
	                    );
	
	                    count = yield certs.Count;
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
	                    item = yield certs.Item(count);
	
	                    result.push(new Certificate({
	                        _cert: yield item,
	                        thumbprint: yield item.Thumbprint,
	                        subjectName: yield item.SubjectName,
	                        issuerName: yield item.IssuerName,
	                        validFrom: yield item.ValidFromDate,
	                        validTo: yield item.ValidToDate
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
	            cadesplugin.async_spawn(function* () {
	                var clientTime = new Date(),
	                    oAttrs = yield cadesplugin.CreateObjectAsync('CADESCOM.CPAttribute'),
	                    oSignedData = yield cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData'),
	                    oSigner = yield cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner'),
	                    attrs,
	                    signature;
	
	                clientTime = cryptoCommon.getDateObj(clientTime);
	
	                try {
	                    yield oAttrs.propset_Name(cryptoConstants.Time.AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
	                    yield oAttrs.propset_Value(clientTime);
	                } catch (err) {
	                    reject('Ошибка при установке данных подписи: ' + err.message);
	                    return;
	                }
	
	                // Задаем настройки для подписи
	                try {
	                    yield oSigner.propset_Certificate(cert);
	                    attrs = yield oSigner.AuthenticatedAttributes2;
	                    yield attrs.Add(oAttrs);
	                    yield oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
	                    yield oSignedData.propset_Content(dataBase64);
	                    yield oSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);
	                } catch (err) {
	                    reject('Не удалось установить настройки для подписи: ' + err.message);
	                    return;
	                }
	
	                try {
	                    signature = yield oSignedData.SignCades(
	                        oSigner,
	                        cadesplugin.CADESCOM_CADES_BES,
	                        signType
	                    );
	                } catch (err) {
	                    reject('Не удалось создать подпись: ' + err.message);
	                    return;
	                }
	
	                resolve(signature);
	            });
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
	            cadesplugin.async_spawn(function* () {
	                var oSigner = yield cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner'),
	                    signerXML = yield cadesplugin.CreateObjectAsync('CAdESCOM.SignedXML'),
	                    cnts = cryptoConstants,
	                    signature;
	
	                // Задаем настройки для подписи
	                try {
	                    yield oSigner.propset_Certificate(cert);
	                    // Добавляем данные для подписи
	                    yield signerXML.propset_Content(dataXML);
	                    // Устанавливаем тип подписи
	                    yield signerXML.propset_SignatureType(cnts.SignatureType.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED);
	                    // Устанавливаем алгоритм подписи
	                    yield signerXML.propset_SignatureMethod(cnts.GostXmlDSigUrls.XmlDsigGost3410Url);
	                    // Устанавливаем алгоритм хэширования
	                    yield signerXML.propset_DigestMethod(cnts.GostXmlDSigUrls.XmlDsigGost3411Url);
	                } catch (err) {
	                    reject('Не удалось установить настройки для подписи: ' + err.message);
	                    return;
	                }
	
	                try {
	                    signature = yield signerXML.Sign(oSigner);
	                } catch (err) {
	                    reject('Не удалось создать подпись: ' + err.message);
	                    return;
	                }
	
	                resolve(signature);
	            });
	        }, reject);
	    });
	}
	
	/**
	 * Возвращает информацию о версии CSP и плагина
	 * */
	function getSystemInfo() {
	    var sysInfo = cryptoCommon.getEnvInfo();
	
	    return new Promise(function (resolve, reject) {
	        cadesplugin.async_spawn(function* () {
	            var e;
	
	            try {
	                e = yield cadesplugin.CreateObjectAsync('CAdESCOM.About');
	
	                sysInfo.cadesVersion = yield e.PluginVersion;
	                // Возможен вызов в ранних версиях в виде sysInfo.cspVersion = yield e.CSPVersion('', 75);
	                sysInfo.cspVersion = yield e.CSPVersion();
	
	                if (!sysInfo.cadesVersion) {
	                    sysInfo.cadesVersion = yield e.Version;
	                }
	
	                sysInfo.cadesVersion = yield sysInfo.cadesVersion.toString();
	                sysInfo.cspVersion = yield sysInfo.cspVersion.toString();
	
	                resolve(sysInfo);
	            } catch (err) {
	                reject('Ошибка при получении информации о системе: ', err.message);
	            }
	        });
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var bowser = __webpack_require__(1);
	var oids = __webpack_require__(6);
	
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
	
	        cb = cb.replace(/cryptoCommon\.createObj(\([\s\S]*?\))/gm, 'yield cadesplugin.CreateObjectAsync$1');
	
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	    '1.2.840.113549.1.9.2': 'Неструктурированное имя',
	    '1.2.643.3.141.1.1': 'РНС ФСС',
	    '1.2.643.3.141.1.2': 'КП ФСС',
	    '1.2.643.3.131.1.1': 'ИНН',
	    '1.3.6.1.5.5.7.3.2': 'Проверка подлинности клиента',
	    '1.3.6.1.5.5.7.3.4': 'Защищенная электронная почта',
	    '1.2.643.3.8.100.1': 'Сертификат типа "ekey-ГОСТ"',
	    '1.2.643.3.8.100.1.1': 'Общее использование в системах ИОК без права заверения финансовых документов',
	    '1.2.643.3.8.100.1.2': 'Передача отчетности по ТКС',
	    '1.2.643.3.8.100.1.3': 'Оформление взаимных обязательств, соглашений, договоров, актов и т.п.',
	    '1.2.643.3.8.100.1.4': 'Внутрикорпоративный документооборот',
	    '1.2.643.3.8.100.1.5': 'Использование в системах электронной торговли',
	    '1.2.643.3.8.100.1.6': 'Использование в торгово-закупочной системе "ЭЛЕКТРА"',
	    '1.2.643.6.2.1.7.2': 'Использование физическим лицом в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских прав и обязанностей в отношении инвестиционных паев паевых инвестиционных фондов, в том числе отношения, связанные с учетом и/или фиксацией прав на инвестиционные паи паевых инвестиционных фондов',
	    '1.2.643.6.2.1.7.1': 'Использование единоличным исполнительным органом юридического лица или уполномоченными представителями юридического лица в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских и иных прав и обязанностей в сфере негосударственного пенсионного обеспечения, негосударственного пенсионного страхования, в сфере деятельности паевых инвестиционных фондов, акционерных инвестиционных фондов, профессиональных участников рынка ценных бумаг, а также связанной с обслуживанием указанной деятельности услуг кредитных и иных организаций',
	    '1.3.6.1.4.1.29919.21': 'Использование в системе Портал государственных закупок  Ростовской области "Рефери".',
	    '1.2.643.3.2.100.65.13.11': 'Использование в системе АИС "Госзакупки" Сахалинской области.',
	    '1.2.643.3.8.100.1.7': 'Использование в системе Портал государственных закупок Ставропольского края.',
	    '1.2.643.3.8.100.1.8': 'Использование в Единой системе электронной торговли B2B-Center и B2G.',
	    '1.2.643.3.8.100.1.9': 'Для участия в электронных торгах и подписания государственного контракта в  электронной площадке ОАО «ЕЭТП» уполномоченными лицами участников размещения  государственного или муниципального заказа',
	    '1.2.643.3.8.100.1.10': 'Для участия в электронных торгах и подписания государственного контракта в  информационных системах Тендерного комитета города Москвы уполномоченными  лицами участников размещения государственного заказа города Москвы',
	    '1.2.643.3.8.100.1.11': 'Подписание электронных документов в автоматизированной информационной  системе размещения государственного и муниципального заказа Саратовской области',
	    '1.2.643.3.8.100.1.12': 'Использование в системе государственного заказа Иркутской области',
	    '1.2.643.3.8.100.1.13': 'Использование в электронной торговой площадке агентства государственного  заказа Красноярского края',
	    '1.3.6.1.4.1.24138.1.1.8.1': 'Обеспечение юридической значимости в Системе "Электронная Торговая Площадка"',
	    '1.2.643.3.8.100.1.14': 'Использование в электронной торговой площадке "Тендер"',
	    '1.2.643.6.3': 'Использование в электронных торговых системах и в программном обеспечении, связанным с обменом электронных сообщений',
	    '1.2.643.2.2.34.6': 'Пользователь Центра Регистрации',
	    '1.2.643.2.39.1.1': 'Использование в программных продуктах системы "1С:Предприятие 8"',
	    '1.2.643.5.1.24.2.1.3': 'Формирование документов для получения государственных  услуг в сфере ведения государственного кадастра недвижимости со стороны заявителя',
	    '1.2.643.5.1.24.2.1.3.1': 'Формирование кадастровым инженером документов  для получения государственных услуг в сфере ведения государственного кадастра недвижимости со стороны  заявителя',
	    '1.2.643.5.1.24.2.2.2': 'Формирование документов как результата оказания  услуги со стороны органов регистрации прав',
	    '1.2.643.5.1.24.2.2.3': 'Формирование документов для получения государственных  услуг в сфере государственной регистрации прав на недвижимое имущество и сделок с ним со стороны заявителя',
	    '1.2.643.6.3.1.1': 'Использование на электронных площадок отобранных для проведения аукционах в электронной форме',
	    '1.2.643.6.3.1.2.1': 'Тип участника - Юридическое лицо',
	    '1.2.643.6.3.1.2.2': 'Тип участника - Физическое лицо',
	    '1.2.643.6.3.1.2.3': 'Тип участника - Индивидуальный предприниматель',
	    '1.2.643.6.3.1.3.1': 'Участник размещения заказа',
	    '1.2.643.6.3.1.4.1': 'Администратор организации',
	    '1.2.643.6.3.1.4.2': 'Уполномоченный специалист',
	    '1.2.643.6.3.1.4.3': 'Специалист с правом подписи контракта',
	    '1.3.643.3.8.100.15': 'Использование в ЭТП "uTender"'
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	    // CAPICOM_STORE_LOCATION enumeration
	    StoreLocation: {
	        CAPICOM_MEMORY_STORE: 0,
	        CAPICOM_LOCAL_MACHINE_STORE: 1,
	        CAPICOM_CURRENT_USER_STORE: 2,
	        CAPICOM_ACTIVE_DIRECTORY_USER_STORE: 3,
	        CAPICOM_SMART_CARD_USER_STORE: 4
	    },
	    // CAPICOM_STORE_OPEN_MODE enumeration
	    StoreOpenMode: {
	        CAPICOM_STORE_OPEN_READ_ONLY: 0,
	        CAPICOM_STORE_OPEN_READ_WRITE: 1,
	        CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: 2,
	        CAPICOM_STORE_OPEN_EXISTING_ONLY: 128,
	        CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED: 256
	    },
	    // CAPICOM_CERTIFICATE_FIND_TYPE enumeration
	    CertFindType: {
	        CAPICOM_CERTIFICATE_FIND_SHA1_HASH: 0,
	        CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: 1,
	        CAPICOM_CERTIFICATE_FIND_ISSUER_NAME: 2,
	        CAPICOM_CERTIFICATE_FIND_ROOT_NAME: 3,
	        CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME: 4,
	        CAPICOM_CERTIFICATE_FIND_EXTENSION: 5,
	        CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY: 6,
	        CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY: 7,
	        CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY: 8,
	        CAPICOM_CERTIFICATE_FIND_TIME_VALID: 9,
	        CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID: 10,
	        CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED: 11,
	        CAPICOM_CERTIFICATE_FIND_KEY_USAGE: 12
	    },
	    Time: {
	        AUTHENTICATED_ATTRIBUTE_SIGNING_TIME: 0
	    },
	    Check: {
	        CHECK_NONE: 0,
	        CHECK_TRUSTED_ROOT: 1,
	        CHECK_TIME_VALIDITY: 2,
	        CHECK_SIGNATURE_VALIDITY: 4,
	        CHECK_ONLINE_REVOCATION_STATUS: 8,
	        CHECK_OFFLINE_REVOCATION_STATUS: 16,
	        TRUST_IS_NOT_TIME_VALID: 1,
	        TRUST_IS_NOT_TIME_NESTED: 2,
	        TRUST_IS_REVOKED: 4,
	        TRUST_IS_NOT_SIGNATURE_VALID: 8,
	        TRUST_IS_NOT_VALID_FOR_USAGE: 16,
	        TRUST_IS_UNTRUSTED_ROOT: 32,
	        TRUST_REVOCATION_STATUS_UNKNOWN: 64,
	        TRUST_IS_CYCLIC: 128,
	        TRUST_IS_PARTIAL_CHAIN: 65536,
	        TRUST_CTL_IS_NOT_TIME_VALID: 131072,
	        TRUST_CTL_IS_NOT_SIGNATURE_VALID: 262144,
	        TRUST_CTL_IS_NOT_VALID_FOR_USAGE: 524288,
	    },
	    // CAPICOM_PROPID enumeration
	    PropId: {
	        CAPICOM_PROPID_UNKNOWN: 0,
	        CAPICOM_PROPID_KEY_PROV_HANDLE: 1,
	        CAPICOM_PROPID_KEY_PROV_INFO: 2,
	        CAPICOM_PROPID_SHA1_HASH: 3,
	        CAPICOM_PROPID_HASH_PROP: 3,
	        CAPICOM_PROPID_MD5_HASH: 4,
	        CAPICOM_PROPID_KEY_CONTEXT: 5,
	        CAPICOM_PROPID_KEY_SPEC: 6,
	        CAPICOM_PROPID_IE30_RESERVED: 7,
	        CAPICOM_PROPID_PUBKEY_HASH_RESERVED: 8,
	        CAPICOM_PROPID_ENHKEY_USAGE: 9,
	        CAPICOM_PROPID_CTL_USAGE: 9,
	        CAPICOM_PROPID_NEXT_UPDATE_LOCATION: 10,
	        CAPICOM_PROPID_FRIENDLY_NAME: 11,
	        CAPICOM_PROPID_PVK_FILE: 12,
	        CAPICOM_PROPID_DESCRIPTION: 13,
	        CAPICOM_PROPID_ACCESS_STATE: 14,
	        CAPICOM_PROPID_SIGNATURE_HASH: 15,
	        CAPICOM_PROPID_SMART_CARD_DATA: 16,
	        CAPICOM_PROPID_EFS: 17,
	        CAPICOM_PROPID_FORTEZZA_DATA: 18,
	        CAPICOM_PROPID_ARCHIVED: 19,
	        CAPICOM_PROPID_KEY_IDENTIFIER: 20,
	        CAPICOM_PROPID_AUTO_ENROLL: 21,
	        CAPICOM_PROPID_PUBKEY_ALG_PARA: 22,
	        CAPICOM_PROPID_CROSS_CERT_DIST_POINTS: 23,
	        CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH: 24,
	        CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH: 25,
	        CAPICOM_PROPID_ENROLLMENT: 26,
	        CAPICOM_PROPID_DATE_STAMP: 27,
	        CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH: 28,
	        CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH: 29,
	        CAPICOM_PROPID_EXTENDED_ERROR_INFO: 30,
	        CAPICOM_PROPID_RENEWAL: 64,
	        CAPICOM_PROPID_ARCHIVED_KEY_HASH: 65,
	        CAPICOM_PROPID_FIRST_RESERVED: 66,
	        CAPICOM_PROPID_LAST_RESERVED: 0x00007FFF,
	        CAPICOM_PROPID_FIRST_USER: 0x00008000,
	        CAPICOM_PROPID_LAST_USER: 0x0000FFFF
	    },
	    // CADESCOM_XML_SIGNATURE_TYPE enumeration
	    SignatureType: {
	        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED: 0,
	        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING: 1,
	        CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE: 2
	    },
	    // CADESCOM_HASH_ALGORITHM enumeration
	    HashAlgorithm: {
	        CADESCOM_HASH_ALGORITHM_CP_GOST_3411: 100,
	        CADESCOM_HASH_ALGORITHM_MD2: 1,
	        CADESCOM_HASH_ALGORITHM_MD4: 2,
	        CADESCOM_HASH_ALGORITHM_MD5: 3,
	        CADESCOM_HASH_ALGORITHM_SHA_256: 4,
	        CADESCOM_HASH_ALGORITHM_SHA_384: 5,
	        CADESCOM_HASH_ALGORITHM_SHA_512: 6,
	        CADESCOM_HASH_ALGORITHM_SHA1: 0
	    },
	    CadesType: {
	        CADESCOM_CADES_DEFAULT: 0,
	        CADESCOM_CADES_BES: 1,
	        CADESCOM_CADES_X_LONG_TYPE_1: 0x5d
	    },
	    ContentEncoding: {
	        CADESCOM_BASE64_TO_BINARY: 0x01,
	        CADESCOM_STRING_TO_UCS2LE: 0x00
	    },
	    StoreNames: {
	        CAPICOM_MY_STORE: 'My'
	    },
	    Chain: {
	        CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT: 0,
	        CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN: 1,
	        CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY: 2
	    },
	    GostXmlDSigUrls: {
	        XmlDsigGost3410Url: 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411',
	        XmlDsigGost3411Url: 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411',
	        XmlDsigGost3410UrlObsolete: 'http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411',
	        XmlDsigGost3411UrlObsolete: 'http://www.w3.org/2001/04/xmldsig-more#gostr3411'
	    }
	};

/***/ }
]);
//# sourceMappingURL=1.crypto-pro.js.map