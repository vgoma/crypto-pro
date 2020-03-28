import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, _generateCadesFn } from '../../helpers/_generateCadesFn';
import { Certificate } from './certificate';

/**
 * Возвращает указанное внутренее свойство у сертификата в формате Cades
 *
 * @param propName = наименование свойства
 * @returns значение запрошенного свойства
 */
export const getCadesProp = _afterPluginsLoaded(function (propName: string): any {
  const cadesCertificate = (this as Certificate)._cadesCertificate;

  return eval(
    _generateCadesFn(function getCadesProp() {
      let propertyValue;

      try {
        propertyValue = __cadesAsyncToken__ + cadesCertificate[propName];
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при обращении к свойству сертификата');
      }

      return propertyValue;
    }),
  );
});
