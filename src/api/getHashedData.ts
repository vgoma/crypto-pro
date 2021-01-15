import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { CADESCOM_BASE64_TO_BINARY, CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 } from '../constants';

/**
 * Создаёт объект oHashedData с заданным алгоритмом шифрования
 *
 * @param hashAlg = 101 - код алгоритма хеширования из списка констант(/src/constants/cades-constants.ts)
 * @returns объект oHashedData
 */
export const getHashedData = _afterPluginsLoaded(
  async (hashAlg: number = CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256): Promise<any> => {
    return eval(
      _generateCadesFn(function createHashedData(): any {
        let oHashedData;

        try {
          oHashedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.HashedData');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Не удалось получить хэш функцию');
        }

        try {
          void (__cadesAsyncToken__ + oHashedData.propset_Algorithm(hashAlg));
          void (__cadesAsyncToken__ + oHashedData.propset_DataEncoding(CADESCOM_BASE64_TO_BINARY));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Не удалось установить настройки хеширования');
        }

        return oHashedData;
      }),
    );
  },
);
