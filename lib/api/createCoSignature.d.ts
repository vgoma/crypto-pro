import { Certificate } from './certificate';
/**
 * Добавляет подписанта к уже существующим для данного подписанного сообщения
 *
 * @param oCertificate - объект класса Certificate, которым необходимо подписать сообщение
 * @param oHashedData - объект oHashedData с установленным алгоритмом шифрования
 * @param sSignedMessage - сообщение к которому необходимо добавить подписанта
 * @returns строку с подписанным сообщением
 */
export declare const createCoSignature: (oCertificate: Certificate, oHashedData: any, sSignedMessage: string) => Promise<string>;
