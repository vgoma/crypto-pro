import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

/**
 * Расшифровывает конвертированные данные
 *
 * @param envelopedData - данные для расшифрования
 * @returns расшифрованное собщение
 */
export const decryptEnvelopedData = _afterPluginsLoaded(
  async (envelopedData: string): Promise<string> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function decryptEnvelopedData(): string {
        let decryptedMessage: string;

        const cadesEnvelopedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
        try {
          void (
            __cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY)
          );
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации расшифрования');
        }

        try {
          void (__cadesAsyncToken__ + cadesEnvelopedData.Decrypt(envelopedData));
          decryptedMessage = cadesEnvelopedData.Content;
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при расшифровании данных');
        }

        return decryptedMessage;
      }),
    );
  },
);
