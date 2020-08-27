declare type Algorithm = 'GOST_3411' | 'GOST_3411_2012_256' | 'GOST_3411_2012_512' | 'GOST_3411_HMAC' | 'GOST_3411_2012_256_HMAC' | 'GOST_3411_2012_512_HMAC';
/**
 * Создает хэш сообщения по ГОСТ Р 34.11
 * https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%B8%D0%B1%D0%BE%D0%B3_(%D1%85%D0%B5%D1%88-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F)
 *
 * @param unencryptedMessage - сообщение для хеширования
 * @param algorithm - один из алгоритмов хеширования:
 * GOST_3411
 * GOST_3411_2012_256
 * GOST_3411_2012_512 - по умолчанию
 * GOST_3411_HMAC
 * GOST_3411_2012_256_HMAC
 * GOST_3411_2012_512_HMAC
 *
 * @returns хэш
 */
export declare const createHash: (unencryptedMessage: string | ArrayBuffer, algorithm?: Algorithm) => Promise<string>;
export {};
