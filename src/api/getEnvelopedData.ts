import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

/**
 * Создаёт объект CAdESCOM.CPEnvelopedData
 * @returns объект CAdESCOM.CPEnvelopedData
 */
export const getEnvelopedData = _afterPluginsLoaded(
  async (): Promise<any> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function streamEncryptEnvelopedData(): any {
        let cadesEnvelopedData;

        try {
          cadesEnvelopedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
        } catch (e) {
          console.log(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }

        try {
          void (
            __cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY)
          );
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных подписи');
        }

        return cadesEnvelopedData;
      }),
    );
  },
);
