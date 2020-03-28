/**
 * Возвращает объект даты, совместимый с Cades plugin'ом, зависящий от браузера.
 *
 * В IE необходимо использовать специфичный формат "VT_DATE"
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Microsoft_Extensions/Date.getVarDate
 */
export const _getDateObj = (dateObj): Date => (dateObj.getVarDate ? dateObj.getVarDate() : dateObj);
