/**
 * Расшифровывает сообщение полученное вызовом метода encryptEnvelopedData
 *
 * @param sSignedData - строка с зашифрованным сообщением
 * @returns строку исходного сообщения
 */
export declare const decryptEvelopedData: (sSignedData: string) => Promise<string>;
