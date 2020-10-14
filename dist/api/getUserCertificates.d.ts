import { Certificate } from './certificate';
/**
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @param skipCheck = false - позволяет пропустить проверку наличия закрытых ключей
 * @returns список сертификатов
 */
export declare const getUserCertificates: (resetCache?: boolean, skipCheck?: boolean) => Promise<Certificate[]>;
