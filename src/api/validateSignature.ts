import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

/**
 * todo
 * @returns результат проверки
 */
export const validateSignature = _afterPluginsLoaded(
  async (signedMessage: string, dataToVerify: string): Promise<boolean> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function validateSignature(): boolean {
        let cadesSignedData;

        try {
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации проверки подписи');
        }

        try {
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesSignedData.propset_Content(dataToVerify));
          void (__cadesAsyncToken__ + cadesSignedData.VerifyCades(signedMessage, cadesplugin.CADESCOM_CADES_BES, true));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Не удалось проверить подпись');
        }

        return true;
      }),
    );
  },
);
