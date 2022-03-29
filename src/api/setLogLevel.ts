import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';

type LogLevel = 4 | 2 | 1;

/**
 * Устанавливает уровень логирование для плагина Крипто-ПРО
 */
export const setLogLevel = _afterPluginsLoaded((level: LogLevel): void => {
  cadesplugin.set_log_level(level);
});
