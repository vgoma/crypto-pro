/**
 * Создает присоединенную подпись сообщения по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение
 * @returns подпись в формате PKCS#7
 */
export declare const createAttachedSignature: (thumbprint: string, unencryptedMessage: string | ArrayBuffer) => Promise<string>;
