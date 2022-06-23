import { Certificate } from './certificate';
/**
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export declare const getUserCertificates: (resetCache?: boolean) => Promise<Certificate[]>;
