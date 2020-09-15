(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cryptoPro", [], factory);
	else if(typeof exports === 'object')
		exports["cryptoPro"] = factory();
	else
		root["cryptoPro"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./crypto-pro.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/certificate/certificate.ts":
/*!****************************************!*\
  !*** ./api/certificate/certificate.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ../../constants */ "./constants/index.ts");
const exportBase64_1 = __webpack_require__(/*! ./exportBase64 */ "./api/certificate/exportBase64.ts");
const getAlgorithm_1 = __webpack_require__(/*! ./getAlgorithm */ "./api/certificate/getAlgorithm.ts");
const getCadesProp_1 = __webpack_require__(/*! ./getCadesProp */ "./api/certificate/getCadesProp.ts");
const getDecodedExtendedKeyUsage_1 = __webpack_require__(/*! ./getDecodedExtendedKeyUsage */ "./api/certificate/getDecodedExtendedKeyUsage.ts");
const getExtendedKeyUsage_1 = __webpack_require__(/*! ./getExtendedKeyUsage */ "./api/certificate/getExtendedKeyUsage.ts");
const getInfo_1 = __webpack_require__(/*! ./getInfo */ "./api/certificate/getInfo.ts");
const hasExtendedKeyUsage_1 = __webpack_require__(/*! ./hasExtendedKeyUsage */ "./api/certificate/hasExtendedKeyUsage.ts");
const isValid_1 = __webpack_require__(/*! ./isValid */ "./api/certificate/isValid.ts");
class Certificate {
    constructor(_cadesCertificate, name, issuerName, subjectName, thumbprint, validFrom, validTo) {
        this._cadesCertificate = _cadesCertificate;
        this.name = name;
        this.issuerName = issuerName;
        this.subjectName = subjectName;
        this.thumbprint = thumbprint;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }
    getOwnerInfo() {
        return getInfo_1.getInfo.call(this, constants_1.SUBJECT_TAGS_TRANSLATIONS, 'SubjectName');
    }
    getIssuerInfo() {
        return getInfo_1.getInfo.call(this, constants_1.ISSUER_TAGS_TRANSLATIONS, 'IssuerName');
    }
    getExtendedKeyUsage() {
        return getExtendedKeyUsage_1.getExtendedKeyUsage.call(this);
    }
    getDecodedExtendedKeyUsage() {
        return getDecodedExtendedKeyUsage_1.getDecodedExtendedKeyUsage.call(this);
    }
    getAlgorithm() {
        return getAlgorithm_1.getAlgorithm.call(this);
    }
    getCadesProp(propName) {
        return getCadesProp_1.getCadesProp.call(this, propName);
    }
    isValid() {
        return isValid_1.isValid.call(this);
    }
    exportBase64() {
        return exportBase64_1.exportBase64.call(this);
    }
    hasExtendedKeyUsage(oids) {
        return hasExtendedKeyUsage_1.hasExtendedKeyUsage.call(this, oids);
    }
}
exports.Certificate = Certificate;


/***/ }),

/***/ "./api/certificate/exportBase64.ts":
/*!*****************************************!*\
  !*** ./api/certificate/exportBase64.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Экспортирует сертификат в формате base64
 *
 * @returns сертификат в формате base64
 */
exports.exportBase64 = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    const cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function exportBase64() {
        let base64;
        try {
            base64 = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.Export(0);
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при экспорте сертификата');
        }
        return base64;
    }));
});


/***/ }),

/***/ "./api/certificate/getAlgorithm.ts":
/*!*****************************************!*\
  !*** ./api/certificate/getAlgorithm.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает информацию об алгоритме сертификата
 *
 * @returns информацию об алгоритме и его OID'е
 */
exports.getAlgorithm = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    const cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function getAlgorithm() {
        const algorithmInfo = {
            algorithm: null,
            oid: null,
        };
        let cadesPublicKey;
        try {
            cadesPublicKey = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.PublicKey();
            cadesPublicKey = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.Algorithm;
            algorithmInfo.algorithm = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.FriendlyName;
            algorithmInfo.oid = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.Value;
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при получении алгоритма');
        }
        return algorithmInfo;
    }));
});


/***/ }),

/***/ "./api/certificate/getCadesProp.ts":
/*!*****************************************!*\
  !*** ./api/certificate/getCadesProp.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает указанное внутренее свойство у сертификата в формате Cades
 *
 * @param propName = наименование свойства
 * @returns значение запрошенного свойства
 */
exports.getCadesProp = _afterPluginsLoaded_1._afterPluginsLoaded(function (propName) {
    const cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function getCadesProp() {
        let propertyValue;
        try {
            propertyValue = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate[propName];
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при обращении к свойству сертификата');
        }
        return propertyValue;
    }));
});


/***/ }),

/***/ "./api/certificate/getDecodedExtendedKeyUsage.ts":
/*!*******************************************************!*\
  !*** ./api/certificate/getDecodedExtendedKeyUsage.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ../../constants */ "./constants/index.ts");
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
/**
 * Возвращает расшифрованные ОИД'ы сертификата
 *
 * @returns словарь расшифрованных ОИД'ов
 */
exports.getDecodedExtendedKeyUsage = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const certificateOids = yield this.getExtendedKeyUsage();
        return certificateOids.reduce((decodedOids, oidCode) => (Object.assign(Object.assign({}, decodedOids), { [oidCode]: constants_1.OIDS_DICTIONARY[oidCode] || null })), {});
    });
});


/***/ }),

/***/ "./api/certificate/getExtendedKeyUsage.ts":
/*!************************************************!*\
  !*** ./api/certificate/getExtendedKeyUsage.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает ОИД'ы сертификата
 *
 * @returns список ОИД'ов
 */
exports.getExtendedKeyUsage = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    const cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function getExtendedKeyUsage() {
        const OIDS = [];
        let count;
        try {
            count = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
            count = _generateCadesFn_1.__cadesAsyncToken__ + count.EKUs;
            count = _generateCadesFn_1.__cadesAsyncToken__ + count.Count;
            if (count > 0) {
                while (count > 0) {
                    let cadesExtendedKeyUsage;
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.EKUs;
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.Item(count);
                    cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.OID;
                    OIDS.push(cadesExtendedKeyUsage);
                    count--;
                }
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "Ошибка при получении ОИД'ов");
        }
        return OIDS;
    }));
});


/***/ }),

/***/ "./api/certificate/getInfo.ts":
/*!************************************!*\
  !*** ./api/certificate/getInfo.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _parseCertInfo_1 = __webpack_require__(/*! ../../helpers/_parseCertInfo */ "./helpers/_parseCertInfo.ts");
const getCadesProp_1 = __webpack_require__(/*! ./getCadesProp */ "./api/certificate/getCadesProp.ts");
/**
 * Возвращает расшифрованную информацию о сертификате из указанного свойства по тэгам
 *
 * @param tags = словарь
 * @param entitiesPath = путь к разбираемой сущности
 * @returns расшифрованная информация по отдельным тэгам
 */
exports.getInfo = _afterPluginsLoaded_1._afterPluginsLoaded(function (tags, entitiesPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let entities;
        try {
            entities = yield getCadesProp_1.getCadesProp.call(this, entitiesPath);
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при извлечении информации из сертификата');
        }
        return _parseCertInfo_1._parseCertInfo(tags, entities);
    });
});


/***/ }),

/***/ "./api/certificate/hasExtendedKeyUsage.ts":
/*!************************************************!*\
  !*** ./api/certificate/hasExtendedKeyUsage.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
/**
 * Проверяет наличие ОИД'а (ОИД'ов) у сертификата
 *
 * @param oids - ОИД'ы для проверки
 * @returns флаг наличия ОИД'ов у сертификата
 */
exports.hasExtendedKeyUsage = _afterPluginsLoaded_1._afterPluginsLoaded(function (oids) {
    return __awaiter(this, void 0, void 0, function* () {
        const certOids = yield this.getExtendedKeyUsage();
        let result;
        if (Array.isArray(oids)) {
            result = oids.every((oidToCheck) => certOids.some((certOid) => certOid === oidToCheck));
        }
        else {
            result = certOids.some((certOid) => certOid === oids);
        }
        return result;
    });
});


/***/ }),

/***/ "./api/certificate/index.ts":
/*!**********************************!*\
  !*** ./api/certificate/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./certificate */ "./api/certificate/certificate.ts"));


/***/ }),

/***/ "./api/certificate/isValid.ts":
/*!************************************!*\
  !*** ./api/certificate/isValid.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Проверяет действительность сертификата
 *
 * @returns флаг валидности
 */
exports.isValid = _afterPluginsLoaded_1._afterPluginsLoaded(function () {
    const cadesCertificate = this._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function isValid() {
        let isValid;
        try {
            isValid = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.IsValid();
            isValid = _generateCadesFn_1.__cadesAsyncToken__ + isValid.Result;
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при проверке сертификата');
        }
        return Boolean(isValid);
    }));
});


/***/ }),

