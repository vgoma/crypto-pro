import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { Certificate } from './certificate';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { _getDateObj } from '../helpers/_getDateObj';

/**
 * Добавляет подписанта к уже существующим для данного подписанного сообщения
 *
 * @param oCertificate - объект класса Certificate, которым необходимо подписать сообщение
 * @param oHashedData - объект oHashedData с установленным алгоритмом шифрования
 * @param sSignedMessage - сообщение к которому необходимо добавить подписанта
 * @returns строку с подписанным сообщением
 */
export const createCoSignature = _afterPluginsLoaded(
  async (oCertificate: Certificate, oHashedData: any, sSignedMessage: string): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = oCertificate._cadesCertificate;
    const algorithm = await oHashedData.Algorithm;
    const hashValue = await oHashedData.Value;

    return eval(
      _generateCadesFn(function createCoSignature(): string {
        let cadesAttrs;
        let cadesSigner;
        let cadesSignedData;
        let cadesHashedData;

        try {
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
          cadesHashedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.HashedData');
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }

        try {
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));

          void (__cadesAsyncToken__ + cadesHashedData.propset_Algorithm(algorithm));
          void (__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesHashedData.SetHashValue(hashValue));
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для верификации');
        }

        try {
          cadesSignedData.VerifyHash(cadesHashedData, sSignedMessage, cadesplugin.CADESCOM_BASE64_TO_BINARY);
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при верификации данных');
        }

        try {
          cadesAttrs = __cadesAsyncToken__ + __createCadesPluginObject__('CADESCOM.CPAttribute');
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }

        const currentTime = _getDateObj(new Date());

        try {
          void (
            __cadesAsyncToken__ + cadesAttrs.propset_Name(cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME)
          );
          void (__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при установке времени подписи');
        }

        let cadesAuthAttrs;

        try {
          void (__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
          cadesAuthAttrs = __cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
          void (__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
          void (__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          signature =
            __cadesAsyncToken__ +
            cadesSignedData.CoSignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_CADES_BES);
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || e);
        }

        return signature;
      }),
    );
  },
);
