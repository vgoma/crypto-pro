/**
 * Создает подпись base64 строки по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param dataBase64 - строковые данные в формате base64
 * @param detachedSignature = true - тип подписи открепленная (true) / присоединенная (false)
 * @returns подпись
 */
export declare const createSignature: (thumbprint: string, dataBase64: string, detachedSignature?: boolean) => Promise<string>;
