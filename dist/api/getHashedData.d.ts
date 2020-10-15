/**
 * Создаёт объект oHashedData с заданным алгоритмом шифрования
 *
 * @param hashAlg = 101 - код алгоритма хеширования из списка констант(/src/constants/cades-constants.ts)
 * @returns объект oHashedData
 */
export declare const getHashedData: (hashAlg?: number) => Promise<any>;
