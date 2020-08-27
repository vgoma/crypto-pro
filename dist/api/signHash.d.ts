/**
 * Создает подпись хеша по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param messageHash - хэш подписываемого сообщения, сгенерированный по ГОСТ Р 34.11
 * @returns подпись
 */
export declare const signHash: (thumbprint: string, messageHash: string) => Promise<string>;
