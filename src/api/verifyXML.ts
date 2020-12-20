import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';



/**
 * Проверяет CadesBes XML подпись  
 *
  * @param signedxml - подписанное XML сообщение
 * @returns подписанный XML
 */
export const verifyXML = _afterPluginsLoaded(
	async (signedxml: string): Promise<string> => {
		const { cadesplugin } = window;

		return eval(
			_generateCadesFn(function verifyXML(): boolean {
				let cadesSignedXML;

				try {
					cadesSignedXML = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.SignedXML');
				} catch (error) {
					console.error(error);
					throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
				}
				try {
					void (__cadesAsyncToken__ + cadesSignedXML.Verify(signedxml));
					return true;
				} catch (error) {
					return false;
				};


			}),
		);
	},
);
