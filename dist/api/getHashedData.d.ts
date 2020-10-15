/**
 * Создаёт объект oHashedData с заданным алгоритмом шифрования
 *
 * @param hashAlg = 101 - код алгоритма шифрования из списка констант
 * @returns объект oHashedData
 */
export declare const getHashedData: (hashAlg?: number) => Promise<any>;
