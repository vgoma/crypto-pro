/**
 * Проверяет наличие ОИД'а (ОИД'ов) у сертификата
 *
 * @param oids - ОИД'ы для проверки
 * @returns флаг наличия ОИД'ов у сертификата
 */
export declare const hasExtendedKeyUsage: (oids: string | string[]) => Promise<boolean>;
