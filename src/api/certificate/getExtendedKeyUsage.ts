import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, _generateCadesFn } from '../../helpers/_generateCadesFn';
import { Certificate } from './certificate';

/**
 * Возвращает ОИД'ы сертификата
 *
 * @returns список ОИД'ов
 */
export const getExtendedKeyUsage = _afterPluginsLoaded(function (): string[] {
  const cadesCertificate = (this as Certificate)._cadesCertificate;

  return eval(
    _generateCadesFn(function getExtendedKeyUsage(): string[] {
      const OIDS: string[] = [];
      let count: any;

      try {
        count = __cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
        count = __cadesAsyncToken__ + count.EKUs;
        count = __cadesAsyncToken__ + count.Count;

        if (count > 0) {
          while (count > 0) {
            let cadesExtendedKeyUsage;

            cadesExtendedKeyUsage = __cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
            cadesExtendedKeyUsage = __cadesAsyncToken__ + cadesExtendedKeyUsage.EKUs;
            cadesExtendedKeyUsage = __cadesAsyncToken__ + cadesExtendedKeyUsage.Item(count);
            cadesExtendedKeyUsage = __cadesAsyncToken__ + cadesExtendedKeyUsage.OID;

            OIDS.push(cadesExtendedKeyUsage);

            count--;
          }
        }
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || "Ошибка при получении ОИД'ов");
      }

      return OIDS;
    }),
  );
});
