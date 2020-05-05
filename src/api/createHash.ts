import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

type Algorithm =
  | 'GOST_3411'
  | 'GOST_3411_2012_256'
  | 'GOST_3411_2012_512'
  | 'GOST_3411_HMAC'
  | 'GOST_3411_2012_256_HMAC'
  | 'GOST_3411_2012_512_HMAC';

/**
 * Создает хэш сообщения по ГОСТ Р 34.11
 * https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%B8%D0%B1%D0%BE%D0%B3_(%D1%85%D0%B5%D1%88-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F)
 *
 * @param unencryptedMessage - сообщение для хеширования
 * @param algorithm - один из алгоритмов хеширования:
 * GOST_3411
 * GOST_3411_2012_256
 * GOST_3411_2012_512 - по умолчанию
 * GOST_3411_HMAC
 * GOST_3411_2012_256_HMAC
 * GOST_3411_2012_512_HMAC
 *
 * @returns хэш
 */
export const createHash = _afterPluginsLoaded(
  async (unencryptedMessage: string | ArrayBuffer, algorithm: Algorithm = 'GOST_3411_2012_512'): Promise<string> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function createHash(): string {
        const cadesHashedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.HashedData');
        let messageBase64;
        let hash;

        try {
          messageBase64 = Buffer.from(unencryptedMessage).toString('base64');
        } catch (error) {
          console.error(error);

          throw new Error('Ошибка при преобразовании сообщения в Base64');
        }

        try {
          void (
            __cadesAsyncToken__ +
            cadesHashedData.propset_Algorithm(cadesplugin['CADESCOM_HASH_ALGORITHM_CP_' + algorithm])
          );
          void (__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesHashedData.Hash(messageBase64));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации хэширования');
        }

        try {
          hash = __cadesAsyncToken__ + cadesHashedData.Value;
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при создании хэша');
        }

        return hash;
      }),
    );
  },
);
