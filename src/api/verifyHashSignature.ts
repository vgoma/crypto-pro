import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { CADESCOM_CADES_BES, CADESCOM_BASE64_TO_BINARY } from '../constants';

/**
 * Валидация подписи хэшированного сообщения
 *
 * @param oHashedData - объект oHashedData с установленным значением Value и Algorithm
 * @param sSignedMessage - подписанное сообщение для валидации
 * @returns true или ошибку
 */
export const verifyHashSignature = _afterPluginsLoaded(
  async (oHashedData: any, sSignedMessage: string): Promise<boolean> => {
    const algorithm = await oHashedData.Algorithm;
    const hashValue = await oHashedData.Value;

    return eval(
      _generateCadesFn(function verifyHashSignature(): boolean {
        let cadesSignedData;

        try {
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }

        try {
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(CADESCOM_BASE64_TO_BINARY));
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для верификации');
        }

        try {
          void (__cadesAsyncToken__ + cadesSignedData.VerifyHash(oHashedData, sSignedMessage, CADESCOM_CADES_BES));
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при верификации данных');
        }

        return true;
      }),
    );
  },
);
