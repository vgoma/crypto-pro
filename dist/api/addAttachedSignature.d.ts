/**
 * Добавляет присоединенную подпись к подписанному сообщению по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param signedMessage - подписанное сообщение
 * @returns подпись в формате PKCS#7
 */
export declare const addAttachedSignature: (thumbprint: string, signedMessage: string | ArrayBuffer) => Promise<string>;
