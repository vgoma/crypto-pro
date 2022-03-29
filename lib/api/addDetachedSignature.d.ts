/**
 * Добавляет отсоединенную подпись хеша к подписанному сообщению по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param signedMessage - подписанное сообщение
 * @param unencryptedMessage - подписываемое сообщение
 * @returns подпись в формате PKCS#7
 */
export declare const addDetachedSignature: (thumbprint: string, signedMessage: string | ArrayBuffer, unencryptedMessage: string | ArrayBuffer) => Promise<string>;
