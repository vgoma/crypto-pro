/**
 * Возвращает сертификат в формате Cades по отпечатку из хранилища закрытого ключа
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат в формате Cades
 */
export declare const _getCadesContainerCert: (thumbprint: string) => Promise<any>;