/***/ "./api/createCoSignature.ts":
/*!**********************************!*\
  !*** ./api/createCoSignature.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
exports.createCoSignature = _afterPluginsLoaded_1._afterPluginsLoaded((oCertificate, oHashedData, sSignedMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const { cadesplugin } = window;
    const cadesCertificate = oCertificate._cadesCertificate;
    const algorithm = yield oHashedData.Algorithm;
    const hashValue = yield oHashedData.Value;
    return eval(_generateCadesFn_1._generateCadesFn(function createCoSignature() {
        let cadesAttrs;
        let cadesSigner;
        let cadesSignedData;
        let cadesHashedData;
        try {
            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
            cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_Algorithm(algorithm));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.SetHashValue(hashValue));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для верификации');
        }
        try {
            cadesSignedData.VerifyHash(cadesHashedData, sSignedMessage, cadesplugin.CADESCOM_BASE64_TO_BINARY);
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при верификации данных');
        }
        try {
            cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
            cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }
        const currentTime = _getDateObj_1._getDateObj(new Date());
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при установке времени подписи');
        }
        let cadesAuthAttrs;
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
            cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
        }
        let signature;
        try {
            signature =
                _generateCadesFn_1.__cadesAsyncToken__ +
                    cadesSignedData.CoSignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_CADES_BES);
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || e);
        }
        return signature;
    }));
}));


/***/ }),

/***/ "./api/createHashSignature.ts":
/*!************************************!*\
  !*** ./api/createHashSignature.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
const _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
exports.createHashSignature = _afterPluginsLoaded_1._afterPluginsLoaded((oCertificate, oHashedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { cadesplugin } = window;
    const cadesCertificate = oCertificate._cadesCertificate;
    const algorithm = yield oHashedData.Algorithm;
    const hashValue = yield oHashedData.Value;
    return eval(_generateCadesFn_1._generateCadesFn(function createHashSignature() {
        let cadesAttrs;
        let cadesSignedData;
        let cadesSigner;
        let cadesHashedData;
        try {
            cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
            cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
            cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }
        const currentTime = _getDateObj_1._getDateObj(new Date());
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при установке времени подписи');
        }
        let cadesAuthAttrs;
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
            cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_Algorithm(algorithm));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(constants_1.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.SetHashValue(hashValue));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
        }
        let signature;
        try {
            signature =
                _generateCadesFn_1.__cadesAsyncToken__ +
                    cadesSignedData.SignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_CADES_BES);
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || e);
        }
        return signature;
    }));
}));


/***/ }),

/***/ "./api/createSignature.ts":
/*!********************************!*\
  !*** ./api/createSignature.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
const _getCadesCert_1 = __webpack_require__(/*! ../helpers/_getCadesCert */ "./helpers/_getCadesCert.ts");
const _getDateObj_1 = __webpack_require__(/*! ../helpers/_getDateObj */ "./helpers/_getDateObj.ts");
/**
 * Создает подпись base64 строки по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param dataBase64 - строковые данные в формате base64
 * @param detachedSignature = true - тип подписи открепленная (true) / присоединенная (false)
 * @returns подпись
 */
exports.createSignature = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint, dataBase64, detachedSignature = true) => __awaiter(void 0, void 0, void 0, function* () {
    const { cadesplugin } = window;
    const cadesCertificate = yield _getCadesCert_1._getCadesCert(thumbprint);
    return eval(_generateCadesFn_1._generateCadesFn(function createSignature() {
        let cadesAttrs;
        let cadesSignedData;
        let cadesSigner;
        try {
            cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CADESCOM.CPAttribute');
            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
            cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPSigner');
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }
        const currentTime = _getDateObj_1._getDateObj(new Date());
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при установке времени подписи');
        }
        let cadesAuthAttrs;
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
            cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_Content(dataBase64));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY));
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }
        let signature;
        try {
            signature =
                _generateCadesFn_1.__cadesAsyncToken__ +
                    cadesSignedData.SignCades(cadesSigner, cadesplugin.CADESCOM_CADES_BES, detachedSignature);
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }
        return signature;
    }));
}));


/***/ }),

/***/ "./api/decryptEnvelopedData.ts":
/*!*************************************!*\
  !*** ./api/decryptEnvelopedData.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
exports.decryptEvelopedData = _afterPluginsLoaded_1._afterPluginsLoaded((sSignedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { cadesplugin } = window;
    return eval(_generateCadesFn_1._generateCadesFn(function decryptEnvelopedData() {
        let cadesEnvelopedData;
        try {
            cadesEnvelopedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для проверки подписи');
        }
        let encData;
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Decrypt(sSignedData));
            encData = _generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Content;
        }
        catch (e) {
            console.log(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка расшифровки подписанного сообщения');
        }
        return encData;
    }));
}));


/***/ }),

/***/ "./api/encryptEnvelopedData.ts":
/*!*************************************!*\
  !*** ./api/encryptEnvelopedData.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
exports.encryptEnvelopedData = _afterPluginsLoaded_1._afterPluginsLoaded((oCertificate, dataBase64) => __awaiter(void 0, void 0, void 0, function* () {
    const { cadesplugin } = window;
    const cadesCertificate = oCertificate._cadesCertificate;
    return eval(_generateCadesFn_1._generateCadesFn(function encryptEnvelopedData() {
        let cadesEnvelopedData;
        try {
            cadesEnvelopedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }
        const cadesReceipients = _generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Recipients;
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.propset_Content(dataBase64));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesReceipients.Add(cadesCertificate));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
        }
        let signature;
        try {
            signature = _generateCadesFn_1.__cadesAsyncToken__ + cadesEnvelopedData.Encrypt();
        }
        catch (e) {
            console.error(e);
        }
        return signature;
    }));
}));


/***/ }),

/***/ "./api/getCertificate.ts":
/*!*******************************!*\
  !*** ./api/getCertificate.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const getUserCertificates_1 = __webpack_require__(/*! ./getUserCertificates */ "./api/getUserCertificates.ts");
/**
 * Возвращает сертификат по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат
 */
exports.getCertificate = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint) => __awaiter(void 0, void 0, void 0, function* () {
    if (!thumbprint) {
        throw new Error('Отпечаток не указан');
    }
    const availableCertificates = yield getUserCertificates_1.getUserCertificates();
    const foundCertificate = availableCertificates.find((cert) => cert.thumbprint === thumbprint);
    if (!foundCertificate) {
        throw new Error(`Сертификат с отпечатком: "${thumbprint}" не найден`);
    }
    return foundCertificate;
}));


/***/ }),

/***/ "./api/getHashedData.ts":
/*!******************************!*\
  !*** ./api/getHashedData.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
exports.getHashedData = _afterPluginsLoaded_1._afterPluginsLoaded((hashAlg) => __awaiter(void 0, void 0, void 0, function* () {
    return eval(_generateCadesFn_1._generateCadesFn(function createHashedData() {
        let oHashedData;
        try {
            oHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'не удалось получить хэш функцию');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + oHashedData.propset_Algorithm(hashAlg));
            void (_generateCadesFn_1.__cadesAsyncToken__ + oHashedData.propset_DataEncoding(constants_1.CADESCOM_BASE64_TO_BINARY));
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || error);
        }
        return oHashedData;
    }));
}));


/***/ }),

/***/ "./api/getSystemInfo.ts":
/*!******************************!*\
  !*** ./api/getSystemInfo.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о CSP и плагине
 */
exports.getSystemInfo = _afterPluginsLoaded_1._afterPluginsLoaded(() => {
    const sysInfo = {
        cadesVersion: null,
        cspVersion: null,
    };
    return eval(_generateCadesFn_1._generateCadesFn(function getSystemInfo() {
        let cadesAbout;
        try {
            cadesAbout = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.About');
            sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.PluginVersion;
            sysInfo.cspVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.CSPVersion();
            if (!sysInfo.cadesVersion) {
                sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.Version;
            }
            sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + sysInfo.cadesVersion.toString();
            sysInfo.cspVersion = _generateCadesFn_1.__cadesAsyncToken__ + sysInfo.cspVersion.toString();
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о системе');
        }
        return sysInfo;
    }));
});


/***/ }),

/***/ "./api/getUserCertificates.ts":
/*!************************************!*\
  !*** ./api/getUserCertificates.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const certificate_1 = __webpack_require__(/*! ./certificate */ "./api/certificate/index.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractCommonName_1 = __webpack_require__(/*! ../helpers/_extractCommonName */ "./helpers/_extractCommonName.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
let certificatesCache;
/**
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
exports.getUserCertificates = _afterPluginsLoaded_1._afterPluginsLoaded((resetCache = false) => {
    const { cadesplugin } = window;
    if (!resetCache && certificatesCache) {
        return certificatesCache;
    }
    return eval(_generateCadesFn_1._generateCadesFn(function getUserCertificates() {
        let cadesStore;
        try {
            cadesStore = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.Store');
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ +
                cadesStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }
        let cadesCertificates;
        let cadesCertificatesCount;
        try {
            cadesCertificates = _generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Certificates;
            if (cadesCertificates) {
                cadesCertificates =
                    _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
                /**
                 * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
                 * или не действительны на данный момент
                 */
                cadesCertificates =
                    _generateCadesFn_1.__cadesAsyncToken__ +
                        cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY, constants_1.CAPICOM_PROPID_KEY_PROV_INFO);
                cadesCertificatesCount = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Count;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }
        if (!cadesCertificatesCount) {
            throw new Error('Нет доступных сертификатов');
        }
        const certificateList = [];
        try {
            while (cadesCertificatesCount) {
                const cadesCertificate = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Item(cadesCertificatesCount);
                certificateList.push(new certificate_1.Certificate(cadesCertificate, _extractCommonName_1._extractCommonName(_generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.SubjectName), _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.IssuerName, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.SubjectName, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.Thumbprint, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ValidFromDate, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ValidToDate));
                cadesCertificatesCount--;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка обработки сертификатов');
        }
        cadesStore.Close();
        certificatesCache = certificateList;
        return certificatesCache;
    }));
});


