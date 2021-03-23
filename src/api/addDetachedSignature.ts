import { CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME } from '../constants';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';
import { _getDateObj } from '../helpers/_getDateObj';

/**
 * Добавляет отсоединенную подпись хеша к подписанному сообщению по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param signedMessage - подписанное сообщение
 * @param messageHash - хеш подписываемого сообщения, сгенерированный по ГОСТ Р 34.11-2012 256 бит
 * @returns подпись в формате PKCS#7
 */
export const addDetachedSignature = _afterPluginsLoaded(
  async (thumbprint: string, signedMessage: string | ArrayBuffer, messageHash: string): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = await _getCadesCert(thumbprint);

    return eval(
      _generateCadesFn(function addDetachedSignature(): string {
        let cadesAttrs;
        let cadesHashedData;
        let cadesSignedData;
        let cadesSigner;

        try {
          cadesAttrs = __cadesAsyncToken__ + __createCadesPluginObject__('CADESCOM.CPAttribute');
          cadesHashedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.HashedData');
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

        let cadesAuthAttrs;

        try {
          void (__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
          cadesAuthAttrs = __cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
          void (__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
          void (__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при установке сертификата');
        }

        try {
          void (
            __cadesAsyncToken__ +
            cadesHashedData.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256)
          );
          void (__cadesAsyncToken__ + cadesHashedData.SetHashValue(messageHash));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при установке хеша');
        }

        let signature: string;

        try {
          void (
            __cadesAsyncToken__ +
            cadesSignedData.VerifyHash(cadesHashedData, signedMessage, cadesplugin.CADESCOM_PKCS7_TYPE)
          );
          signature =
            __cadesAsyncToken__ +
            cadesSignedData.CoSignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        return signature;
      }),
    );
  },
);
