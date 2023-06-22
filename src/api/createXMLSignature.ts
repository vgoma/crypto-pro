import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';

/** Дополнительные настройки */
type Options = {
  /**
   * Метод подписи
   *
   * @defaultValue `cadesplugin.XmlDsigGost3410Url2012256`
   */
  signatureMethod?: string;
  /**
   * Метод формирования дайджеста
   *
   * @defaultValue `cadesplugin.XmlDsigGost3411Url2012256`
   */
  digestMethod?: string;
};

/**
 * Создает XML подпись для документа в формате XML
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @options - дополнительные настройки
 *
 * @returns подпись
 */
export const createXMLSignature = _afterPluginsLoaded(
  async (thumbprint: string, unencryptedMessage: string, options?: Options): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = await _getCadesCert(thumbprint);

    return eval(
      _generateCadesFn(function createXMLSignature(): string {
        let cadesSigner;
        let cadesSignedXML;

        try {
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
          cadesSignedXML = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.SignedXML');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        try {
          const signatureMethod = options?.signatureMethod ?? cadesplugin.XmlDsigGost3410Url2012256;
          const digestMethod = options?.digestMethod ?? cadesplugin.XmlDsigGost3411Url2012256;

          void (__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
          void (__cadesAsyncToken__ + cadesSigner.propset_CheckCertificate(true));
          void (__cadesAsyncToken__ + cadesSignedXML.propset_Content(unencryptedMessage));
          void (
            __cadesAsyncToken__ +
            cadesSignedXML.propset_SignatureType(cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED)
          );
          void (__cadesAsyncToken__ + cadesSignedXML.propset_SignatureMethod(signatureMethod));
          void (__cadesAsyncToken__ + cadesSignedXML.propset_DigestMethod(digestMethod));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          signature = __cadesAsyncToken__ + cadesSignedXML.Sign(cadesSigner);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        return signature;
      }),
    );
  },
);
