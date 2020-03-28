import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, _generateCadesFn } from '../../helpers/_generateCadesFn';
import { Certificate } from './certificate';

/**
 * Проверяет действительность сертификата
 *
 * @returns флаг валидности
 */
export const isValid = _afterPluginsLoaded(function (): boolean {
  const cadesCertificate = (this as Certificate)._cadesCertificate;

  return eval(
    _generateCadesFn(function isValid() {
      let isValid;

      try {
        isValid = __cadesAsyncToken__ + cadesCertificate.IsValid();
        isValid = __cadesAsyncToken__ + isValid.Result;
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при проверке сертификата');
      }

      return Boolean(isValid);
    }),
  );
});
