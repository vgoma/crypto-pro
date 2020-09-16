import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { Certificate } from './certificate';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

/**
 * Создаёт зашифрованное сообщение из base64 строки по списку сертификатов
 * @param oCertificateList - массив объектов Certificate для добавления в список реципиентов сообщения
 * @param dataBase64 - строковые данные в формате base64
 * @returns строку с зашифрованным сообщением
 */
export const encryptEnvelopedData = _afterPluginsLoaded(
  async (oCertificateList: Array<Certificate>, dataBase64: string): Promise<string> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function encryptEnvelopedData(): string {
        let cadesEnvelopedData;

        try {
          cadesEnvelopedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при инициализации подписи');
        }

        const cadesReceipients = __cadesAsyncToken__ + cadesEnvelopedData.Recipients;
        try {
          void (
            __cadesAsyncToken__ + cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY)
          );
          void (__cadesAsyncToken__ + cadesEnvelopedData.propset_Content(dataBase64));

          for (const oCertificate of oCertificateList) {
            void (__cadesAsyncToken__ + cadesReceipients.Add(oCertificate._cadesCertificate));
          }
        } catch (e) {
          console.error(e);

          throw new Error(_extractMeaningfulErrorMessage(e) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          signature = __cadesAsyncToken__ + cadesEnvelopedData.Encrypt();
        } catch (e) {
          console.error(e);
        }

        return signature;
      }),
    );
  },
);
