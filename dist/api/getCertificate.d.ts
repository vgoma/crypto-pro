import { Certificate } from './certificate';
/**
 * Возвращает сертификат по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат
 */
export declare const getCertificate: (thumbprint: string) => Promise<Certificate>;
