import { CadesCertificate, Certificate } from './certificate';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractCommonName } from '../helpers/_extractCommonName';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

let certificatesCache: Certificate[];

/**
 * Начиная с версии плагина 2.0.13292 есть возможность получить сертификаты из закрытых ключей
 * Возвращает все сертификаты без фильтрации по дате и наличию приватного ключа
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export const getAllContainerCertificates = _afterPluginsLoaded((resetCache: boolean = false): Certificate[] => {
  const { cadesplugin } = window;

  if (!resetCache && certificatesCache) {
    return certificatesCache;
  }

  return eval(
    _generateCadesFn(function getAllContainerCertificates(): Certificate[] {
      let cadesStore;

      try {
        cadesStore = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.Store');
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
      }

      try {
        void (
          __cadesAsyncToken__ +
          cadesStore.Open(
            cadesplugin.CADESCOM_CONTAINER_STORE,
            cadesplugin.CAPICOM_MY_STORE,
            cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
          )
        );
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
      }

      let cadesCertificates;
      let cadesCertificatesCount;

      try {
        cadesCertificates = __cadesAsyncToken__ + cadesStore.Certificates;
        cadesCertificatesCount = __cadesAsyncToken__ + cadesCertificates.Count;
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
      }

      if (!cadesCertificatesCount) {
        throw new Error('Нет доступных сертификатов');
      }

      const certificateList: Certificate[] = [];

      try {
        while (cadesCertificatesCount) {
          const cadesCertificate: CadesCertificate =
            __cadesAsyncToken__ + cadesCertificates.Item(cadesCertificatesCount);

          certificateList.push(
            new Certificate(
              cadesCertificate,
              _extractCommonName(__cadesAsyncToken__ + cadesCertificate.SubjectName),
              __cadesAsyncToken__ + cadesCertificate.IssuerName,
              __cadesAsyncToken__ + cadesCertificate.SubjectName,
              __cadesAsyncToken__ + cadesCertificate.Thumbprint,
              __cadesAsyncToken__ + cadesCertificate.ValidFromDate,
              __cadesAsyncToken__ + cadesCertificate.ValidToDate,
            ),
          );

          cadesCertificatesCount--;
        }
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка обработки сертификатов');
      }

      cadesStore.Close();

      certificatesCache = certificateList;

      return certificatesCache;
    }),
  );
});