/***/ }),

/***/ "./api/index.ts":
/*!**********************!*\
  !*** ./api/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./getCertificate */ "./api/getCertificate.ts"));
__export(__webpack_require__(/*! ./getUserCertificates */ "./api/getUserCertificates.ts"));
__export(__webpack_require__(/*! ./getSystemInfo */ "./api/getSystemInfo.ts"));
__export(__webpack_require__(/*! ./isValidSystemSetup */ "./api/isValidSystemSetup.ts"));
__export(__webpack_require__(/*! ./createSignature */ "./api/createSignature.ts"));
__export(__webpack_require__(/*! ./getHashedData */ "./api/getHashedData.ts"));
__export(__webpack_require__(/*! ./createHashSignature */ "./api/createHashSignature.ts"));
__export(__webpack_require__(/*! ./createCoSignature */ "./api/createCoSignature.ts"));
__export(__webpack_require__(/*! ./verifyHashSignature */ "./api/verifyHashSignature.ts"));
__export(__webpack_require__(/*! ./encryptEnvelopedData */ "./api/encryptEnvelopedData.ts"));
__export(__webpack_require__(/*! ./decryptEnvelopedData */ "./api/decryptEnvelopedData.ts"));
__export(__webpack_require__(/*! ./certificate */ "./api/certificate/index.ts"));


/***/ }),

/***/ "./api/isValidSystemSetup.ts":
/*!***********************************!*\
  !*** ./api/isValidSystemSetup.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _isSupportedCadesVersion_1 = __webpack_require__(/*! ../helpers/_isSupportedCadesVersion */ "./helpers/_isSupportedCadesVersion.ts");
const _isSupportedCSPVersion_1 = __webpack_require__(/*! ../helpers/_isSupportedCSPVersion */ "./helpers/_isSupportedCSPVersion.ts");
const getSystemInfo_1 = __webpack_require__(/*! ./getSystemInfo */ "./api/getSystemInfo.ts");
/**
 * Проверяет корректность настроек ЭП на машине
 *
 * @returns флаг корректности настроек
 */
exports.isValidSystemSetup = _afterPluginsLoaded_1._afterPluginsLoaded(() => __awaiter(void 0, void 0, void 0, function* () {
    let systemInfo;
    try {
        systemInfo = yield getSystemInfo_1.getSystemInfo();
    }
    catch (error) {
        console.error(error);
        throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Настройки ЭП на данной машине не верны');
    }
    if (!_isSupportedCadesVersion_1._isSupportedCadesVersion(systemInfo.cadesVersion)) {
        throw new Error('Не поддерживаемая версия плагина');
    }
    if (!_isSupportedCSPVersion_1._isSupportedCSPVersion(systemInfo.cspVersion)) {
        throw new Error('Не поддерживаемая версия CSP');
    }
    return true;
}));


/***/ }),

/***/ "./api/verifyHashSignature.ts":
/*!************************************!*\
  !*** ./api/verifyHashSignature.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ../helpers/_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ../helpers/_generateCadesFn */ "./helpers/_generateCadesFn.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ../helpers/_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
exports.verifyHashSignature = _afterPluginsLoaded_1._afterPluginsLoaded((oHashedData, sSignedMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const algorithm = yield oHashedData.Algorithm;
    const hashValue = yield oHashedData.Value;
    return eval(_generateCadesFn_1._generateCadesFn(function verifyHashSignature() {
        let cadesHashedData;
        let cadesSignedData;
        try {
            cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.CadesSignedData');
            cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.HashedData');
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_Algorithm(algorithm));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(constants_1.CADESCOM_BASE64_TO_BINARY));
            void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.SetHashValue(hashValue));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для верификации');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ +
                cadesSignedData.VerifyHash(cadesHashedData, sSignedMessage, cadesplugin.CADESCOM_BASE64_TO_BINARY));
        }
        catch (e) {
            console.error(e);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(e) || 'Ошибка при верификации данных');
        }
        return true;
    }));
}));


/***/ }),

/***/ "./constants/cades-constants.ts":
/*!**************************************!*\
  !*** ./constants/cades-constants.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CADESCOM_ATTRIBUTE_OTHER = -1;
exports.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
exports.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
exports.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
exports.CADESCOM_AllowNoOutstandingRequest = 1;
exports.CADESCOM_AllowNone = 0;
exports.CADESCOM_AllowUntrustedCertificate = 2;
exports.CADESCOM_AllowUntrustedRoot = 4;
exports.CADESCOM_BASE64_TO_BINARY = 0x01;
exports.CADESCOM_CADES_BES = 1;
exports.CADESCOM_CADES_DEFAULT = 0;
exports.CADESCOM_CADES_T = 5;
exports.CADESCOM_CADES_X_LONG_TYPE_1 = 0x5d;
exports.CADESCOM_CONTAINER_STORE = 100;
exports.CADESCOM_CURRENT_USER_STORE = 2;
exports.CADESCOM_DISPLAY_DATA_ATTRIBUTE = 2;
exports.CADESCOM_DISPLAY_DATA_CONTENT = 1;
exports.CADESCOM_DISPLAY_DATA_NONE = 0;
exports.CADESCOM_ENCODE_ANY = -1;
exports.CADESCOM_ENCODE_BASE64 = 0;
exports.CADESCOM_ENCODE_BINARY = 1;
exports.CADESCOM_ENCRYPTION_ALGORITHM_3DES = 3;
exports.CADESCOM_ENCRYPTION_ALGORITHM_AES = 4;
exports.CADESCOM_ENCRYPTION_ALGORITHM_DES = 2;
exports.CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 = 25;
exports.CADESCOM_ENCRYPTION_ALGORITHM_RC2 = 0;
exports.CADESCOM_ENCRYPTION_ALGORITHM_RC4 = 1;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 = 101;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256_HMAC = 111;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 = 102;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512_HMAC = 112;
exports.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_HMAC = 110;
exports.CADESCOM_HASH_ALGORITHM_MD2 = 1;
exports.CADESCOM_HASH_ALGORITHM_MD4 = 2;
exports.CADESCOM_HASH_ALGORITHM_MD5 = 3;
exports.CADESCOM_HASH_ALGORITHM_SHA1 = 0;
exports.CADESCOM_HASH_ALGORITHM_SHA_256 = 4;
exports.CADESCOM_HASH_ALGORITHM_SHA_384 = 5;
exports.CADESCOM_HASH_ALGORITHM_SHA_512 = 6;
exports.CADESCOM_LOCAL_MACHINE_STORE = 1;
exports.CADESCOM_PKCS7_TYPE = 65535;
exports.CADESCOM_STRING_TO_UCS2LE = 0x00;
exports.CADESCOM_SkipInstallToStore = 268435456;
exports.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;
exports.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;
exports.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;
exports.CAPICOM_ACTIVE_DIRECTORY_USER_STORE = 3;
exports.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
exports.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
exports.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
exports.CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7;
exports.CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8;
exports.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
exports.CAPICOM_CERTIFICATE_FIND_EXTENSION = 5;
exports.CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;
exports.CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;
exports.CAPICOM_CERTIFICATE_FIND_ROOT_NAME = 3;
exports.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
exports.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
exports.CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME = 4;
exports.CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED = 11;
exports.CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10;
exports.CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
exports.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT = 0;
exports.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY = 2;
exports.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
exports.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME = 1;
exports.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0;
exports.CAPICOM_CURRENT_USER_STORE = 2;
exports.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128;
exports.CAPICOM_EKU_CLIENT_AUTH = 2;
exports.CAPICOM_EKU_OTHER = 0;
exports.CAPICOM_EKU_SMARTCARD_LOGON = 5;
exports.CAPICOM_LOCAL_MACHINE_STORE = 1;
exports.CAPICOM_MEMORY_STORE = 0;
exports.CAPICOM_MY_STORE = 'My';
exports.CAPICOM_OID_KEY_USAGE_EXTENSION = 10;
exports.CAPICOM_OID_OTHER = 0;
exports.CAPICOM_PROPID_ACCESS_STATE = 14;
exports.CAPICOM_PROPID_ARCHIVED = 19;
exports.CAPICOM_PROPID_ARCHIVED_KEY_HASH = 65;
exports.CAPICOM_PROPID_AUTO_ENROLL = 21;
exports.CAPICOM_PROPID_CROSS_CERT_DIST_POINTS = 23;
exports.CAPICOM_PROPID_CTL_USAGE = 9;
exports.CAPICOM_PROPID_DATE_STAMP = 27;
exports.CAPICOM_PROPID_DESCRIPTION = 13;
exports.CAPICOM_PROPID_EFS = 17;
exports.CAPICOM_PROPID_ENHKEY_USAGE = 9;
exports.CAPICOM_PROPID_ENROLLMENT = 26;
exports.CAPICOM_PROPID_EXTENDED_ERROR_INFO = 30;
exports.CAPICOM_PROPID_FIRST_RESERVED = 66;
exports.CAPICOM_PROPID_FIRST_USER = 0x00008000;
exports.CAPICOM_PROPID_FORTEZZA_DATA = 18;
exports.CAPICOM_PROPID_FRIENDLY_NAME = 11;
exports.CAPICOM_PROPID_HASH_PROP = 3;
exports.CAPICOM_PROPID_IE30_RESERVED = 7;
exports.CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH = 24;
exports.CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH = 28;
exports.CAPICOM_PROPID_KEY_CONTEXT = 5;
exports.CAPICOM_PROPID_KEY_IDENTIFIER = 20;
exports.CAPICOM_PROPID_KEY_PROV_HANDLE = 1;
exports.CAPICOM_PROPID_KEY_PROV_INFO = 2;
exports.CAPICOM_PROPID_KEY_SPEC = 6;
exports.CAPICOM_PROPID_LAST_RESERVED = 0x00007fff;
exports.CAPICOM_PROPID_LAST_USER = 0x0000ffff;
exports.CAPICOM_PROPID_MD5_HASH = 4;
exports.CAPICOM_PROPID_NEXT_UPDATE_LOCATION = 10;
exports.CAPICOM_PROPID_PUBKEY_ALG_PARA = 22;
exports.CAPICOM_PROPID_PUBKEY_HASH_RESERVED = 8;
exports.CAPICOM_PROPID_PVK_FILE = 12;
exports.CAPICOM_PROPID_RENEWAL = 64;
exports.CAPICOM_PROPID_SHA1_HASH = 3;
exports.CAPICOM_PROPID_SIGNATURE_HASH = 15;
exports.CAPICOM_PROPID_SMART_CARD_DATA = 16;
exports.CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH = 29;
exports.CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH = 25;
exports.CAPICOM_PROPID_UNKNOWN = 0;
exports.CAPICOM_SMART_CARD_USER_STORE = 4;
exports.CAPICOM_STORE_OPEN_EXISTING_ONLY = 128;
exports.CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED = 256;
exports.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
exports.CAPICOM_STORE_OPEN_READ_ONLY = 0;
exports.CAPICOM_STORE_OPEN_READ_WRITE = 1;
exports.CHECK_NONE = 0;
exports.CHECK_OFFLINE_REVOCATION_STATUS = 16;
exports.CHECK_ONLINE_REVOCATION_STATUS = 8;
exports.CHECK_SIGNATURE_VALIDITY = 4;
exports.CHECK_TIME_VALIDITY = 2;
exports.CHECK_TRUSTED_ROOT = 1;
exports.LOG_LEVEL_DEBUG = 4;
exports.LOG_LEVEL_ERROR = 1;
exports.LOG_LEVEL_INFO = 2;
exports.TRUST_CTL_IS_NOT_SIGNATURE_VALID = 262144;
exports.TRUST_CTL_IS_NOT_TIME_VALID = 131072;
exports.TRUST_CTL_IS_NOT_VALID_FOR_USAGE = 524288;
exports.TRUST_IS_CYCLIC = 128;
exports.TRUST_IS_NOT_SIGNATURE_VALID = 8;
exports.TRUST_IS_NOT_TIME_NESTED = 2;
exports.TRUST_IS_NOT_TIME_VALID = 1;
exports.TRUST_IS_NOT_VALID_FOR_USAGE = 16;
exports.TRUST_IS_PARTIAL_CHAIN = 65536;
exports.TRUST_IS_REVOKED = 4;
exports.TRUST_IS_UNTRUSTED_ROOT = 32;
exports.TRUST_REVOCATION_STATUS_UNKNOWN = 64;
exports.XmlDsigGost3410Url = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411';
exports.XmlDsigGost3410UrlObsolete = 'http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411';
exports.XmlDsigGost3411Url = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411';
exports.XmlDsigGost3411UrlObsolete = 'http://www.w3.org/2001/04/xmldsig-more#gostr3411';


/***/ }),

