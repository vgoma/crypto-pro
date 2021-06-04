import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о CSP
 */
export const getCspVersion = _afterPluginsLoaded((): string => {
  let cspVersion = null;

  return eval(
    _generateCadesFn(function getCspVersion(): string {
      let cadesAbout;

      try {
        cadesAbout = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.About');

        cspVersion = __cadesAsyncToken__ + cadesAbout.CSPVersion();

        cspVersion = __cadesAsyncToken__ + cspVersion.toString();
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении версии системы');
      }

      return cspVersion;
    }),
  );
});
