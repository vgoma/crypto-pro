import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, _generateCadesFn } from '../../helpers/_generateCadesFn';
import { Certificate } from './certificate';

export interface AlgorithmInfo {
  algorithm: string;
  oid: string;
}

/**
 * Возвращает информацию об алгоритме сертификата
 *
 * @returns информацию об алгоритме и его OID'е
 */
export const getAlgorithm = _afterPluginsLoaded(function (): AlgorithmInfo {
  const cadesCertificate = (this as Certificate)._cadesCertificate;

  return eval(
    _generateCadesFn(function getAlgorithm(): AlgorithmInfo {
      const algorithmInfo: AlgorithmInfo = {
        algorithm: null,
        oid: null,
      };
      let cadesPublicKey;

      try {
        cadesPublicKey = __cadesAsyncToken__ + cadesCertificate.PublicKey();
        cadesPublicKey = __cadesAsyncToken__ + cadesPublicKey.Algorithm;
        algorithmInfo.algorithm = __cadesAsyncToken__ + cadesPublicKey.FriendlyName;
        algorithmInfo.oid = __cadesAsyncToken__ + cadesPublicKey.Value;
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении алгоритма');
      }

      return algorithmInfo;
    }),
  );
});
