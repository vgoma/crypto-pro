import { CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME } from '../constants';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';
import { _getDateObj } from '../helpers/_getDateObj';

/**
 * Добавляет присоединенную подпись к подписанному сообщению по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param signedMessage - подписанное сообщение
 * @returns подпись в формате PKCS#7
 */
export const addAttachedSignature = _afterPluginsLoaded(
  async (thumbprint: string, signedMessage: string | ArrayBuffer): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = await _getCadesCert(thumbprint);

    return eval(
      _generateCadesFn(function addAttachedSignature(): string {
        let cadesAttrs;
        let cadesSignedData;
        let cadesSigner;

        try {
          cadesAttrs = __cadesAsyncToken__ + __createCadesPluginObject__('CADESCOM.CPAttribute');
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        const currentTime = _getDateObj(new Date());

        try {
          void (__cadesAsyncToken__ + cadesAttrs.propset_Name(CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
          void (__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при установке времени подписи');
        }

        let messageBase64;

        try {
          messageBase64 = Buffer.from(signedMessage).toString('base64');
        } catch (error) {
          console.error(error);

          throw new Error('Ошибка при преобразовании сообщения в Base64');
        }

        let cadesAuthAttrs;

        try {
          void (__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
          cadesAuthAttrs = __cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
          void (__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesSignedData.propset_Content(messageBase64));
          void (__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          void (__cadesAsyncToken__ + cadesSignedData.VerifyCades(signedMessage, cadesplugin.CADESCOM_PKCS7_TYPE));
          signature = __cadesAsyncToken__ + cadesSignedData.CoSignCades(cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        return signature;
      }),
    );
  },
);
