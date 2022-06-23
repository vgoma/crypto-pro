import { Certificate } from './certificate';
/**
 * Начиная с версии плагина 2.0.13292 есть возможность получить сертификаты из закрытых ключей
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export declare const getContainerCertificates: (resetCache?: boolean) => Promise<Certificate[]>;
