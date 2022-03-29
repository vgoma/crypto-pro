import { Certificate } from './certificate';
/**
 * Возвращает все сертификаты без фильтрации по дате и наличию приватного ключа
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export declare const getAllUserCertificates: (resetCache?: boolean) => Promise<Certificate[]>;
