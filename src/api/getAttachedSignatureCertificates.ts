import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { CadesCertificate, Certificate } from './certificate';
import { _extractCommonName } from '../helpers/_extractCommonName';

/**
 * Получает список сертификатов, подписавших сообщение
 *
 * @param signedMessage - подпись сообщения
 * @param unencryptedMessage - подписываемое сообщение
 * @returns список сертификатов
 */
export const getAttachedSignatureCertificates = _afterPluginsLoaded(
  (signedMessage: string, unencryptedMessage: string): Certificate[] => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function verifyAttachedSignature(): Certificate[] {
        let cadesSignedData;

        try {
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        let messageBase64;

        try {
          messageBase64 = Buffer.from(unencryptedMessage).toString('base64');
        } catch (error) {
          console.error(error);

          throw new Error('Ошибка при преобразовании сообщения в Base64');
        }

        try {
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesSignedData.propset_Content(messageBase64));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let cadesCertificates;
        let cadesCertificatesCount;

        try {
          void (
            __cadesAsyncToken__ + cadesSignedData.VerifyCades(signedMessage, cadesplugin.CADESCOM_PKCS7_TYPE, true)
          );

          cadesCertificates = __cadesAsyncToken__ + cadesSignedData.Certificates;
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

        return certificateList;
      }),
    );
  },
);