/***/ "./constants/index.ts":
/*!****************************!*\
  !*** ./constants/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./cades-constants */ "./constants/cades-constants.ts"));
__export(__webpack_require__(/*! ./issuer-tags-translations */ "./constants/issuer-tags-translations.ts"));
__export(__webpack_require__(/*! ./oids-dictionary */ "./constants/oids-dictionary.ts"));
__export(__webpack_require__(/*! ./subject-tags-translations */ "./constants/subject-tags-translations.ts"));


/***/ }),

/***/ "./constants/issuer-tags-translations.ts":
/*!***********************************************!*\
  !*** ./constants/issuer-tags-translations.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ISSUER_TAGS_TRANSLATIONS = [
    { possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя' },
    { possibleNames: ['CN'], translation: 'Удостоверяющий центр' },
    { possibleNames: ['C'], translation: 'Страна' },
    { possibleNames: ['S'], translation: 'Регион' },
    { possibleNames: ['STREET'], translation: 'Адрес' },
    { possibleNames: ['O'], translation: 'Компания' },
    { possibleNames: ['OU'], translation: 'Тип' },
    { possibleNames: ['T'], translation: 'Должность' },
    { possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН' },
    { possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП' },
    { possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС' },
    { possibleNames: ['ИНН', 'INN', 'ИНН организации'], translation: 'ИНН' },
    { possibleNames: ['E'], translation: 'Email' },
    { possibleNames: ['L'], translation: 'Город' },
];


/***/ }),

/***/ "./constants/oids-dictionary.ts":
/*!**************************************!*\
  !*** ./constants/oids-dictionary.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OIDS_DICTIONARY = {
    '1.2.643.2.2.34.6': 'Пользователь Центра Регистрации',
    '1.2.643.2.39.1.1': 'Использование в программных продуктах системы "1С:Предприятие 8"',
    '1.2.643.3.131.1.1': 'ИНН',
    '1.2.643.3.141.1.1': 'РНС ФСС',
    '1.2.643.3.141.1.2': 'КП ФСС',
    '1.2.643.3.2.100.65.13.11': 'Использование в системе АИС "Госзакупки" Сахалинской области.',
    '1.2.643.3.8.100.1': 'Сертификат типа "ekey-ГОСТ"',
    '1.2.643.3.8.100.1.1': 'Общее использование в системах ИОК без права заверения финансовых документов',
    '1.2.643.3.8.100.1.10': 'Для участия в электронных торгах и подписания государственного контракта в  информационных системах Тендерного комитета города Москвы уполномоченными  лицами участников размещения государственного заказа города Москвы',
    '1.2.643.3.8.100.1.11': 'Подписание электронных документов в автоматизированной информационной  системе размещения государственного и муниципального заказа Саратовской области',
    '1.2.643.3.8.100.1.12': 'Использование в системе государственного заказа Иркутской области',
    '1.2.643.3.8.100.1.13': 'Использование в электронной торговой площадке агентства государственного  заказа Красноярского края',
    '1.2.643.3.8.100.1.14': 'Использование в электронной торговой площадке "Тендер"',
    '1.2.643.3.8.100.1.2': 'Передача отчетности по ТКС',
    '1.2.643.3.8.100.1.3': 'Оформление взаимных обязательств, соглашений, договоров, актов и т.п.',
    '1.2.643.3.8.100.1.4': 'Внутрикорпоративный документооборот',
    '1.2.643.3.8.100.1.5': 'Использование в системах электронной торговли',
    '1.2.643.3.8.100.1.6': 'Использование в торгово-закупочной системе "ЭЛЕКТРА"',
    '1.2.643.3.8.100.1.7': 'Использование в системе Портал государственных закупок Ставропольского края.',
    '1.2.643.3.8.100.1.8': 'Использование в Единой системе электронной торговли B2B-Center и B2G.',
    '1.2.643.3.8.100.1.9': 'Для участия в электронных торгах и подписания государственного контракта в  электронной площадке ОАО «ЕЭТП» уполномоченными лицами участников размещения  государственного или муниципального заказа',
    '1.2.643.5.1.24.2.1.3': 'Формирование документов для получения государственных  услуг в сфере ведения государственного кадастра недвижимости со стороны заявителя',
    '1.2.643.5.1.24.2.1.3.1': 'Формирование кадастровым инженером документов  для получения государственных услуг в сфере ведения государственного кадастра недвижимости со стороны  заявителя',
    '1.2.643.5.1.24.2.2.2': 'Формирование документов как результата оказания  услуги со стороны органов регистрации прав',
    '1.2.643.5.1.24.2.2.3': 'Формирование документов для получения государственных  услуг в сфере государственной регистрации прав на недвижимое имущество и сделок с ним со стороны заявителя',
    '1.2.643.6.2.1.7.1': 'Использование единоличным исполнительным органом юридического лица или уполномоченными представителями юридического лица в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских и иных прав и обязанностей в сфере негосударственного пенсионного обеспечения, негосударственного пенсионного страхования, в сфере деятельности паевых инвестиционных фондов, акционерных инвестиционных фондов, профессиональных участников рынка ценных бумаг, а также связанной с обслуживанием указанной деятельности услуг кредитных и иных организаций',
    '1.2.643.6.2.1.7.2': 'Использование физическим лицом в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских прав и обязанностей в отношении инвестиционных паев паевых инвестиционных фондов, в том числе отношения, связанные с учетом и/или фиксацией прав на инвестиционные паи паевых инвестиционных фондов',
    '1.2.643.6.3': 'Использование в электронных торговых системах и в программном обеспечении, связанным с обменом электронных сообщений',
    '1.2.643.6.3.1.1': 'Использование на электронных площадок отобранных для проведения аукционах в электронной форме',
    '1.2.643.6.3.1.2.1': 'Тип участника - Юридическое лицо',
    '1.2.643.6.3.1.2.2': 'Тип участника - Физическое лицо',
    '1.2.643.6.3.1.2.3': 'Тип участника - Индивидуальный предприниматель',
    '1.2.643.6.3.1.3.1': 'Участник размещения заказа',
    '1.2.643.6.3.1.4.1': 'Администратор организации',
    '1.2.643.6.3.1.4.2': 'Уполномоченный специалист',
    '1.2.643.6.3.1.4.3': 'Специалист с правом подписи контракта',
    '1.2.840.113549.1.9.2': 'Неструктурированное имя',
    '1.3.6.1.4.1.24138.1.1.8.1': 'Обеспечение юридической значимости в Системе "Электронная Торговая Площадка"',
    '1.3.6.1.4.1.29919.21': 'Использование в системе Портал государственных закупок  Ростовской области "Рефери".',
    '1.3.6.1.5.5.7.3.2': 'Проверка подлинности клиента',
    '1.3.6.1.5.5.7.3.4': 'Защищенная электронная почта',
    '1.3.643.3.8.100.15': 'Использование в ЭТП "uTender"',
};


/***/ }),

