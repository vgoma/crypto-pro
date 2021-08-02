import { CadesCertificate } from '../api/certificate';
import { _afterPluginsLoaded } from './_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from './_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from './_generateCadesFn';

/**
 * Возвращает сертификат в формате Cades по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат в формате Cades
 */
export const _getCadesCert = _afterPluginsLoaded(
  (thumbprint: string): CadesCertificate => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function _getCadesCert() {
        let cadesStore;

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
            cadesStore.Open()
          );
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
        }

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

        let cadesCertificate: CadesCertificate;

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

        cadesStore.Close();

        return cadesCertificate;
      }),
    );
  },
);
