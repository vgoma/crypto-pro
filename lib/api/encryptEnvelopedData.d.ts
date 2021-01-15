import { Certificate } from './certificate';
/**
 * Создаёт зашифрованное сообщение из base64 строки по списку сертификатов
 * @param oCertificateList - массив объектов Certificate для добавления в список реципиентов сообщения
 * @param dataBase64 - строковые данные в формате base64
 * @returns строку с зашифрованным сообщением
 */
export declare const encryptEnvelopedData: (oCertificateList: Certificate[], dataBase64: string) => Promise<string>;
