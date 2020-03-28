import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

export interface SystemInfo {
  cadesVersion: string;
  cspVersion: string;
}

/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о CSP и плагине
 */
export const getSystemInfo = _afterPluginsLoaded(
  (): SystemInfo => {
    const sysInfo = {
      cadesVersion: null,
      cspVersion: null,
    };

    return eval(
      _generateCadesFn(function getSystemInfo(): SystemInfo {
        let cadesAbout;

        try {
          cadesAbout = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.About');

          sysInfo.cadesVersion = __cadesAsyncToken__ + cadesAbout.PluginVersion;
          sysInfo.cspVersion = __cadesAsyncToken__ + cadesAbout.CSPVersion();

          if (!sysInfo.cadesVersion) {
            sysInfo.cadesVersion = __cadesAsyncToken__ + cadesAbout.Version;
          }

          sysInfo.cadesVersion = __cadesAsyncToken__ + sysInfo.cadesVersion.toString();
          sysInfo.cspVersion = __cadesAsyncToken__ + sysInfo.cspVersion.toString();
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о системе');
        }

        return sysInfo;
      }),
    );
  },
);
