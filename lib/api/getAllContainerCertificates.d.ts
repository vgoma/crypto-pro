import { Certificate } from './certificate';
/**
 * Начиная с версии плагина 2.0.13292 есть возможность получить сертификаты из закрытых ключей
 * Возвращает все сертификаты без фильтрации по дате и наличию приватного ключа
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export declare const getAllContainerCertificates: (resetCache?: boolean) => Promise<Certificate[]>;
