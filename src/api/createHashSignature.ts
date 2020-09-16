import { CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME, CADESCOM_BASE64_TO_BINARY } from '../constants';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getDateObj } from '../helpers/_getDateObj';
import { Certificate } from './certificate';

/**
 * Создаёт подпись для хешированного сообщения
 *
 * @param oCertificate - объект класса Certificate для подписания сообщения
 * @param oHashedData - объект класса oHashedData содержащий в себе захэшированное сообщение
 * @returns строку с подписанным хэшем
 */
export const createHashSignature = _afterPluginsLoaded(
  async (oCertificate: Certificate, oHashedData: any): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = oCertificate._cadesCertificate;
    const algorithm = await oHashedData.Algorithm;
    const hashValue = await oHashedData.Value;

    return eval(
      _generateCadesFn(function createHashSignature(): string {
        let cadesAttrs;
        let cadesSignedData;
        let cadesSigner;
        let cadesHashedData;

        try {
          cadesAttrs = __cadesAsyncToken__ + __createCadesPluginObject__('CADESCOM.CPAttribute');
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
          cadesHashedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.HashedData');
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }

        const currentTime = _getDateObj(new Date());

        try {
          void (__cadesAsyncToken__ + cadesAttrs.propset_Name(CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
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
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));

          void (__cadesAsyncToken__ + cadesHashedData.propset_Algorithm(algorithm));
          void (__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesHashedData.SetHashValue(hashValue));
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;
        try {
          signature =
            __cadesAsyncToken__ +
            cadesSignedData.SignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_CADES_BES);
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || e);
        }

        return signature;
      }),
    );
  },
);
