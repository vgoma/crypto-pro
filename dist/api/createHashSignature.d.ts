import { Certificate } from './certificate';
/**
 * Создаёт подпись для хешированного сообщения
 *
 * @param oCertificate - объект класса Certificate для подписания сообщения
 * @param oHashedData - объект класса oHashedData содержащий в себе захэшированное сообщение
 * @returns строку с подписанным хэшем
 */
export declare const createHashSignature: (oCertificate: Certificate, oHashedData: any) => Promise<string>;
