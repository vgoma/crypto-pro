import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

/**
 * Функция кастомной реализации с доступом к Cades плагину напрямую
 *
 * @callback executeCallback
 * @param exposedAPI - API доступные для кастомной реализации
 * @param exposedAPI.cadesplugin - Cades плагин, предоставляемый КриптоПРО
 * @param exposedAPI._generateCadesFn - функция, компилирующая тело передаваемой javascript функции для текущей среды
 * @param exposedAPI.__cadesAsyncToken__ - синтетический маркер, подменяемый в рантайме
 * @param exposedAPI.__createCadesPluginObject__ - функция для создания синхронных/асинхронных Cades объектов
 * @param exposedAPI._extractMeaningfulErrorMessage - хелпер для извлечения текста ошибки
 *
 * @returns результат выполнения кастомной реализации
 */

/**
 * Компилирует и выполняет переданную функцию для доступной браузерной среды (синхронной/асинхронной)
 *
 * @param {executeCallback} callback - функция, использующая низкоуровневый доступ к Cades плагину
 *
 * @returns асинхронный результат выполнения передаваемой функции
 */
export const execute = _afterPluginsLoaded(
  async (
    callback: (exposedAPI: {
      cadesplugin: any;
      _generateCadesFn: (callback: Function) => string;
      __cadesAsyncToken__: object;
      __createCadesPluginObject__: (...args) => any;
      _extractMeaningfulErrorMessage: (error: Error) => string | null;
    }) => any,
  ): Promise<any> =>
    await callback({
      cadesplugin: window.cadesplugin,
      _generateCadesFn,
      __cadesAsyncToken__,
      __createCadesPluginObject__,
      _extractMeaningfulErrorMessage,
    }),
);
