import { CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED } from '../constants';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';



/**
 * Создает CadesBes XML подпись  
 *
 * @param thumbprint - отпечаток сертификата
 * @param xml - XML сообщение
 * @returns подписанный XML
 */
export const createSignatureCadesXML = _afterPluginsLoaded(
	async (thumbprint: string, xml: string): Promise<string> => {
		const { cadesplugin } = window;
		const Certificate = await _getCadesCert(thumbprint);

		return eval(
			_generateCadesFn(function createSignatureCadesXML(): string {
				let cadesSignedXML;
				let cadesSigner;
				let signMethod; 
				let digestMethod;

				try {
					cadesSignedXML = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.SignedXML');
					cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
					cadesSigner.propset_Certificate(Certificate);
				} catch (error) {
					console.error(error);

					throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
				}

				let pk = __cadesAsyncToken__ + Certificate.PublicKey();
				let Algorithm = __cadesAsyncToken__ + pk.Algorithm;
				let algoOid = __cadesAsyncToken__ + Algorithm.Value;
				console.debug('algoOid=', algoOid);
				switch (algoOid) {
					case '1.2.643.7.1.1.1.1': // алгоритм подписи ГОСТ Р 34.10-2012 с ключом 256 бит
						signMethod = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256";
						digestMethod = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256";
						break;

					case '1.2.643.7.1.1.1.2': // алгоритм подписи ГОСТ Р 34.10-2012 с ключом 512 бит
						signMethod = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-512";
						digestMethod = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-512";
						break;

					case '1.2.643.2.2.19': // алгоритм ГОСТ Р 34.10-2001
						signMethod = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411";
						digestMethod = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411";
						break;
					default:
						throw "Поддерживается XML подпись сертификатами только с алгоритмами ГОСТ Р 34.10";
				}


				let Signature: string;
				if (xml) {
					void (__cadesAsyncToken__ + cadesSignedXML.propset_Content(xml));
					void (__cadesAsyncToken__ + cadesSignedXML.propset_SignatureType(CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED));
					void (__cadesAsyncToken__ + cadesSignedXML.propset_SignatureMethod(signMethod));
					void (__cadesAsyncToken__ + cadesSignedXML.propset_DigestMethod(digestMethod));

					try {
						Signature = __cadesAsyncToken__ + cadesSignedXML.Sign(cadesSigner);
					}
					catch (err) {
						throw "Не удалось создать подпись из-за ошибки: " + err.message;
					}
				} else {
					throw "Нет данных для подписи"
				}
				return Signature;
			}),
		);
	},
);