/***/ "./constants/subject-tags-translations.ts":
/*!************************************************!*\
  !*** ./constants/subject-tags-translations.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBJECT_TAGS_TRANSLATIONS = [
    { possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя' },
    { possibleNames: ['CN'], translation: 'Владелец' },
    { possibleNames: ['SN'], translation: 'Фамилия' },
    { possibleNames: ['G'], translation: 'Имя Отчество' },
    { possibleNames: ['C'], translation: 'Страна' },
    { possibleNames: ['S'], translation: 'Регион' },
    { possibleNames: ['STREET'], translation: 'Адрес' },
    { possibleNames: ['O'], translation: 'Компания' },
    { possibleNames: ['OU'], translation: 'Отдел/подразделение' },
    { possibleNames: ['T'], translation: 'Должность' },
    { possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН' },
    { possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП' },
    { possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС' },
    { possibleNames: ['ИНН', 'INN', 'ИНН организации'], translation: 'ИНН' },
    { possibleNames: ['E'], translation: 'Email' },
    { possibleNames: ['L'], translation: 'Город' },
];


/***/ }),

/***/ "./crypto-pro.ts":
/*!***********************!*\
  !*** ./crypto-pro.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./api */ "./api/index.ts"));


/***/ }),

/***/ "./helpers/_afterPluginsLoaded.ts":
/*!****************************************!*\
  !*** ./helpers/_afterPluginsLoaded.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ./_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
let isSetLogLevel = false;
let isPluginLoaded = false;
exports._afterPluginsLoaded = (fn) => {
    const canPromise = Boolean(window.Promise);
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isPluginLoaded) {
                try {
                    __webpack_require__(/*! ../vendor/cadesplugin_api */ "./vendor/cadesplugin_api.js");
                }
                catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при подключении модуля для работы с Cades plugin');
                }
                isPluginLoaded = true;
            }
            const { cadesplugin } = window;
            if (!canPromise) {
                throw new Error('Необходим полифилл для Promise');
            }
            if (!cadesplugin) {
                throw new Error('Не подключен модуль для работы с Cades plugin');
            }
            if (!isSetLogLevel) {
                cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);
                isSetLogLevel = true;
            }
            try {
                yield cadesplugin;
            }
            catch (error) {
                console.error(error);
                throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации модуля для работы с Cades plugin');
            }
            return yield fn.apply(this, args);
        });
    };
};


/***/ }),

/***/ "./helpers/_extractCommonName.ts":
/*!***************************************!*\
  !*** ./helpers/_extractCommonName.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports._extractCommonName = (subjectName) => { var _a; return (_a = subjectName.match(/CN=(.+?)(?:,|$)/)) === null || _a === void 0 ? void 0 : _a[1]; };


/***/ }),

/***/ "./helpers/_extractMeaningfulErrorMessage.ts":
/*!***************************************************!*\
  !*** ./helpers/_extractMeaningfulErrorMessage.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports._extractMeaningfulErrorMessage = (error) => {
    var _a;
    let errorContainer = ((_a = window.cadesplugin) === null || _a === void 0 ? void 0 : _a.getLastError) && window.cadesplugin.getLastError(error);
    if (!(errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.message)) {
        if (!error.message) {
            return null;
        }
        errorContainer = error;
    }
    const containsRussianLetters = /[а-яА-Я]/.test(errorContainer.message);
    if (!containsRussianLetters) {
        return null;
    }
    const searchResult = errorContainer.message.match(/^(.*?)(?:(?:\.?\s?\(?0x)|(?:\.?$))/);
    return searchResult ? searchResult[1] : null;
};


/***/ }),

/***/ "./helpers/_generateCadesFn.ts":
/*!*************************************!*\
  !*** ./helpers/_generateCadesFn.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// синтетические переменные, которые подменяются в рантайме
exports.__cadesAsyncToken__ = {};
exports.__createCadesPluginObject__ = (...args) => ({});
function getGeneratorConstructor() {
    return new Function('', 'return Object.getPrototypeOf(function*(){}).constructor')();
}
exports._generateCadesFn = (callback) => {
    var _a;
    const { cadesplugin } = window;
    const cadesGeneratorsAPI = Boolean(cadesplugin.CreateObjectAsync);
    const callbackName = callback.name || 'dynamicFn';
    const callbackLiteral = String(callback);
    const callbackArguments = ((_a = callbackLiteral.match(/^function[\s\w]*?\((.*?)\)/)) === null || _a === void 0 ? void 0 : _a[1]) || '';
    const callbackBody = callbackLiteral.replace(/^.*?{([\s\S]*?)}$/, '$1');
    let crossEnvCallbackLiteral = String(new (cadesGeneratorsAPI ? getGeneratorConstructor() : Function)(callbackArguments, callbackBody));
    crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/\w+?\.__createCadesPluginObject__(\([\s\S]*?\))/gm, `cadesplugin.CreateObject${cadesGeneratorsAPI ? 'Async' : ''}$1`);
    crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/\w+?\.__cadesAsyncToken__\s*?\+\s*?\b/gm, cadesGeneratorsAPI ? 'yield ' : '');
    if (!cadesGeneratorsAPI) {
        crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/propset_(.*?)\((.*?)\)/gm, '$1 = $2');
    }
    return [
        cadesGeneratorsAPI ? `cadesplugin.async_spawn(${crossEnvCallbackLiteral});` : `(${crossEnvCallbackLiteral})();`,
        `//# sourceURL=crypto-pro_${callbackName}.js`,
    ].join('');
};


/***/ }),

/***/ "./helpers/_getCadesCert.ts":
/*!**********************************!*\
  !*** ./helpers/_getCadesCert.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _afterPluginsLoaded_1 = __webpack_require__(/*! ./_afterPluginsLoaded */ "./helpers/_afterPluginsLoaded.ts");
const _extractMeaningfulErrorMessage_1 = __webpack_require__(/*! ./_extractMeaningfulErrorMessage */ "./helpers/_extractMeaningfulErrorMessage.ts");
const _generateCadesFn_1 = __webpack_require__(/*! ./_generateCadesFn */ "./helpers/_generateCadesFn.ts");
/**
 * Возвращает сертификат в формате Cades по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат в формате Cades
 */
exports._getCadesCert = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint) => {
    const { cadesplugin } = window;
    return eval(_generateCadesFn_1._generateCadesFn(function _getCadesCert() {
        let cadesStore;
        try {
            cadesStore = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__('CAdESCOM.Store');
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
        }
        if (!cadesStore) {
            throw new Error('Не удалось получить доступ к хранилищу сертификатов');
        }
        try {
            void (_generateCadesFn_1.__cadesAsyncToken__ +
                cadesStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }
        let cadesCertificateList;
        let certificatesCount;
        try {
            cadesCertificateList = _generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Certificates;
            certificatesCount = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Count;
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }
        if (!certificatesCount) {
            throw new Error('Нет доступных сертификатов');
        }
        let cadesCertificate;
        try {
            cadesCertificateList =
                _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
            const count = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Count;
            if (!count) {
                throw new Error(`Сертификат с отпечатком: "${thumbprint}" не найден`);
            }
            cadesCertificate = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Item(1);
        }
        catch (error) {
            console.error(error);
            throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || 'Ошибка при получении сертификата');
        }
        cadesStore.Close();
        return cadesCertificate;
    }));
});


