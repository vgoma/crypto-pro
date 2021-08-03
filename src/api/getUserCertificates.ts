import {CadesCertificate, Certificate} from './certificate';
import {CAPICOM_PROPID_KEY_PROV_INFO} from '../constants';
import {_afterPluginsLoaded} from '../helpers/_afterPluginsLoaded';
import {_extractCommonName} from '../helpers/_extractCommonName';
import {_extractMeaningfulErrorMessage} from '../helpers/_extractMeaningfulErrorMessage';
import {__cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn} from '../helpers/_generateCadesFn';

let certificatesCache: Certificate[];

/**
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @param skipCheck = false - позволяет пропустить проверку наличия закрытых ключей
 * @returns список сертификатов
 */
export const getUserCertificates = _afterPluginsLoaded(
  (resetCache: boolean = false, skipCheck: boolean = false): Certificate[] => {
    const {cadesplugin} = window;

    if (!resetCache && certificatesCache) {
      return certificatesCache;
    }

    return eval(
      _generateCadesFn(function getUserCertificates(): Certificate[] {
        let cadesStore;
        let abCadesStore;

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
              cadesplugin.CAPICOM_CURRENT_USER_STORE,
              cadesplugin.CAPICOM_MY_STORE,
              cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
            )
          );
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }

        try {
          abCadesStore = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.Store');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
        }

        try {
          void (
            __cadesAsyncToken__ +
            abCadesStore.Open(
              cadesplugin.CAPICOM_CURRENT_USER_STORE,
              'AddressBook',
              cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
            )
          );
        } catch (error) {
          console.error(error);

          //throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }

        let cadesCertificates;
        let cadesCertificatesCount;
        let abCadesCertificates;
        let abCadesCertificatesCount;

        try {
          abCadesCertificates = __cadesAsyncToken__ + abCadesStore.Certificates;

          if (abCadesCertificates) {
            abCadesCertificates =
              __cadesAsyncToken__ + abCadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);

            if (!skipCheck) {
              /**
               * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
               * или не действительны на данный момент
               */
              abCadesCertificates =
                __cadesAsyncToken__ +
                abCadesCertificates.Find(
                  cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
                  CAPICOM_PROPID_KEY_PROV_INFO,
                );
            }

            abCadesCertificatesCount = __cadesAsyncToken__ + abCadesCertificates.Count;
          }
        } catch (error) {
          console.error(error);

          //throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }

        try {
          cadesCertificates = __cadesAsyncToken__ + cadesStore.Certificates;

          if (cadesCertificates) {
            cadesCertificates =
              __cadesAsyncToken__ + cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);

            if (!skipCheck) {
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
            }

            cadesCertificatesCount = __cadesAsyncToken__ + cadesCertificates.Count;
          }
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }

        if (!cadesCertificatesCount && !abCadesCertificatesCount) {
          throw new Error('Нет доступных сертификатов');
        }

        const certificateList: Certificate[] = [];
        const abCertificateList: Certificate[] = [];

        try {
          while (abCadesCertificatesCount) {
            const abCadesCertificate: CadesCertificate =
              __cadesAsyncToken__ + abCadesCertificates.Item(abCadesCertificatesCount);

            certificateList.push(
              new Certificate(
                abCadesCertificate,
                _extractCommonName(__cadesAsyncToken__ + abCadesCertificate.SubjectName),
                __cadesAsyncToken__ + abCadesCertificate.IssuerName,
                __cadesAsyncToken__ + abCadesCertificate.SubjectName,
                __cadesAsyncToken__ + abCadesCertificate.Thumbprint,
                __cadesAsyncToken__ + abCadesCertificate.ValidFromDate,
                __cadesAsyncToken__ + abCadesCertificate.ValidToDate,
                __cadesAsyncToken__ + abCadesCertificate.HasPrivateKey(),
              ),
            );

            abCadesCertificatesCount--;
          }
        } catch (error) {
          console.error(error);

//          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка обработки сертификатов');
        }

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
                __cadesAsyncToken__ + cadesCertificate.HasPrivateKey(),
              ),
            );

            cadesCertificatesCount--;
          }
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка обработки сертификатов');
        }

        cadesStore.Close();
        abCadesStore.Close()

        certificatesCache = certificateList;

        return certificatesCache;
      }),
    );
  },
);
