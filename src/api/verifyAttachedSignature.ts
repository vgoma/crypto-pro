import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

/**
 * Проверяет присоединенную подпись
 *
 * @param signedMessage - подпись сообщения
 * @param unencryptedMessage - подписываемое сообщение
 * @returns boolean
 */
export const verifyAttachedSignature = _afterPluginsLoaded(
  async (signedMessage: string, unencryptedMessage: string | ArrayBuffer): Promise<string> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function verifyAttachedSignature(): boolean {
        let cadesSignedData;

        try {
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        let messageBase64;

        try {
          messageBase64 = Buffer.from(unencryptedMessage).toString('base64');
        } catch (error) {
          console.error(error);

          throw new Error('Ошибка при преобразовании сообщения в Base64');
        }

        try {
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesSignedData.propset_Content(messageBase64));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let isValid: boolean;

        try {
          isValid =
            __cadesAsyncToken__ + cadesSignedData.VerifyCades(signedMessage, cadesplugin.CADESCOM_PKCS7_TYPE, true);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при валидации подписи');
        }

        return isValid;
      }),
    );
  },
);
