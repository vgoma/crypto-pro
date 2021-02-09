/**
 * Проверяет присоединенную подпись
 *
 * @param signedMessage - подпись сообщения
 * @param unencryptedMessage - подписываемое сообщение
 * @returns boolean
 */
export declare const verifyAttachedSignature: (signedMessage: string, unencryptedMessage: string | ArrayBuffer) => Promise<string>;