/***/ }),

/***/ "./helpers/_getDateObj.ts":
/*!********************************!*\
  !*** ./helpers/_getDateObj.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Возвращает объект даты, совместимый с Cades plugin'ом, зависящий от браузера.
 *
 * В IE необходимо использовать специфичный формат "VT_DATE"
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Microsoft_Extensions/Date.getVarDate
 */
exports._getDateObj = (dateObj) => (dateObj.getVarDate ? dateObj.getVarDate() : dateObj);


/***/ }),

/***/ "./helpers/_isSupportedCSPVersion.ts":
/*!*******************************************!*\
  !*** ./helpers/_isSupportedCSPVersion.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const oldestSupportedCSPVersion = 4.0;
exports._isSupportedCSPVersion = (version) => {
    var _a;
    version = (_a = version.match(/\d+?\b(?:\.\d+)?/)) === null || _a === void 0 ? void 0 : _a[0];
    return Number(version) >= oldestSupportedCSPVersion;
};


/***/ }),

/***/ "./helpers/_isSupportedCadesVersion.ts":
/*!*********************************************!*\
  !*** ./helpers/_isSupportedCadesVersion.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports._isSupportedCadesVersion = (version) => {
    const match = version.match(/(\d+)\.(\d+)\.(\d+)/);
    if (!match) {
        return false;
    }
    const [, major, minor, patch] = match;
    if (Number(major) < 2) {
        return false;
    }
    if (Number(major) === 2 && Number(patch) < 12438) {
        return false;
    }
    return true;
};


/***/ }),

/***/ "./helpers/_parseCertInfo.ts":
/*!***********************************!*\
  !*** ./helpers/_parseCertInfo.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ../constants */ "./constants/index.ts");
/**
 * Парсит информацию из строки с информацией о сертификате
 *
 * @param tagsTranslations - словарь с расшифровками тэгов
 * @param rawInfo - данные для парсинга
 * @returns расшифрованная информация по отдельным тэгам
 */
