import { Certificate } from './certificate';
/**
 * Получает список сертификатов, подписавших сообщение
 *
 * @param signedMessage - подпись сообщения
 * @param unencryptedMessage - подписываемое сообщение
 * @returns список сертификатов
 */
export declare const getAttachedSignatureCertificates: (signedMessage: string, unencryptedMessage: string) => Promise<Certificate[]>;
