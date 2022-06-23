import { Certificate } from './certificate';
/**
 * Возвращает сертификат по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @param validOnly - проверять сертификаты по дате и наличию приватного ключа
 * @returns сертификат
 */
export declare const getCertificate: (thumbprint: string, validOnly?: boolean) => Promise<Certificate>;
