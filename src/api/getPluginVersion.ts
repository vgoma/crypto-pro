import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о плагине
 */
export const getPluginVersion = _afterPluginsLoaded((): string => {
  let cadesVersion = null;

  return eval(
    _generateCadesFn(function getPluginVersion(): string {
      let cadesAbout;

      try {
        cadesAbout = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.About');

        cadesVersion = __cadesAsyncToken__ + cadesAbout.PluginVersion;

        if (!cadesVersion) {
          cadesVersion = __cadesAsyncToken__ + cadesAbout.Version;
        }

        cadesVersion = __cadesAsyncToken__ + cadesVersion.toString();
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о плагине');
      }

      return cadesVersion;
    }),
  );
});
