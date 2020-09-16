import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

/**
 * Расшифровывает сообщение полученное вызовом метода encryptEnvelopedData
 *
 * @param sSignedData - строка с зашифрованным сообщением
 * @returns строку исходного сообщения
 */
export const decryptEvelopedData = _afterPluginsLoaded(
  async (sSignedData: string): Promise<string> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function decryptEnvelopedData(): any {
        let cadesEnvelopedData;

        try {
          cadesEnvelopedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }

        try {
          void (
            __cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY)
          );
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для проверки подписи');
        }

        let encData: string;
        try {
          void (__cadesAsyncToken__ + cadesEnvelopedData.Decrypt(sSignedData));
          encData = __cadesAsyncToken__ + cadesEnvelopedData.Content;
        } catch (e) {
          console.log(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка расшифровки подписанного сообщения');
        }

        return encData;
      }),
    );
  },
);
