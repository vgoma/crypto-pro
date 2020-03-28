import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, _generateCadesFn } from '../../helpers/_generateCadesFn';
import { Certificate } from './certificate';

/**
 * Экспортирует сертификат в формате base64
 *
 * @returns сертификат в формате base64
 */
export const exportBase64 = _afterPluginsLoaded(function (): string {
  const cadesCertificate = (this as Certificate)._cadesCertificate;

  return eval(
    _generateCadesFn(function exportBase64(): string {
      let base64: string;

      try {
        base64 = __cadesAsyncToken__ + cadesCertificate.Export(0);
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при экспорте сертификата');
      }

      return base64;
    }),
  );
});
