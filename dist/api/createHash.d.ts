/**
 * Создает хэш сообщения по ГОСТ Р 34.11-2012 256 бит
 * https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%B8%D0%B1%D0%BE%D0%B3_(%D1%85%D0%B5%D1%88-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F)
 *
 * @param unencryptedMessage - сообщение для хеширования
 *
 * @returns хэш
 */
export declare const createHash: (unencryptedMessage: string | ArrayBuffer) => Promise<string>;
