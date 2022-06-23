import { CadesCertificate, Certificate } from './certificate';
import { CAPICOM_PROPID_KEY_PROV_INFO } from '../constants';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractCommonName } from '../helpers/_extractCommonName';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

let certificatesCache: Certificate[];

/**
 * Начиная с версии плагина 2.0.13292 есть возможность получить сертификаты из закрытых ключей
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export const getContainerCertificates = _afterPluginsLoaded((resetCache: boolean = false): Certificate[] => {
  const { cadesplugin } = window;

  if (!resetCache && certificatesCache) {
    return certificatesCache;
  }

  return eval(
    _generateCadesFn(function getContainerCertificates(): Certificate[] {
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

        if (cadesCertificates) {
          cadesCertificates =
            __cadesAsyncToken__ + cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);

          /**
           * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
           * или не действительны на данный момент
           */
          cadesCertificates =
            __cadesAsyncToken__ +
            cadesCertificates.Find(
              cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
              CAPICOM_PROPID_KEY_PROV_INFO,
            );

          cadesCertificatesCount = __cadesAsyncToken__ + cadesCertificates.Count;
        }
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
