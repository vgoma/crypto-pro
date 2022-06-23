/**
 * Добавляет отсоединенную подпись хеша к подписанному сообщению по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param signedMessage - подписанное сообщение
 * @param messageHash - хеш подписываемого сообщения, сгенерированный по ГОСТ Р 34.11-2012 256 бит
 * @returns подпись в формате PKCS#7
 */
export declare const addDetachedSignature: (thumbprint: string, signedMessage: string | ArrayBuffer, messageHash: string) => Promise<string>;
