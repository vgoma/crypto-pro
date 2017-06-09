webpackJsonpcrypto_pro([0],[,,,function(e,t,n){function _(e){this._cert=e._cert,this.thumbprint=e.thumbprint,this.subjectName=e.subjectName,this.issuerName=e.issuerName,this.validFrom=e.validFrom,this.validTo=e.validTo}function s(){return new Promise(function(e,t){try{cadesplugin.CreateObject("CAdESCOM.About")}catch(e){t("Настройки ЭП на данной машине не верны")}e()})}function r(e){return new Promise(function(t,n){var _,s,r,C=cadesplugin.CreateObject("CAdESCOM.Store");if(!C)return void n("Не удалось получить доступ к хранилищу сертификатов");try{C.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE,cadesplugin.CAPICOM_MY_STORE,cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED)}catch(e){return void n("Ошибка при открытии хранилища: "+e.message)}try{_=C.Certificates,s=_.Count}catch(e){return void n("Ошибка получения списка сертификатов: "+e.message)}if(!s)return void n("Нет доступных сертификатов");try{if(_=_.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,e),!_.Count)throw new Error(e);r=_.Item(1)}catch(e){return void n("Не удалось получить сертификат по хэшу: "+e.message)}C.Close(),t(r)})}function C(e,t){var n=this._cert;return new Promise(function(_,s){var r;try{r=n[t]}catch(e){return void s("Ошибка при извлечении данных из сертификата: ",e.message)}_(P.parseCertInfo(e,r))})}function i(e){return new Promise(function(t,n){if(!e&&T)return void t(T);var s,r,C,i=cadesplugin.CreateObject("CAdESCOM.Store"),a=[];try{i.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE,cadesplugin.CAPICOM_MY_STORE,cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED)}catch(e){return void n("Ошибка при открытии хранилища: "+e.message)}try{(s=i.Certificates)&&(s=s.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID),s=s.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,S.PropId.CAPICOM_PROPID_KEY_PROV_INFO),r=s.Count)}catch(e){return void n("Ошибка получения списка сертификатов: "+e.message)}if(!r)return void n("Нет доступных сертификатов");try{for(;r;)C=s.Item(r),a.push(new _({_cert:C,thumbprint:C.Thumbprint,subjectName:C.SubjectName,issuerName:C.IssuerName,validFrom:C.ValidFromDate,validTo:C.ValidToDate})),r--}catch(e){return void n("Ошибка обработки сертификатов: "+e.message)}i.Close(),T=P.prepareCertsInfo(a),t(T)})}function a(e){return new Promise(function(t,n){if(!e)return void n("Хэш не указан");i().then(function(_){var s;_.some(function(t){if(e===t.thumbprint)return s=t,!0}),s?t(s):n('Сертификат с хэшем: "'+e+'" не найден')},n)})}function o(e,t,n){return n=void 0===n||Boolean(n),new Promise(function(_,s){r(e).then(function(e){var r,C,i=new Date,a=cadesplugin.CreateObject("CADESCOM.CPAttribute"),o=cadesplugin.CreateObject("CAdESCOM.CadesSignedData"),I=cadesplugin.CreateObject("CAdESCOM.CPSigner");i=P.getDateObj(i);try{a.Name=S.Time.AUTHENTICATED_ATTRIBUTE_SIGNING_TIME,a.Value=i}catch(e){return void s("Ошибка при установке данных подписи: "+e.message)}try{I.Certificate=e,r=I.AuthenticatedAttributes2,r.Add(a),o.ContentEncoding=cadesplugin.CADESCOM_BASE64_TO_BINARY,o.Content=t,I.Options=cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY}catch(e){return void s("Не удалось установить настройки для подписи: "+e.message)}try{C=o.SignCades(I,cadesplugin.CADESCOM_CADES_BES,n)}catch(e){return void s("Не удалось создать подпись: "+e.message)}_(C)},s)})}function I(e,t){return new Promise(function(n,_){r(e).then(function(e){var s,r=cadesplugin.CreateObject("CAdESCOM.CPSigner"),C=cadesplugin.CreateObject("CAdESCOM.SignedXML"),i=S;try{r.Certificate=e,C.Content=t,C.SignatureType=i.SignatureType.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED,C.SignatureMethod=i.GostXmlDSigUrls.XmlDsigGost3410Url,C.DigestMethod=i.GostXmlDSigUrls.XmlDsigGost3411Url}catch(e){return void _("Не удалось установить настройки для подписи: "+e.message)}try{s=C.Sign(r)}catch(e){return void _("Не удалось создать подпись: "+e.message)}n(s)},_)})}function E(){var e=P.getEnvInfo();return new Promise(function(t,n){var _;try{_=cadesplugin.CreateObject("CAdESCOM.About"),e.cadesVersion=_.PluginVersion,e.cspVersion=_.CSPVersion(),e.cadesVersion||(e.cadesVersion=_.Version),e.cadesVersion=e.cadesVersion.toString(),e.cspVersion=e.cspVersion.toString(),t(e)}catch(e){n("Ошибка при получении информации о системе: ",e.message)}})}function O(e){return new Promise(function(t){t(P.isValidCSPVersion(e))})}function A(e){return new Promise(function(t){t(P.isValidCadesVersion(e))})}var T,P=n(6),S=n(7);_.prototype.isValid=function(){var e=this._cert;return new Promise(function(t,n){var _;try{_=e.IsValid(),_=_.Result}catch(e){return void n("Ошибка при проверке сертификата: ",e.message)}t(_)})},_.prototype.getProp=function(e){var t=this._cert;return new Promise(function(n,_){var s;try{s=t[e]}catch(e){return void _("Ошибка при обращении к свойству сертификата: ",e.message)}n(s)})},_.prototype.exportBase64=function(){var e=this._cert;return new Promise(function(t,n){var _;try{_=e.Export(0)}catch(e){return void n("Ошибка при экспорте сертификата: ",e.message)}t(_)})},_.prototype.getAlgorithm=function(){var e=this._cert;return new Promise(function(t,n){var _,s={};try{_=e.PublicKey(),_=_.Algorithm,s.algorithm=_.FriendlyName,s.oid=_.Value}catch(e){return void n("Ошибка при получении алгоритма: ",e.message)}t(s)})},_.prototype.getOwnerInfo=function(){return C.call(this,P.subjectNameTagsTranslations,"SubjectName")},_.prototype.getIssuerInfo=function(){return C.call(this,P.issuerNameTagsTranslations,"IssuerName")},_.prototype.getExtendedKeyUsage=function(){var e=this._cert;return new Promise(function(t,n){var _,s,r=[];try{if(_=e.ExtendedKeyUsage(),_=_.EKUs,(_=_.Count)>0)for(;_>0;)s=e.ExtendedKeyUsage(),s=s.EKUs,s=s.Item(_),s=s.OID,r.push(s),_--}catch(e){return void n("Ошибка при получении ОИД'ов: ",e.message)}t(r)})},_.prototype.getDecodedExtendedKeyUsage=P.getDecodedExtendedKeyUsage,_.prototype.hasExtendedKeyUsage=P.hasExtendedKeyUsage,e.exports={isValidEDSSettings:s,getCertsList:i,getCert:a,signData:o,signDataXML:I,getSystemInfo:E,isValidCSPVersion:O,isValidCadesVersion:A}},,,function(e,t,n){function _(e,t){var n=t.match(/([а-яА-Яa-zA-Z0-9\.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);return n&&(n=n.map(function(t){var n,_=t.match(/^([а-яА-Яa-zA-Z0-9\.]+)=(.+?),?$/),s=_&&_[1],r=_&&_[2],C=!1;return/^OID./.test(s)&&(n=s.match(/^OID\.(.*)/))&&n[1]&&(n=A[n[1]])&&(s=n),r=r.replace(/^"(.*)"/,"$1"),r=r.replace(/"{2}/g,'"'),e.some(function(e){return e.possibleNames.some(function(t){var n=t===s;return n&&(s=e.translation,C=!0),n})}),{title:s,descr:r,translated:C}})),n}function s(e){return e=new Date(e),([e.getDate(),e.getMonth()+1,e.getFullYear()].join(".")+" "+[e.getHours(),e.getMinutes(),e.getSeconds()].join(":")).replace(/\b(\d)\b/g,"0$1")}function r(e){return O.msie?e.getVarDate():e}function C(e){return e.map(function(e){return e.name=e.subjectName.match(/CN=(.+?),/),e.name&&e.name[1]&&(e.name=e.name[1]),e.validFrom=s(e.validFrom),e.validTo=s(e.validTo),e.label=e.name+" (до "+e.validTo+")",e})}function i(){var e=this;return new Promise(function(t){e.getExtendedKeyUsage().then(function(e){t(e.reduce(function(e,t){return t={id:t,descr:A[t]||null},t.descr?e.unshift(t):e.push(t),e},[]))})})}function a(e){var t=this;return new Promise(function(n){t.getExtendedKeyUsage().then(function(t){var _;_=Array.isArray(e)?e.every(function(e){return t.some(function(t){return t===e})}):t.some(function(t){return t===e}),n(_)})})}function o(){var e=O._detect(navigator.userAgent),t={browserName:e.name,browserVersion:e.version};return e.mac?t.os="Mac":e.windows?t.os="Windows":e.linux&&(t.os="Linux"),t}function I(e){return(e=e.match(/\d+?\b(?:\.\d+)?/))>=3.6}function E(e){return e=e.split(".").reduce(function(e,t,n){return 0===n?e.major=t:1===n?e.minor=t:2===n&&(e.patch=t),e},{}),!(e.major<2)&&e.patch>=12438}var O=n(0),A=n(8),T=[{possibleNames:["UnstructuredName"],translation:"Неструктурированное имя"},{possibleNames:["CN"],translation:"Владелец"},{possibleNames:["SN"],translation:"Фамилия"},{possibleNames:["G"],translation:"Имя Отчество"},{possibleNames:["C"],translation:"Страна"},{possibleNames:["S"],translation:"Регион"},{possibleNames:["STREET"],translation:"Адрес"},{possibleNames:["O"],translation:"Компания"},{possibleNames:["OU"],translation:"Отдел/подразделение"},{possibleNames:["T"],translation:"Должность"},{possibleNames:["ОГРН","OGRN"],translation:"ОГРН"},{possibleNames:["ОГРНИП","OGRNIP"],translation:"ОГРНИП"},{possibleNames:["СНИЛС","SNILS"],translation:"СНИЛС"},{possibleNames:["ИНН","INN"],translation:"ИНН"},{possibleNames:["E"],translation:"Email"},{possibleNames:["L"],translation:"Город"}],P=[{possibleNames:["UnstructuredName"],translation:"Неструктурированное имя"},{possibleNames:["CN"],translation:"Удостоверяющий центр"},{possibleNames:["S"],translation:"Регион"},{possibleNames:["C"],translation:"Страна"},{possibleNames:["STREET"],translation:"Адрес"},{possibleNames:["O"],translation:"Компания"},{possibleNames:["OU"],translation:"Тип"},{possibleNames:["T"],translation:"Должность"},{possibleNames:["ОГРН","OGRN"],translation:"ОГРН"},{possibleNames:["ОГРНИП","OGRNIP"],translation:"ОГРНИП"},{possibleNames:["СНИЛС","SNILS"],translation:"СНИЛС"},{possibleNames:["ИНН","INN"],translation:"ИНН"},{possibleNames:["E"],translation:"Email"},{possibleNames:["L"],translation:"Город"}];e.exports={subjectNameTagsTranslations:T,issuerNameTagsTranslations:P,parseCertInfo:_,getReadableDate:s,getDateObj:r,prepareCertsInfo:C,getDecodedExtendedKeyUsage:i,hasExtendedKeyUsage:a,getEnvInfo:o,isValidCSPVersion:I,isValidCadesVersion:E}},function(e,t){e.exports={StoreLocation:{CAPICOM_MEMORY_STORE:0,CAPICOM_LOCAL_MACHINE_STORE:1,CAPICOM_CURRENT_USER_STORE:2,CAPICOM_ACTIVE_DIRECTORY_USER_STORE:3,CAPICOM_SMART_CARD_USER_STORE:4},StoreOpenMode:{CAPICOM_STORE_OPEN_READ_ONLY:0,CAPICOM_STORE_OPEN_READ_WRITE:1,CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED:2,CAPICOM_STORE_OPEN_EXISTING_ONLY:128,CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED:256},CertFindType:{CAPICOM_CERTIFICATE_FIND_SHA1_HASH:0,CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME:1,CAPICOM_CERTIFICATE_FIND_ISSUER_NAME:2,CAPICOM_CERTIFICATE_FIND_ROOT_NAME:3,CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME:4,CAPICOM_CERTIFICATE_FIND_EXTENSION:5,CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY:6,CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY:7,CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY:8,CAPICOM_CERTIFICATE_FIND_TIME_VALID:9,CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID:10,CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED:11,CAPICOM_CERTIFICATE_FIND_KEY_USAGE:12},Time:{AUTHENTICATED_ATTRIBUTE_SIGNING_TIME:0},Check:{CHECK_NONE:0,CHECK_TRUSTED_ROOT:1,CHECK_TIME_VALIDITY:2,CHECK_SIGNATURE_VALIDITY:4,CHECK_ONLINE_REVOCATION_STATUS:8,CHECK_OFFLINE_REVOCATION_STATUS:16,TRUST_IS_NOT_TIME_VALID:1,TRUST_IS_NOT_TIME_NESTED:2,TRUST_IS_REVOKED:4,TRUST_IS_NOT_SIGNATURE_VALID:8,TRUST_IS_NOT_VALID_FOR_USAGE:16,TRUST_IS_UNTRUSTED_ROOT:32,TRUST_REVOCATION_STATUS_UNKNOWN:64,TRUST_IS_CYCLIC:128,TRUST_IS_PARTIAL_CHAIN:65536,TRUST_CTL_IS_NOT_TIME_VALID:131072,TRUST_CTL_IS_NOT_SIGNATURE_VALID:262144,TRUST_CTL_IS_NOT_VALID_FOR_USAGE:524288},PropId:{CAPICOM_PROPID_UNKNOWN:0,CAPICOM_PROPID_KEY_PROV_HANDLE:1,CAPICOM_PROPID_KEY_PROV_INFO:2,CAPICOM_PROPID_SHA1_HASH:3,CAPICOM_PROPID_HASH_PROP:3,CAPICOM_PROPID_MD5_HASH:4,CAPICOM_PROPID_KEY_CONTEXT:5,CAPICOM_PROPID_KEY_SPEC:6,CAPICOM_PROPID_IE30_RESERVED:7,CAPICOM_PROPID_PUBKEY_HASH_RESERVED:8,CAPICOM_PROPID_ENHKEY_USAGE:9,CAPICOM_PROPID_CTL_USAGE:9,CAPICOM_PROPID_NEXT_UPDATE_LOCATION:10,CAPICOM_PROPID_FRIENDLY_NAME:11,CAPICOM_PROPID_PVK_FILE:12,CAPICOM_PROPID_DESCRIPTION:13,CAPICOM_PROPID_ACCESS_STATE:14,CAPICOM_PROPID_SIGNATURE_HASH:15,CAPICOM_PROPID_SMART_CARD_DATA:16,CAPICOM_PROPID_EFS:17,CAPICOM_PROPID_FORTEZZA_DATA:18,CAPICOM_PROPID_ARCHIVED:19,CAPICOM_PROPID_KEY_IDENTIFIER:20,CAPICOM_PROPID_AUTO_ENROLL:21,CAPICOM_PROPID_PUBKEY_ALG_PARA:22,CAPICOM_PROPID_CROSS_CERT_DIST_POINTS:23,CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH:24,CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH:25,CAPICOM_PROPID_ENROLLMENT:26,CAPICOM_PROPID_DATE_STAMP:27,CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH:28,CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH:29,CAPICOM_PROPID_EXTENDED_ERROR_INFO:30,CAPICOM_PROPID_RENEWAL:64,CAPICOM_PROPID_ARCHIVED_KEY_HASH:65,CAPICOM_PROPID_FIRST_RESERVED:66,CAPICOM_PROPID_LAST_RESERVED:32767,CAPICOM_PROPID_FIRST_USER:32768,CAPICOM_PROPID_LAST_USER:65535},SignatureType:{CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED:0,CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING:1,CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE:2},HashAlgorithm:{CADESCOM_HASH_ALGORITHM_CP_GOST_3411:100,CADESCOM_HASH_ALGORITHM_MD2:1,CADESCOM_HASH_ALGORITHM_MD4:2,CADESCOM_HASH_ALGORITHM_MD5:3,CADESCOM_HASH_ALGORITHM_SHA_256:4,CADESCOM_HASH_ALGORITHM_SHA_384:5,CADESCOM_HASH_ALGORITHM_SHA_512:6,CADESCOM_HASH_ALGORITHM_SHA1:0},CadesType:{CADESCOM_CADES_DEFAULT:0,CADESCOM_CADES_BES:1,CADESCOM_CADES_X_LONG_TYPE_1:93},ContentEncoding:{CADESCOM_BASE64_TO_BINARY:1,CADESCOM_STRING_TO_UCS2LE:0},StoreNames:{CAPICOM_MY_STORE:"My"},Chain:{CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT:0,CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN:1,CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY:2},GostXmlDSigUrls:{XmlDsigGost3410Url:"urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411",XmlDsigGost3411Url:"urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411",XmlDsigGost3410UrlObsolete:"http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411",XmlDsigGost3411UrlObsolete:"http://www.w3.org/2001/04/xmldsig-more#gostr3411"}}},function(e,t){e.exports={"1.2.840.113549.1.9.2":"Неструктурированное имя","1.2.643.3.141.1.1":"РНС ФСС","1.2.643.3.141.1.2":"КП ФСС","1.2.643.3.131.1.1":"ИНН","1.3.6.1.5.5.7.3.2":"Проверка подлинности клиента","1.3.6.1.5.5.7.3.4":"Защищенная электронная почта","1.2.643.3.8.100.1":'Сертификат типа "ekey-ГОСТ"',"1.2.643.3.8.100.1.1":"Общее использование в системах ИОК без права заверения финансовых документов","1.2.643.3.8.100.1.2":"Передача отчетности по ТКС","1.2.643.3.8.100.1.3":"Оформление взаимных обязательств, соглашений, договоров, актов и т.п.","1.2.643.3.8.100.1.4":"Внутрикорпоративный документооборот","1.2.643.3.8.100.1.5":"Использование в системах электронной торговли","1.2.643.3.8.100.1.6":'Использование в торгово-закупочной системе "ЭЛЕКТРА"',"1.2.643.6.2.1.7.2":"Использование физическим лицом в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских прав и обязанностей в отношении инвестиционных паев паевых инвестиционных фондов, в том числе отношения, связанные с учетом и/или фиксацией прав на инвестиционные паи паевых инвестиционных фондов","1.2.643.6.2.1.7.1":"Использование единоличным исполнительным органом юридического лица или уполномоченными представителями юридического лица в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских и иных прав и обязанностей в сфере негосударственного пенсионного обеспечения, негосударственного пенсионного страхования, в сфере деятельности паевых инвестиционных фондов, акционерных инвестиционных фондов, профессиональных участников рынка ценных бумаг, а также связанной с обслуживанием указанной деятельности услуг кредитных и иных организаций","1.3.6.1.4.1.29919.21":'Использование в системе Портал государственных закупок  Ростовской области "Рефери".',"1.2.643.3.2.100.65.13.11":'Использование в системе АИС "Госзакупки" Сахалинской области.',"1.2.643.3.8.100.1.7":"Использование в системе Портал государственных закупок Ставропольского края.","1.2.643.3.8.100.1.8":"Использование в Единой системе электронной торговли B2B-Center и B2G.","1.2.643.3.8.100.1.9":"Для участия в электронных торгах и подписания государственного контракта в  электронной площадке ОАО «ЕЭТП» уполномоченными лицами участников размещения  государственного или муниципального заказа","1.2.643.3.8.100.1.10":"Для участия в электронных торгах и подписания государственного контракта в  информационных системах Тендерного комитета города Москвы уполномоченными  лицами участников размещения государственного заказа города Москвы","1.2.643.3.8.100.1.11":"Подписание электронных документов в автоматизированной информационной  системе размещения государственного и муниципального заказа Саратовской области","1.2.643.3.8.100.1.12":"Использование в системе государственного заказа Иркутской области","1.2.643.3.8.100.1.13":"Использование в электронной торговой площадке агентства государственного  заказа Красноярского края","1.3.6.1.4.1.24138.1.1.8.1":'Обеспечение юридической значимости в Системе "Электронная Торговая Площадка"',"1.2.643.3.8.100.1.14":'Использование в электронной торговой площадке "Тендер"',"1.2.643.6.3":"Использование в электронных торговых системах и в программном обеспечении, связанным с обменом электронных сообщений","1.2.643.2.2.34.6":"Пользователь Центра Регистрации","1.2.643.2.39.1.1":'Использование в программных продуктах системы "1С:Предприятие 8"',"1.2.643.5.1.24.2.1.3":"Формирование документов для получения государственных  услуг в сфере ведения государственного кадастра недвижимости со стороны заявителя","1.2.643.5.1.24.2.1.3.1":"Формирование кадастровым инженером документов  для получения государственных услуг в сфере ведения государственного кадастра недвижимости со стороны  заявителя","1.2.643.5.1.24.2.2.2":"Формирование документов как результата оказания  услуги со стороны органов регистрации прав","1.2.643.5.1.24.2.2.3":"Формирование документов для получения государственных  услуг в сфере государственной регистрации прав на недвижимое имущество и сделок с ним со стороны заявителя","1.2.643.6.3.1.1":"Использование на электронных площадок отобранных для проведения аукционах в электронной форме","1.2.643.6.3.1.2.1":"Тип участника - Юридическое лицо","1.2.643.6.3.1.2.2":"Тип участника - Физическое лицо","1.2.643.6.3.1.2.3":"Тип участника - Индивидуальный предприниматель","1.2.643.6.3.1.3.1":"Участник размещения заказа","1.2.643.6.3.1.4.1":"Администратор организации","1.2.643.6.3.1.4.2":"Уполномоченный специалист","1.2.643.6.3.1.4.3":"Специалист с правом подписи контракта","1.3.643.3.8.100.15":'Использование в ЭТП "uTender"'}}]);
//# sourceMappingURL=0.crypto-pro.js.map