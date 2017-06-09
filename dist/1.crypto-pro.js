webpackJsonpcrypto_pro([1],[,,function(e,t,n){function r(e){this._cert=e._cert,this.thumbprint=e.thumbprint,this.subjectName=e.subjectName,this.issuerName=e.issuerName,this.validFrom=e.validFrom,this.validTo=e.validTo}function s(){return new Promise(function(e,t){cadesplugin.async_spawn(regeneratorRuntime.mark(function n(){var r;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,cadesplugin.CreateObjectAsync("CAdESCOM.About");case 3:r=n.sent,n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),t("Настройки ЭП на данной машине не верны");case 9:e();case 10:case"end":return n.stop()}},n,this,[[0,6]])}))})}function a(e){return new Promise(function(t,n){cadesplugin.async_spawn(regeneratorRuntime.mark(function r(){var s,a,_,i;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,cadesplugin.CreateObjectAsync("CAdESCOM.Store");case 2:if(s=r.sent){r.next=6;break}return n("Не удалось получить доступ к хранилищу сертификатов"),r.abrupt("return");case 6:return r.prev=6,r.next=9,s.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE,cadesplugin.CAPICOM_MY_STORE,cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);case 9:r.next=15;break;case 11:return r.prev=11,r.t0=r.catch(6),n("Ошибка при открытии хранилища: "+r.t0.message),r.abrupt("return");case 15:return r.prev=15,r.next=18,s.Certificates;case 18:return a=r.sent,r.next=21,a.Count;case 21:_=r.sent,r.next=28;break;case 24:return r.prev=24,r.t1=r.catch(15),n("Ошибка получения списка сертификатов: "+r.t1.message),r.abrupt("return");case 28:if(_){r.next=31;break}return n("Нет доступных сертификатов"),r.abrupt("return");case 31:return r.prev=31,r.next=34,a.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,e);case 34:if(a=r.sent,!a.Count){r.next=41;break}return r.next=38,a.Item(1);case 38:i=r.sent,r.next=42;break;case 41:throw new Error(e);case 42:r.next=48;break;case 44:return r.prev=44,r.t2=r.catch(31),n("Не удалось получить сертификат по хэшу: "+r.t2.message),r.abrupt("return");case 48:s.Close(),t(i);case 50:case"end":return r.stop()}},r,this,[[6,11],[15,24],[31,44]])}))})}function _(e,t){var n=this._cert;return new Promise(function(r,s){cadesplugin.async_spawn(regeneratorRuntime.mark(function a(){var _;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,n[t];case 3:_=a.sent,a.next=10;break;case 6:return a.prev=6,a.t0=a.catch(0),s("Ошибка при извлечении данных из сертификата: ",a.t0.message),a.abrupt("return");case 10:r(O.parseCertInfo(e,_));case 11:case"end":return a.stop()}},a,this,[[0,6]])}))})}function i(e){return new Promise(function(t,n){if(!e&&A)return void t(A);cadesplugin.async_spawn(regeneratorRuntime.mark(function e(){var s,a,_,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,cadesplugin.CreateObjectAsync("CAdESCOM.Store");case 2:return s=e.sent,a=[],e.prev=4,e.next=7,s.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE,cadesplugin.CAPICOM_MY_STORE,cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);case 7:e.next=13;break;case 9:return e.prev=9,e.t0=e.catch(4),n("Ошибка при открытии хранилища: "+e.t0.message),e.abrupt("return");case 13:return e.prev=13,e.next=16,s.Certificates;case 16:if(!(_=e.sent)){e.next=27;break}return e.next=20,_.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);case 20:return _=e.sent,e.next=23,_.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,p.PropId.CAPICOM_PROPID_KEY_PROV_INFO);case 23:return _=e.sent,e.next=26,_.Count;case 26:i=e.sent;case 27:e.next=33;break;case 29:return e.prev=29,e.t1=e.catch(13),n("Ошибка получения списка сертификатов: "+e.t1.message),e.abrupt("return");case 33:if(i){e.next=36;break}return n("Нет доступных сертификатов"),e.abrupt("return");case 36:e.prev=36;case 37:if(!i){e.next=67;break}return e.next=40,_.Item(i);case 40:return c=e.sent,e.t2=a,e.t3=r,e.next=45,c;case 45:return e.t4=e.sent,e.next=48,c.Thumbprint;case 48:return e.t5=e.sent,e.next=51,c.SubjectName;case 51:return e.t6=e.sent,e.next=54,c.IssuerName;case 54:return e.t7=e.sent,e.next=57,c.ValidFromDate;case 57:return e.t8=e.sent,e.next=60,c.ValidToDate;case 60:e.t9=e.sent,e.t10={_cert:e.t4,thumbprint:e.t5,subjectName:e.t6,issuerName:e.t7,validFrom:e.t8,validTo:e.t9},e.t11=new e.t3(e.t10),e.t2.push.call(e.t2,e.t11),i--,e.next=37;break;case 67:e.next=73;break;case 69:return e.prev=69,e.t12=e.catch(36),n("Ошибка обработки сертификатов: "+e.t12.message),e.abrupt("return");case 73:s.Close(),A=O.prepareCertsInfo(a),t(A);case 76:case"end":return e.stop()}},e,this,[[4,9],[13,29],[36,69]])}))})}function c(e){return new Promise(function(t,n){if(!e)return void n("Хэш не указан");i().then(function(r){var s;r.some(function(t){if(e===t.thumbprint)return s=t,!0}),s?t(s):n('Сертификат с хэшем: "'+e+'" не найден')},n)})}function u(e,t,n){return n=void 0===n||Boolean(n),new Promise(function(r,s){a(e).then(function(e){cadesplugin.async_spawn(regeneratorRuntime.mark(function a(){var _,i,c,u,o,C;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return _=new Date,a.next=3,cadesplugin.CreateObjectAsync("CADESCOM.CPAttribute");case 3:return i=a.sent,a.next=6,cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");case 6:return c=a.sent,a.next=9,cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");case 9:return u=a.sent,_=O.getDateObj(_),a.prev=11,a.next=14,i.propset_Name(p.Time.AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);case 14:return a.next=16,i.propset_Value(_);case 16:a.next=22;break;case 18:return a.prev=18,a.t0=a.catch(11),s("Ошибка при установке данных подписи: "+a.t0.message),a.abrupt("return");case 22:return a.prev=22,a.next=25,u.propset_Certificate(e);case 25:return a.next=27,u.AuthenticatedAttributes2;case 27:return o=a.sent,a.next=30,o.Add(i);case 30:return a.next=32,c.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);case 32:return a.next=34,c.propset_Content(t);case 34:return a.next=36,u.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);case 36:a.next=42;break;case 38:return a.prev=38,a.t1=a.catch(22),s("Не удалось установить настройки для подписи: "+a.t1.message),a.abrupt("return");case 42:return a.prev=42,a.next=45,c.SignCades(u,cadesplugin.CADESCOM_CADES_BES,n);case 45:C=a.sent,a.next=52;break;case 48:return a.prev=48,a.t2=a.catch(42),s("Не удалось создать подпись: "+a.t2.message),a.abrupt("return");case 52:r(C);case 53:case"end":return a.stop()}},a,this,[[11,18],[22,38],[42,48]])}))},s)})}function o(e,t){return new Promise(function(n,r){a(e).then(function(e){cadesplugin.async_spawn(regeneratorRuntime.mark(function s(){var a,_,i,c;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");case 2:return a=s.sent,s.next=5,cadesplugin.CreateObjectAsync("CAdESCOM.SignedXML");case 5:return _=s.sent,i=p,s.prev=7,s.next=10,a.propset_Certificate(e);case 10:return s.next=12,_.propset_Content(t);case 12:return s.next=14,_.propset_SignatureType(i.SignatureType.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED);case 14:return s.next=16,_.propset_SignatureMethod(i.GostXmlDSigUrls.XmlDsigGost3410Url);case 16:return s.next=18,_.propset_DigestMethod(i.GostXmlDSigUrls.XmlDsigGost3411Url);case 18:s.next=24;break;case 20:return s.prev=20,s.t0=s.catch(7),r("Не удалось установить настройки для подписи: "+s.t0.message),s.abrupt("return");case 24:return s.prev=24,s.next=27,_.Sign(a);case 27:c=s.sent,s.next=34;break;case 30:return s.prev=30,s.t1=s.catch(24),r("Не удалось создать подпись: "+s.t1.message),s.abrupt("return");case 34:n(c);case 35:case"end":return s.stop()}},s,this,[[7,20],[24,30]])}))},r)})}function C(){var e=O.getEnvInfo();return new Promise(function(t,n){cadesplugin.async_spawn(regeneratorRuntime.mark(function r(){var s;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,cadesplugin.CreateObjectAsync("CAdESCOM.About");case 3:return s=r.sent,r.next=6,s.PluginVersion;case 6:return e.cadesVersion=r.sent,r.next=9,s.CSPVersion();case 9:if(e.cspVersion=r.sent,e.cadesVersion){r.next=14;break}return r.next=13,s.Version;case 13:e.cadesVersion=r.sent;case 14:return r.next=16,e.cadesVersion.toString();case 16:return e.cadesVersion=r.sent,r.next=19,e.cspVersion.toString();case 19:e.cspVersion=r.sent,t(e),r.next=26;break;case 23:r.prev=23,r.t0=r.catch(0),n("Ошибка при получении информации о системе: ",r.t0.message);case 26:case"end":return r.stop()}},r,this,[[0,23]])}))})}function I(e){return new Promise(function(t){t(O.isValidCSPVersion(e))})}function E(e){return new Promise(function(t){t(O.isValidCadesVersion(e))})}var A,O=n(6),p=n(7);r.prototype.isValid=function(){var e=this._cert;return new Promise(function(t,n){cadesplugin.async_spawn(regeneratorRuntime.mark(function r(){var s;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.IsValid();case 3:return s=r.sent,r.next=6,s.Result;case 6:s=r.sent,r.next=13;break;case 9:return r.prev=9,r.t0=r.catch(0),n("Ошибка при проверке сертификата: ",r.t0.message),r.abrupt("return");case 13:t(s);case 14:case"end":return r.stop()}},r,this,[[0,9]])}))})},r.prototype.getProp=function(e){var t=this._cert;return new Promise(function(n,r){cadesplugin.async_spawn(regeneratorRuntime.mark(function s(){var a;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t[e];case 3:a=s.sent,s.next=10;break;case 6:return s.prev=6,s.t0=s.catch(0),r("Ошибка при обращении к свойству сертификата: ",s.t0.message),s.abrupt("return");case 10:n(a);case 11:case"end":return s.stop()}},s,this,[[0,6]])}))})},r.prototype.exportBase64=function(){var e=this._cert;return new Promise(function(t,n){cadesplugin.async_spawn(regeneratorRuntime.mark(function r(){var s;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.Export(0);case 3:s=r.sent,r.next=10;break;case 6:return r.prev=6,r.t0=r.catch(0),n("Ошибка при экспорте сертификата: ",r.t0.message),r.abrupt("return");case 10:t(s);case 11:case"end":return r.stop()}},r,this,[[0,6]])}))})},r.prototype.getAlgorithm=function(){var e=this._cert;return new Promise(function(t,n){cadesplugin.async_spawn(regeneratorRuntime.mark(function r(){var s,a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return s={},r.prev=1,r.next=4,e.PublicKey();case 4:return a=r.sent,r.next=7,a.Algorithm;case 7:return a=r.sent,r.next=10,a.FriendlyName;case 10:return s.algorithm=r.sent,r.next=13,a.Value;case 13:s.oid=r.sent,r.next=20;break;case 16:return r.prev=16,r.t0=r.catch(1),n("Ошибка при получении алгоритма: ",r.t0.message),r.abrupt("return");case 20:t(s);case 21:case"end":return r.stop()}},r,this,[[1,16]])}))})},r.prototype.getOwnerInfo=function(){return _.call(this,O.subjectNameTagsTranslations,"SubjectName")},r.prototype.getIssuerInfo=function(){return _.call(this,O.issuerNameTagsTranslations,"IssuerName")},r.prototype.getExtendedKeyUsage=function(){var e=this._cert;return new Promise(function(t,n){cadesplugin.async_spawn(regeneratorRuntime.mark(function r(){var s,a,_;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return s=[],r.prev=1,r.next=4,e.ExtendedKeyUsage();case 4:return a=r.sent,r.next=7,a.EKUs;case 7:return a=r.sent,r.next=10,a.Count;case 10:if(!((a=r.sent)>0)){r.next=29;break}case 12:if(!(a>0)){r.next=29;break}return r.next=15,e.ExtendedKeyUsage();case 15:return _=r.sent,r.next=18,_.EKUs;case 18:return _=r.sent,r.next=21,_.Item(a);case 21:return _=r.sent,r.next=24,_.OID;case 24:_=r.sent,s.push(_),a--,r.next=12;break;case 29:r.next=35;break;case 31:return r.prev=31,r.t0=r.catch(1),n("Ошибка при получении ОИД'ов: ",r.t0.message),r.abrupt("return");case 35:t(s);case 36:case"end":return r.stop()}},r,this,[[1,31]])}))})},r.prototype.getDecodedExtendedKeyUsage=O.getDecodedExtendedKeyUsage,r.prototype.hasExtendedKeyUsage=O.hasExtendedKeyUsage,e.exports={isValidEDSSettings:s,getCertsList:i,getCert:c,signData:u,signDataXML:o,getSystemInfo:C,isValidCSPVersion:I,isValidCadesVersion:E}},,,,function(e,t,n){function r(e,t){var n=t.match(/([а-яА-Яa-zA-Z0-9\.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);return n&&(n=n.map(function(t){var n,r=t.match(/^([а-яА-Яa-zA-Z0-9\.]+)=(.+?),?$/),s=r&&r[1],a=r&&r[2],_=!1;return/^OID./.test(s)&&(n=s.match(/^OID\.(.*)/))&&n[1]&&(n=E[n[1]])&&(s=n),a=a.replace(/^"(.*)"/,"$1"),a=a.replace(/"{2}/g,'"'),e.some(function(e){return e.possibleNames.some(function(t){var n=t===s;return n&&(s=e.translation,_=!0),n})}),{title:s,descr:a,translated:_}})),n}function s(e){return e=new Date(e),([e.getDate(),e.getMonth()+1,e.getFullYear()].join(".")+" "+[e.getHours(),e.getMinutes(),e.getSeconds()].join(":")).replace(/\b(\d)\b/g,"0$1")}function a(e){return I.msie?e.getVarDate():e}function _(e){return e.map(function(e){return e.name=e.subjectName.match(/CN=(.+?),/),e.name&&e.name[1]&&(e.name=e.name[1]),e.validFrom=s(e.validFrom),e.validTo=s(e.validTo),e.label=e.name+" (до "+e.validTo+")",e})}function i(){var e=this;return new Promise(function(t){e.getExtendedKeyUsage().then(function(e){t(e.reduce(function(e,t){return t={id:t,descr:E[t]||null},t.descr?e.unshift(t):e.push(t),e},[]))})})}function c(e){var t=this;return new Promise(function(n){t.getExtendedKeyUsage().then(function(t){var r;r=Array.isArray(e)?e.every(function(e){return t.some(function(t){return t===e})}):t.some(function(t){return t===e}),n(r)})})}function u(){var e=I._detect(navigator.userAgent),t={browserName:e.name,browserVersion:e.version};return e.mac?t.os="Mac":e.windows?t.os="Windows":e.linux&&(t.os="Linux"),t}function o(e){return(e=e.match(/\d+?\b(?:\.\d+)?/))>=3.6}function C(e){return e=e.split(".").reduce(function(e,t,n){return 0===n?e.major=t:1===n?e.minor=t:2===n&&(e.patch=t),e},{}),!(e.major<2)&&e.patch>=12438}var I=n(0),E=n(8),A=[{possibleNames:["UnstructuredName"],translation:"Неструктурированное имя"},{possibleNames:["CN"],translation:"Владелец"},{possibleNames:["SN"],translation:"Фамилия"},{possibleNames:["G"],translation:"Имя Отчество"},{possibleNames:["C"],translation:"Страна"},{possibleNames:["S"],translation:"Регион"},{possibleNames:["STREET"],translation:"Адрес"},{possibleNames:["O"],translation:"Компания"},{possibleNames:["OU"],translation:"Отдел/подразделение"},{possibleNames:["T"],translation:"Должность"},{possibleNames:["ОГРН","OGRN"],translation:"ОГРН"},{possibleNames:["ОГРНИП","OGRNIP"],translation:"ОГРНИП"},{possibleNames:["СНИЛС","SNILS"],translation:"СНИЛС"},{possibleNames:["ИНН","INN"],translation:"ИНН"},{possibleNames:["E"],translation:"Email"},{possibleNames:["L"],translation:"Город"}],O=[{possibleNames:["UnstructuredName"],translation:"Неструктурированное имя"},{possibleNames:["CN"],translation:"Удостоверяющий центр"},{possibleNames:["S"],translation:"Регион"},{possibleNames:["C"],translation:"Страна"},{possibleNames:["STREET"],translation:"Адрес"},{possibleNames:["O"],translation:"Компания"},{possibleNames:["OU"],translation:"Тип"},{possibleNames:["T"],translation:"Должность"},{possibleNames:["ОГРН","OGRN"],translation:"ОГРН"},{possibleNames:["ОГРНИП","OGRNIP"],translation:"ОГРНИП"},{possibleNames:["СНИЛС","SNILS"],translation:"СНИЛС"},{possibleNames:["ИНН","INN"],translation:"ИНН"},{possibleNames:["E"],translation:"Email"},{possibleNames:["L"],translation:"Город"}];e.exports={subjectNameTagsTranslations:A,issuerNameTagsTranslations:O,parseCertInfo:r,getReadableDate:s,getDateObj:a,prepareCertsInfo:_,getDecodedExtendedKeyUsage:i,hasExtendedKeyUsage:c,getEnvInfo:u,isValidCSPVersion:o,isValidCadesVersion:C}},function(e,t){e.exports={StoreLocation:{CAPICOM_MEMORY_STORE:0,CAPICOM_LOCAL_MACHINE_STORE:1,CAPICOM_CURRENT_USER_STORE:2,CAPICOM_ACTIVE_DIRECTORY_USER_STORE:3,CAPICOM_SMART_CARD_USER_STORE:4},StoreOpenMode:{CAPICOM_STORE_OPEN_READ_ONLY:0,CAPICOM_STORE_OPEN_READ_WRITE:1,CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED:2,CAPICOM_STORE_OPEN_EXISTING_ONLY:128,CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED:256},CertFindType:{CAPICOM_CERTIFICATE_FIND_SHA1_HASH:0,CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME:1,CAPICOM_CERTIFICATE_FIND_ISSUER_NAME:2,CAPICOM_CERTIFICATE_FIND_ROOT_NAME:3,CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME:4,CAPICOM_CERTIFICATE_FIND_EXTENSION:5,CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY:6,CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY:7,CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY:8,CAPICOM_CERTIFICATE_FIND_TIME_VALID:9,CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID:10,CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED:11,CAPICOM_CERTIFICATE_FIND_KEY_USAGE:12},Time:{AUTHENTICATED_ATTRIBUTE_SIGNING_TIME:0},Check:{CHECK_NONE:0,CHECK_TRUSTED_ROOT:1,CHECK_TIME_VALIDITY:2,CHECK_SIGNATURE_VALIDITY:4,CHECK_ONLINE_REVOCATION_STATUS:8,CHECK_OFFLINE_REVOCATION_STATUS:16,TRUST_IS_NOT_TIME_VALID:1,TRUST_IS_NOT_TIME_NESTED:2,TRUST_IS_REVOKED:4,TRUST_IS_NOT_SIGNATURE_VALID:8,TRUST_IS_NOT_VALID_FOR_USAGE:16,TRUST_IS_UNTRUSTED_ROOT:32,TRUST_REVOCATION_STATUS_UNKNOWN:64,TRUST_IS_CYCLIC:128,TRUST_IS_PARTIAL_CHAIN:65536,TRUST_CTL_IS_NOT_TIME_VALID:131072,TRUST_CTL_IS_NOT_SIGNATURE_VALID:262144,TRUST_CTL_IS_NOT_VALID_FOR_USAGE:524288},PropId:{CAPICOM_PROPID_UNKNOWN:0,CAPICOM_PROPID_KEY_PROV_HANDLE:1,CAPICOM_PROPID_KEY_PROV_INFO:2,CAPICOM_PROPID_SHA1_HASH:3,CAPICOM_PROPID_HASH_PROP:3,CAPICOM_PROPID_MD5_HASH:4,CAPICOM_PROPID_KEY_CONTEXT:5,CAPICOM_PROPID_KEY_SPEC:6,CAPICOM_PROPID_IE30_RESERVED:7,CAPICOM_PROPID_PUBKEY_HASH_RESERVED:8,CAPICOM_PROPID_ENHKEY_USAGE:9,CAPICOM_PROPID_CTL_USAGE:9,CAPICOM_PROPID_NEXT_UPDATE_LOCATION:10,CAPICOM_PROPID_FRIENDLY_NAME:11,CAPICOM_PROPID_PVK_FILE:12,CAPICOM_PROPID_DESCRIPTION:13,CAPICOM_PROPID_ACCESS_STATE:14,CAPICOM_PROPID_SIGNATURE_HASH:15,CAPICOM_PROPID_SMART_CARD_DATA:16,CAPICOM_PROPID_EFS:17,CAPICOM_PROPID_FORTEZZA_DATA:18,CAPICOM_PROPID_ARCHIVED:19,CAPICOM_PROPID_KEY_IDENTIFIER:20,CAPICOM_PROPID_AUTO_ENROLL:21,CAPICOM_PROPID_PUBKEY_ALG_PARA:22,CAPICOM_PROPID_CROSS_CERT_DIST_POINTS:23,CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH:24,CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH:25,CAPICOM_PROPID_ENROLLMENT:26,CAPICOM_PROPID_DATE_STAMP:27,CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH:28,CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH:29,CAPICOM_PROPID_EXTENDED_ERROR_INFO:30,CAPICOM_PROPID_RENEWAL:64,CAPICOM_PROPID_ARCHIVED_KEY_HASH:65,CAPICOM_PROPID_FIRST_RESERVED:66,CAPICOM_PROPID_LAST_RESERVED:32767,CAPICOM_PROPID_FIRST_USER:32768,CAPICOM_PROPID_LAST_USER:65535},SignatureType:{CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED:0,CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING:1,CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE:2},HashAlgorithm:{CADESCOM_HASH_ALGORITHM_CP_GOST_3411:100,CADESCOM_HASH_ALGORITHM_MD2:1,CADESCOM_HASH_ALGORITHM_MD4:2,CADESCOM_HASH_ALGORITHM_MD5:3,CADESCOM_HASH_ALGORITHM_SHA_256:4,CADESCOM_HASH_ALGORITHM_SHA_384:5,CADESCOM_HASH_ALGORITHM_SHA_512:6,CADESCOM_HASH_ALGORITHM_SHA1:0},CadesType:{CADESCOM_CADES_DEFAULT:0,CADESCOM_CADES_BES:1,CADESCOM_CADES_X_LONG_TYPE_1:93},ContentEncoding:{CADESCOM_BASE64_TO_BINARY:1,CADESCOM_STRING_TO_UCS2LE:0},StoreNames:{CAPICOM_MY_STORE:"My"},Chain:{CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT:0,CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN:1,CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY:2},GostXmlDSigUrls:{XmlDsigGost3410Url:"urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411",XmlDsigGost3411Url:"urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411",XmlDsigGost3410UrlObsolete:"http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411",XmlDsigGost3411UrlObsolete:"http://www.w3.org/2001/04/xmldsig-more#gostr3411"}}},function(e,t){e.exports={"1.2.840.113549.1.9.2":"Неструктурированное имя","1.2.643.3.141.1.1":"РНС ФСС","1.2.643.3.141.1.2":"КП ФСС","1.2.643.3.131.1.1":"ИНН","1.3.6.1.5.5.7.3.2":"Проверка подлинности клиента","1.3.6.1.5.5.7.3.4":"Защищенная электронная почта","1.2.643.3.8.100.1":'Сертификат типа "ekey-ГОСТ"',"1.2.643.3.8.100.1.1":"Общее использование в системах ИОК без права заверения финансовых документов","1.2.643.3.8.100.1.2":"Передача отчетности по ТКС","1.2.643.3.8.100.1.3":"Оформление взаимных обязательств, соглашений, договоров, актов и т.п.","1.2.643.3.8.100.1.4":"Внутрикорпоративный документооборот","1.2.643.3.8.100.1.5":"Использование в системах электронной торговли","1.2.643.3.8.100.1.6":'Использование в торгово-закупочной системе "ЭЛЕКТРА"',"1.2.643.6.2.1.7.2":"Использование физическим лицом в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских прав и обязанностей в отношении инвестиционных паев паевых инвестиционных фондов, в том числе отношения, связанные с учетом и/или фиксацией прав на инвестиционные паи паевых инвестиционных фондов","1.2.643.6.2.1.7.1":"Использование единоличным исполнительным органом юридического лица или уполномоченными представителями юридического лица в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских и иных прав и обязанностей в сфере негосударственного пенсионного обеспечения, негосударственного пенсионного страхования, в сфере деятельности паевых инвестиционных фондов, акционерных инвестиционных фондов, профессиональных участников рынка ценных бумаг, а также связанной с обслуживанием указанной деятельности услуг кредитных и иных организаций","1.3.6.1.4.1.29919.21":'Использование в системе Портал государственных закупок  Ростовской области "Рефери".',"1.2.643.3.2.100.65.13.11":'Использование в системе АИС "Госзакупки" Сахалинской области.',"1.2.643.3.8.100.1.7":"Использование в системе Портал государственных закупок Ставропольского края.","1.2.643.3.8.100.1.8":"Использование в Единой системе электронной торговли B2B-Center и B2G.","1.2.643.3.8.100.1.9":"Для участия в электронных торгах и подписания государственного контракта в  электронной площадке ОАО «ЕЭТП» уполномоченными лицами участников размещения  государственного или муниципального заказа","1.2.643.3.8.100.1.10":"Для участия в электронных торгах и подписания государственного контракта в  информационных системах Тендерного комитета города Москвы уполномоченными  лицами участников размещения государственного заказа города Москвы","1.2.643.3.8.100.1.11":"Подписание электронных документов в автоматизированной информационной  системе размещения государственного и муниципального заказа Саратовской области","1.2.643.3.8.100.1.12":"Использование в системе государственного заказа Иркутской области","1.2.643.3.8.100.1.13":"Использование в электронной торговой площадке агентства государственного  заказа Красноярского края","1.3.6.1.4.1.24138.1.1.8.1":'Обеспечение юридической значимости в Системе "Электронная Торговая Площадка"',"1.2.643.3.8.100.1.14":'Использование в электронной торговой площадке "Тендер"',"1.2.643.6.3":"Использование в электронных торговых системах и в программном обеспечении, связанным с обменом электронных сообщений","1.2.643.2.2.34.6":"Пользователь Центра Регистрации","1.2.643.2.39.1.1":'Использование в программных продуктах системы "1С:Предприятие 8"',"1.2.643.5.1.24.2.1.3":"Формирование документов для получения государственных  услуг в сфере ведения государственного кадастра недвижимости со стороны заявителя","1.2.643.5.1.24.2.1.3.1":"Формирование кадастровым инженером документов  для получения государственных услуг в сфере ведения государственного кадастра недвижимости со стороны  заявителя","1.2.643.5.1.24.2.2.2":"Формирование документов как результата оказания  услуги со стороны органов регистрации прав","1.2.643.5.1.24.2.2.3":"Формирование документов для получения государственных  услуг в сфере государственной регистрации прав на недвижимое имущество и сделок с ним со стороны заявителя","1.2.643.6.3.1.1":"Использование на электронных площадок отобранных для проведения аукционах в электронной форме","1.2.643.6.3.1.2.1":"Тип участника - Юридическое лицо","1.2.643.6.3.1.2.2":"Тип участника - Физическое лицо","1.2.643.6.3.1.2.3":"Тип участника - Индивидуальный предприниматель","1.2.643.6.3.1.3.1":"Участник размещения заказа","1.2.643.6.3.1.4.1":"Администратор организации","1.2.643.6.3.1.4.2":"Уполномоченный специалист","1.2.643.6.3.1.4.3":"Специалист с правом подписи контракта","1.3.643.3.8.100.15":'Использование в ЭТП "uTender"'}}]);
//# sourceMappingURL=1.crypto-pro.js.map