import { Certificate } from './certificate';
/**
 * Возвращает список сертификатов, доступных пользователю из пользовательского хранилища и закрытых ключей, не установленных в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export declare const getCertificates: (resetCache?: boolean) => Promise<Certificate[]>;
