import {CadesCertificate} from '../api/certificate';
import {_afterPluginsLoaded} from './_afterPluginsLoaded';
import {_extractMeaningfulErrorMessage} from './_extractMeaningfulErrorMessage';
import {__cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn} from './_generateCadesFn';

/**
 * Возвращает сертификат в формате Cades по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат в формате Cades
 */
export const _getCadesCert = _afterPluginsLoaded(
  (thumbprint: string): CadesCertificate => {
    const {cadesplugin} = window;

    return eval(
      _generateCadesFn(function _getCadesCert() {
        let cadesStore;
        let aBcadesStore

        try {
          aBcadesStore = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.Store');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
        }

        if (!aBcadesStore) {
          throw new Error('Не удалось получить доступ к хранилищу сертификатов');
        }

        try {
          cadesStore = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.Store');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
        }

        if (!cadesStore) {
          throw new Error('Не удалось получить доступ к хранилищу сертификатов');
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
          void (
            __cadesAsyncToken__ +
            aBcadesStore.Open(
              cadesplugin.CAPICOM_CURRENT_USER_STORE,
              'Addressbook',
              cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
            )
          );
        } catch (error) {
          console.error(error);

          //throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }

        let abCadesCertificateList;
        let abCertificatesCount;

        let cadesCertificateList;
        let certificatesCount;

        try {
          cadesCertificateList = __cadesAsyncToken__ + cadesStore.Certificates;
          certificatesCount = __cadesAsyncToken__ + cadesCertificateList.Count;
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }

        if (!certificatesCount) {
          throw new Error('Нет доступных сертификатов');
        }

        try {
          abCadesCertificateList = __cadesAsyncToken__ + cadesStore.Certificates;
          abCertificatesCount = __cadesAsyncToken__ + cadesCertificateList.Count;
        } catch (error) {
          console.error(error);

          //throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
        }

        let abCadesCertificate: CadesCertificate;
        let cadesCertificate: CadesCertificate;


        try {
          abCadesCertificateList =
            __cadesAsyncToken__ + abCadesCertificateList.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);

          const count = __cadesAsyncToken__ + abCadesCertificateList.Count;

          // if (!count) {
          //   throw new Error(`Сертификат с отпечатком: "${thumbprint}" не найден`);
          // }

          cadesCertificate = __cadesAsyncToken__ + cadesCertificateList.Item(1);
        } catch (error) {
          console.error(error);

          //throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении сертификата');
        }

        if (!cadesCertificate) {
          try {
            cadesCertificateList =
              __cadesAsyncToken__ + cadesCertificateList.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);

            const count = __cadesAsyncToken__ + cadesCertificateList.Count;

            if (!count) {
              throw new Error(`Сертификат с отпечатком: "${thumbprint}" не найден`);
            }

            cadesCertificate = __cadesAsyncToken__ + cadesCertificateList.Item(1);
          } catch (error) {
            console.error(error);

            throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении сертификата');
          }
        }

        cadesStore.Close();
        aBcadesStore.Close();

        return cadesCertificate;
      }),
    );
  },
);
