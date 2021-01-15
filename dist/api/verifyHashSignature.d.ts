/**
 * Валидация подписи хэшированного сообщения
 *
 * @param oHashedData - объект oHashedData с установленным значением Value и Algorithm
 * @param sSignedMessage - подписанное сообщение для валидации
 * @returns true или ошибку
 */
export declare const verifyHashSignature: (oHashedData: any, sSignedMessage: string) => Promise<boolean>;