exports._parseCertInfo = (tagsTranslations, rawInfo) => {
    const extractedEntities = rawInfo.match(/([а-яА-Яa-zA-Z0-9\s.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);
    if (extractedEntities) {
        return extractedEntities.map((group) => {
            var _a, _b, _c;
            const segmentsMatch = group.trim().match(/^([а-яА-Яa-zA-Z0-9\s.]+)=(.+?),?$/);
            let title = segmentsMatch === null || segmentsMatch === void 0 ? void 0 : segmentsMatch[1];
            // Вырезаем лишние кавычки
            const description = (_b = (_a = segmentsMatch === null || segmentsMatch === void 0 ? void 0 : segmentsMatch[2]) === null || _a === void 0 ? void 0 : _a.replace(/^"(.*)"/, '$1')) === null || _b === void 0 ? void 0 : _b.replace(/"{2}/g, '"');
            const oidIdentifierMatch = title === null || title === void 0 ? void 0 : title.match(/^OID\.(.*)/);
            const oidIdentifier = oidIdentifierMatch === null || oidIdentifierMatch === void 0 ? void 0 : oidIdentifierMatch[1];
            let isTranslated = false;
            // Если нашли в тайтле ОИД, пытаемся его расшифровать
            if (oidIdentifier) {
                const oidTranslation = constants_1.OIDS_DICTIONARY[oidIdentifier];
                if (oidTranslation) {
                    title = oidTranslation;
                    isTranslated = true;
                }
            }
            const tagTranslation = (_c = tagsTranslations.find((tag) => tag.possibleNames.find((name) => name === title))) === null || _c === void 0 ? void 0 : _c.translation;
            if (tagTranslation) {
                title = tagTranslation;
                isTranslated = true;
            }
            return { description, title, isTranslated };
        });
    }
};


/***/ }),

/***/ "./vendor/cadesplugin_api.js":
/*!***********************************!*\
  !*** ./vendor/cadesplugin_api.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

;(function () {
    //already loaded
    if(window.cadesplugin)
        return;

    var pluginObject;
    var plugin_resolved = 0;
    var plugin_reject;
    var plugin_resolve;
    var isOpera = 0;
    var isFireFox = 0;
    var isEdge = 0;
    var isSafari = 0;
    var failed_extensions = 0;

    var canPromise = !!window.Promise;
    var cadesplugin;

    if(canPromise)
    {
        cadesplugin = new Promise(function(resolve, reject)
        {
            plugin_resolve = resolve;
            plugin_reject = reject;
        });
    } else
    {
        cadesplugin = {};
    }

    function check_browser() {
        var ua= navigator.userAgent, tem, M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name:'IE',version:(tem[1] || '')};
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return {name:M[0],version:M[1]};
    }
    var browserSpecs = check_browser();

    function cpcsp_console_log(level, msg){
        //IE9 не может писать в консоль если не открыта вкладка developer tools
        if(typeof(console) === 'undefined')
            return;
        if (level <= cadesplugin.current_log_level ){
            if (level === cadesplugin.LOG_LEVEL_DEBUG)
                console.log("DEBUG: %s", msg);
            if (level === cadesplugin.LOG_LEVEL_INFO)
                console.info("INFO: %s", msg);
            if (level === cadesplugin.LOG_LEVEL_ERROR)
                console.error("ERROR: %s", msg);
            return;
        }
    }

    function set_log_level(level){
        if (!((level === cadesplugin.LOG_LEVEL_DEBUG) ||
            (level === cadesplugin.LOG_LEVEL_INFO) ||
            (level === cadesplugin.LOG_LEVEL_ERROR))){
            cpcsp_console_log(cadesplugin.LOG_LEVEL_ERROR, "cadesplugin_api.js: Incorrect log_level: " + level);
            return;
        }
        cadesplugin.current_log_level = level;
        if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_DEBUG)
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = DEBUG");
        if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_INFO)
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = INFO");
        if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_ERROR)
            cpcsp_console_log(cadesplugin.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = ERROR");
        if(isNativeMessageSupported())
        {
            if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_DEBUG)
                window.postMessage("set_log_level=debug", "*");
            if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_INFO)
                window.postMessage("set_log_level=info", "*");
            if (cadesplugin.current_log_level === cadesplugin.LOG_LEVEL_ERROR)
                window.postMessage("set_log_level=error", "*");
        }
    }

    function set_constantValues()
    {
        cadesplugin.CAPICOM_LOCAL_MACHINE_STORE = 1;
        cadesplugin.CAPICOM_CURRENT_USER_STORE = 2;
        cadesplugin.CADESCOM_LOCAL_MACHINE_STORE = 1;
        cadesplugin.CADESCOM_CURRENT_USER_STORE = 2;
        cadesplugin.CADESCOM_CONTAINER_STORE = 100;

        cadesplugin.CAPICOM_MY_STORE = "My";

        cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;

        cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;
        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;
        cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;

        cadesplugin.XmlDsigGost3410UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411";
        cadesplugin.XmlDsigGost3411UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr3411";
        cadesplugin.XmlDsigGost3410Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411";
        cadesplugin.XmlDsigGost3411Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411";

        cadesplugin.CADESCOM_CADES_DEFAULT = 0;
        cadesplugin.CADESCOM_CADES_BES = 1;
        cadesplugin.CADESCOM_CADES_T = 0x5;
        cadesplugin.CADESCOM_CADES_X_LONG_TYPE_1 = 0x5d;
        cadesplugin.CADESCOM_PKCS7_TYPE = 0xffff;

        cadesplugin.CADESCOM_ENCODE_BASE64 = 0;
        cadesplugin.CADESCOM_ENCODE_BINARY = 1;
        cadesplugin.CADESCOM_ENCODE_ANY = -1;

        cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT = 0;
        cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
        cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY = 2;

        cadesplugin.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0;
        cadesplugin.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME = 1;

        cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_ROOT_NAME = 3;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME = 4;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENSION = 5;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED = 11;
        cadesplugin.CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;

        cadesplugin.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128;

        cadesplugin.CAPICOM_PROPID_ENHKEY_USAGE = 9;

        cadesplugin.CAPICOM_OID_OTHER = 0;
        cadesplugin.CAPICOM_OID_KEY_USAGE_EXTENSION = 10;

        cadesplugin.CAPICOM_EKU_CLIENT_AUTH = 2;
        cadesplugin.CAPICOM_EKU_SMARTCARD_LOGON = 5;
        cadesplugin.CAPICOM_EKU_OTHER = 0;

        cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
        cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
        cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
        cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
        cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
        cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
        cadesplugin.CADESCOM_ATTRIBUTE_OTHER = -1;

        cadesplugin.CADESCOM_STRING_TO_UCS2LE = 0;
        cadesplugin.CADESCOM_BASE64_TO_BINARY = 1;

        cadesplugin.CADESCOM_DISPLAY_DATA_NONE = 0;
        cadesplugin.CADESCOM_DISPLAY_DATA_CONTENT = 1;
        cadesplugin.CADESCOM_DISPLAY_DATA_ATTRIBUTE = 2;

        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_RC2 = 0;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_RC4 = 1;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_DES = 2;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_3DES = 3;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_AES = 4;
        cadesplugin.CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 = 25;

        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1 = 0;
        cadesplugin.CADESCOM_HASH_ALGORITHM_MD2 = 1;
        cadesplugin.CADESCOM_HASH_ALGORITHM_MD4 = 2;
        cadesplugin.CADESCOM_HASH_ALGORITHM_MD5 = 3;
        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256 = 4;
        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384 = 5;
        cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512 = 6;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 = 101;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 = 102;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_HMAC = 110;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256_HMAC = 111;
        cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512_HMAC = 112;

        cadesplugin.LOG_LEVEL_DEBUG = 4;
        cadesplugin.LOG_LEVEL_INFO = 2;
        cadesplugin.LOG_LEVEL_ERROR = 1;

        cadesplugin.CADESCOM_AllowNone = 0;
        cadesplugin.CADESCOM_AllowNoOutstandingRequest = 0x1;
        cadesplugin.CADESCOM_AllowUntrustedCertificate = 0x2;
        cadesplugin.CADESCOM_AllowUntrustedRoot = 0x4;
        cadesplugin.CADESCOM_SkipInstallToStore = 0x10000000;
    }

    function async_spawn(generatorFunc) {
        function continuer(verb, arg) {
            var result;
            try {
                result = generator[verb](arg);
            } catch (err) {
                return Promise.reject(err);
            }
            if (result.done) {
                return result.value;
            } else {
                return Promise.resolve(result.value).then(onFulfilled, onRejected);
            }
        }
        var generator = generatorFunc(Array.prototype.slice.call(arguments, 1));
        var onFulfilled = continuer.bind(continuer, "next");
        var onRejected = continuer.bind(continuer, "throw");
        return onFulfilled();
    }

    function isIE() {
        // var retVal = (("Microsoft Internet Explorer" == navigator.appName) || // IE < 11
        //     navigator.userAgent.match(/Trident\/./i)); // IE 11
        return (browserSpecs.name === 'IE' || browserSpecs.name === 'MSIE');
    }

    function isIOS() {
        return (navigator.userAgent.match(/ipod/i) ||
            navigator.userAgent.match(/ipad/i) ||
            navigator.userAgent.match(/iphone/i));
    }

    function isNativeMessageSupported()
    {
        // В IE работаем через NPAPI
        if(isIE())
            return false;
        // В Edge работаем через NativeMessage
        if(browserSpecs.name === 'Edge') {
            isEdge = true;
            return true;
        }
        // В Chrome, Firefox, Safari и Opera работаем через асинхронную версию в зависимости от версии
        if(browserSpecs.name === 'Opera') {
            isOpera = true;
            if(browserSpecs.version >= 33){
                return true;
            }
            else{
                return false;
            }
        }
        if(browserSpecs.name === 'Firefox') {
            isFireFox = true;
            if(browserSpecs.version >= 52){
                return true;
            }
            else{
                return false;
            }
        }
        if(browserSpecs.name === 'Chrome') {
            if(browserSpecs.version >= 42){
                return true;
            }
            else{
                return false;
            }
        }
        //В Сафари начиная с 12 версии нет NPAPI
        if(browserSpecs.name === 'Safari') {
            isSafari = true;
            if(browserSpecs.version >= 12) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Функция активации объектов КриптоПро ЭЦП Browser plug-in
    function CreateObject(name) {
        if (isIOS()) {
            // На iOS для создания объектов используется функция
            // call_ru_cryptopro_npcades_10_native_bridge, определенная в IOS_npcades_supp.js
            return call_ru_cryptopro_npcades_10_native_bridge("CreateObject", [name]);
        }
        if (isIE()) {
            // В Internet Explorer создаются COM-объекты
            if (name.match(/X509Enrollment/i)) {
                try {
                    // Объекты CertEnroll пробуем создавать через нашу фабрику,
                    // если не получилось то через CX509EnrollmentWebClassFactory
                    var objCertEnrollClassFactory = document.getElementById("webClassFactory");
                    return objCertEnrollClassFactory.CreateObject(name);
                }
                catch (e) {
                    try {
                        var objWebClassFactory = document.getElementById("certEnrollClassFactory");
                        return objWebClassFactory.CreateObject(name);
                    }
                    catch (err) {
                        throw ("Для создания обьектов X509Enrollment следует настроить веб-узел на использование проверки подлинности по протоколу HTTPS");
                    }
                }
            }
            // Объекты CAPICOM и CAdESCOM создаются через CAdESCOM.WebClassFactory
            try {
                var objWebClassFactory = document.getElementById("webClassFactory");
                return objWebClassFactory.CreateObject(name);
            }
            catch (e) {
                // Для версий плагина ниже 2.0.12538
                return new ActiveXObject(name);
            }
        }
        // создаются объекты NPAPI
        return pluginObject.CreateObject(name);
    }

    function decimalToHexString(number) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }

        return number.toString(16).toUpperCase();
    }

    function GetMessageFromException(e) {
        var err = e.message;
        if (!err) {
            err = e;
        } else if (e.number) {
            err += " (0x" + decimalToHexString(e.number) + ")";
        }
        return err;
    }

    function getLastError(exception) {
        if(isNativeMessageSupported() || isIE() || isIOS() ) {
            return GetMessageFromException(exception);
        }

        try {
            return pluginObject.getLastError();
        } catch(e) {
            return GetMessageFromException(exception);
        }
    }

    // Функция для удаления созданных объектов
    function ReleasePluginObjects() {
        return cpcsp_chrome_nmcades.ReleasePluginObjects();
    }

    // Функция активации асинхронных объектов КриптоПро ЭЦП Browser plug-in
    function CreateObjectAsync(name) {
        return pluginObject.CreateObjectAsync(name);
    }

    //Функции для IOS
    var ru_cryptopro_npcades_10_native_bridge = {
        callbacksCount : 1,
        callbacks : {},

        // Automatically called by native layer when a result is available
        resultForCallback : function resultForCallback(callbackId, resultArray) {
            var callback = ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId];
            if (!callback) return;
            callback.apply(null,resultArray);
        },

        // Use this in javascript to request native objective-c code
        // functionName : string (I think the name is explicit :p)
        // args : array of arguments
        // callback : function with n-arguments that is going to be called when the native code returned
        call : function call(functionName, args, callback) {
            var hasCallback = callback && typeof callback === "function";
            var callbackId = hasCallback ? ru_cryptopro_npcades_10_native_bridge.callbacksCount++ : 0;

            if (hasCallback)
                ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId] = callback;

            var iframe = document.createElement("IFRAME");
            var arrObjs = new Array("_CPNP_handle");
            try{
                iframe.setAttribute("src", "cpnp-js-call:" + functionName + ":" + callbackId+ ":" + encodeURIComponent(JSON.stringify(args, arrObjs)));
            } catch(e){
                alert(e);
            }
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
    };

    function call_ru_cryptopro_npcades_10_native_bridge(functionName, array){
        var tmpobj;
        var ex;
        ru_cryptopro_npcades_10_native_bridge.call(functionName, array, function(e, response){
            ex = e;
            var str='tmpobj='+response;
            eval(str);
            if (typeof (tmpobj) === "string"){
                tmpobj = tmpobj.replace(/\\\n/gm, "\n");
                tmpobj = tmpobj.replace(/\\\r/gm, "\r");
            }
        });
        if(ex)
            throw ex;
        return tmpobj;
    }

    function show_firefox_missing_extension_dialog()
    {
        if (!window.cadesplugin_skip_extension_install)
        {
            var ovr = document.createElement('div');
            ovr.id = "cadesplugin_ovr";
            ovr.style = "visibility: hidden; position: fixed; left: 0px; top: 0px; width:100%; height:100%; background-color: rgba(0,0,0,0.7)";
            ovr.innerHTML = "<div id='cadesplugin_ovr_item' style='position:relative; width:400px; margin:100px auto; background-color:#fff; border:2px solid #000; padding:10px; text-align:center; opacity: 1; z-index: 1500'>" +
                "<button id='cadesplugin_close_install' style='float: right; font-size: 10px; background: transparent; border: 1; margin: -5px'>X</button>" +
                "<p>Для работы КриптоПро ЭЦП Browser plugin на данном сайте необходимо расширение для браузера. Убедитесь, что оно у Вас включено или установите его." +
                "<p><a href='https://www.cryptopro.ru/sites/default/files/products/cades/extensions/firefox_cryptopro_extension_latest.xpi'>Скачать расширение</a></p>" +
                "</div>";
            document.getElementsByTagName("Body")[0].appendChild(ovr);
            document.getElementById("cadesplugin_close_install").addEventListener('click',function()
            {
                plugin_loaded_error("Плагин недоступен");
                document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
            });

            ovr.addEventListener('click',function()
            {
                plugin_loaded_error("Плагин недоступен");
                document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
            });
            ovr.style.visibility="visible";
        }
    }


    //Выводим окно поверх других с предложением установить расширение для Opera.
    //Если установленна переменная cadesplugin_skip_extension_install - не предлагаем установить расширение
    function install_opera_extension()
    {
        if (!window.cadesplugin_skip_extension_install)
        {
            document.addEventListener('DOMContentLoaded', function() {
                var ovr = document.createElement('div');
                ovr.id = "cadesplugin_ovr";
                ovr.style = "visibility: hidden; position: fixed; left: 0px; top: 0px; width:100%; height:100%; background-color: rgba(0,0,0,0.7)";
                ovr.innerHTML = "<div id='cadesplugin_ovr_item' style='position:relative; width:400px; margin:100px auto; background-color:#fff; border:2px solid #000; padding:10px; text-align:center; opacity: 1; z-index: 1500'>" +
                    "<button id='cadesplugin_close_install' style='float: right; font-size: 10px; background: transparent; border: 1; margin: -5px'>X</button>" +
                    "<p>Для работы КриптоПро ЭЦП Browser plugin на данном сайте необходимо установить расширение из каталога дополнений Opera." +
                    "<p><button id='cadesplugin_install' style='font:12px Arial'>Установить расширение</button></p>" +
                    "</div>";
                document.getElementsByTagName("Body")[0].appendChild(ovr);
                var btn_install = document.getElementById("cadesplugin_install");
                btn_install.addEventListener('click', function(event) {
                    opr.addons.installExtension("epebfcehmdedogndhlcacafjaacknbcm",
                        function()
                        {
                            document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
                            location.reload();
                        },
                        function(){})
                });
                document.getElementById("cadesplugin_close_install").addEventListener('click',function()
                {
                    plugin_loaded_error("Плагин недоступен");
                    document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
                });

                ovr.addEventListener('click',function()
                {
                    plugin_loaded_error("Плагин недоступен");
                    document.getElementById("cadesplugin_ovr").style.visibility = 'hidden';
                });
                ovr.style.visibility="visible";
                document.getElementById("cadesplugin_ovr_item").addEventListener('click',function(e){
                    e.stopPropagation();
                });
            });
        }else
        {
            plugin_loaded_error("Плагин недоступен");
        }
    }

    function firefox_or_edge_nmcades_onload() {
        cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
    }

    function nmcades_api_onload () {
        window.postMessage("cadesplugin_echo_request", "*");
        window.addEventListener("message", function (event){
            if (typeof(event.data) !== "string" || !event.data.match("cadesplugin_loaded"))
                return;
            if(isFireFox || isEdge || isSafari)
            {
                // Для Firefox, Сафари, Edge вместе с сообщением cadesplugin_loaded прилетает url для загрузки nmcades_plugin_api.js
                var url = event.data.substring(event.data.indexOf("url:") + 4);
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", url);
                fileref.onerror = plugin_loaded_error;
                fileref.onload = firefox_or_edge_nmcades_onload;
                document.getElementsByTagName("head")[0].appendChild(fileref);
                // Для Firefox, Safari и Edge у нас только по одному расширению.
                failed_extensions++;
            }else {
                cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
            }
        }, false);
    }

    //Загружаем расширения для Chrome, Opera, YaBrowser, FireFox, Edge, Safari
    function load_extension()
    {

        if(isFireFox || isEdge || isSafari){
            // вызываем callback руками т.к. нам нужно узнать ID расширения. Он уникальный для браузера.
            nmcades_api_onload();
        } else {
            // в асинхронном варианте для chrome и opera подключаем оба расширения
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", "chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js");
            fileref.onerror = plugin_loaded_error;
            fileref.onload = nmcades_api_onload;
            document.getElementsByTagName("head")[0].appendChild(fileref);
            fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", "chrome-extension://epebfcehmdedogndhlcacafjaacknbcm/nmcades_plugin_api.js");
            fileref.onerror = plugin_loaded_error;
            fileref.onload = nmcades_api_onload;
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }

    //Загружаем плагин для NPAPI
    function load_npapi_plugin()
    {
        var elem = document.createElement('object');
        elem.setAttribute("id", "cadesplugin_object");
        elem.setAttribute("type", "application/x-cades");
        elem.setAttribute("style", "visibility: hidden");
        document.getElementsByTagName("body")[0].appendChild(elem);
        pluginObject = document.getElementById("cadesplugin_object");
        if(isIE())
        {
            var elem1 = document.createElement('object');
            elem1.setAttribute("id", "certEnrollClassFactory");
            elem1.setAttribute("classid", "clsid:884e2049-217d-11da-b2a4-000e7bbb2b09");
            elem1.setAttribute("style", "visibility: hidden");
            document.getElementsByTagName("body")[0].appendChild(elem1);
            var elem2 = document.createElement('object');
            elem2.setAttribute("id", "webClassFactory");
            elem2.setAttribute("classid", "clsid:B04C8637-10BD-484E-B0DA-B8A039F60024");
            elem2.setAttribute("style", "visibility: hidden");
            document.getElementsByTagName("body")[0].appendChild(elem2);
        }
    }

    //Отправляем событие что все ок.
    function plugin_loaded()
    {
        plugin_resolved = 1;
        if(canPromise)
        {
            plugin_resolve();
        }else {
            window.postMessage("cadesplugin_loaded", "*");
        }
    }

    //Отправляем событие что сломались.
    function plugin_loaded_error(msg)
    {
        if(isNativeMessageSupported())
        {
            //в асинхронном варианте подключаем оба расширения, если сломались оба пробуем установить для Opera
            failed_extensions++;
            if(failed_extensions<2)
                return;
            if(isOpera && (typeof(msg) === 'undefined'|| typeof(msg) === 'object'))
            {
                install_opera_extension();
                return;
            }
        }
        if(typeof(msg) === 'undefined' || typeof(msg) === 'object')
            msg = "Плагин недоступен";
        plugin_resolved = 1;
        if(canPromise)
        {
            plugin_reject(msg);
        } else {
            window.postMessage("cadesplugin_load_error", "*");
        }
    }

    //проверяем что у нас хоть какое то событие ушло, и если не уходило кидаем еще раз ошибку
    function check_load_timeout()
    {
        if(plugin_resolved === 1)
            return;
        if(isFireFox)
        {
            show_firefox_missing_extension_dialog();
        }
        plugin_resolved = 1;
        if(canPromise)
        {
            plugin_reject("Истекло время ожидания загрузки плагина");
        } else {
            window.postMessage("cadesplugin_load_error", "*");
        }

    }

    //Вспомогательная функция для NPAPI
    function createPromise(arg)
    {
        return new Promise(arg);
    }

    function check_npapi_plugin (){
        try {
            var oAbout = CreateObject("CAdESCOM.About");
            plugin_loaded();
        }
        catch (err) {
            document.getElementById("cadesplugin_object").style.display = 'none';
            // Объект создать не удалось, проверим, установлен ли
            // вообще плагин. Такая возможность есть не во всех браузерах
            var mimetype = navigator.mimeTypes["application/x-cades"];
            if (mimetype) {
                var plugin = mimetype.enabledPlugin;
                if (plugin) {
                    plugin_loaded_error("Плагин загружен, но не создаются обьекты");
                }else
                {
                    plugin_loaded_error("Ошибка при загрузке плагина");
                }
            }else
            {
                plugin_loaded_error("Плагин недоступен");
            }
        }
    }

    //Проверяем работает ли плагин
    function check_plugin_working()
    {
        var div = document.createElement("div");
        div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
        var isIeLessThan9 = (div.getElementsByTagName("i").length === 1);
        if (isIeLessThan9) {
            plugin_loaded_error("Internet Explorer версии 8 и ниже не поддерживается");
            return;
        }

        if(isNativeMessageSupported())
        {
            load_extension();
        }else if(!canPromise) {
            window.addEventListener("message", function (event){
                    if (event.data !== "cadesplugin_echo_request")
                        return;
                    load_npapi_plugin();
                    check_npapi_plugin();
                },
                false);
        }else
        {
            if(document.readyState === "complete"){
                load_npapi_plugin();
                check_npapi_plugin();
            } else {
                window.addEventListener("load", function (event) {
                    load_npapi_plugin();
                    check_npapi_plugin();
                }, false);
            }
        }
    }

    function set_pluginObject(obj)
    {
        pluginObject = obj;
    }

    function is_capilite_enabled()
    {
        if ((typeof (cadesplugin.EnableInternalCSP) !== 'undefined') && cadesplugin.EnableInternalCSP)
            return true;
        return false;
    };

    //Export
    cadesplugin.JSModuleVersion = "2.1.2";
    cadesplugin.async_spawn = async_spawn;
    cadesplugin.set = set_pluginObject;
    cadesplugin.set_log_level = set_log_level;
    cadesplugin.getLastError = getLastError;
    cadesplugin.is_capilite_enabled = is_capilite_enabled;

    if(isNativeMessageSupported())
    {
        cadesplugin.CreateObjectAsync = CreateObjectAsync;
        cadesplugin.ReleasePluginObjects = ReleasePluginObjects;
    }

    if(!isNativeMessageSupported())
    {
        cadesplugin.CreateObject = CreateObject;
    }

    if(window.cadesplugin_load_timeout)
    {
        setTimeout(check_load_timeout, window.cadesplugin_load_timeout);
    }
    else
    {
        setTimeout(check_load_timeout, 20000);
    }

    set_constantValues();

    cadesplugin.current_log_level = cadesplugin.LOG_LEVEL_ERROR;
    window.cadesplugin = cadesplugin;
    check_plugin_working();
}());


/***/ })

/******/ });
});
//# sourceMappingURL=crypto-pro.js.map