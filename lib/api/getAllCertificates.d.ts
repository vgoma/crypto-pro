import { Certificate } from './certificate';
/**
 * Возвращает список сертификатов, доступных пользователю из пользовательского хранилища и закрытых ключей, не установленных в системе, без фильтрации по дате и наличию приватного ключа
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export declare const getAllCertificates: (resetCache?: boolean) => Promise<Certificate[]>;
