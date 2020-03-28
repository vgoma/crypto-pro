import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { _isSupportedCadesVersion } from '../helpers/_isSupportedCadesVersion';
import { _isSupportedCSPVersion } from '../helpers/_isSupportedCSPVersion';
import { getSystemInfo, SystemInfo } from './getSystemInfo';

/**
 * Проверяет корректность настроек ЭП на машине
 *
 * @returns флаг корректности настроек
 */
export const isValidSystemSetup = _afterPluginsLoaded(
  async (): Promise<boolean> => {
    let systemInfo: SystemInfo;

    try {
      systemInfo = await getSystemInfo();
    } catch (error) {
      console.error(error);

      throw new Error(_extractMeaningfulErrorMessage(error) || 'Настройки ЭП на данной машине не верны');
    }

    if (!_isSupportedCadesVersion(systemInfo.cadesVersion)) {
      throw new Error('Не поддерживаемая версия плагина');
    }

    if (!_isSupportedCSPVersion(systemInfo.cspVersion)) {
      throw new Error('Не поддерживаемая версия CSP');
    }

    return true;
  },
);
