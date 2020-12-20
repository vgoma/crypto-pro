export interface ExtendedKeysTranslations {
    [key: string]: string | null;
}
/**
 * Возвращает расшифрованные ОИД'ы сертификата
 *
 * @returns словарь расшифрованных ОИД'ов
 */
export declare const getDecodedExtendedKeyUsage: () => Promise<ExtendedKeysTranslations>;
