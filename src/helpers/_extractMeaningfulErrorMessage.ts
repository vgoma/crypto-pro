export const _extractMeaningfulErrorMessage = (error: Error): string | null => {
  let errorContainer = window.cadesplugin?.getLastError && window.cadesplugin.getLastError(error);

  if (!errorContainer?.message) {
    if (!error.message) {
      return null;
    }

    errorContainer = error;
  }

  const containsRussianLetters = /[а-яА-Я]/.test(errorContainer.message);

  if (!containsRussianLetters) {
    return null;
  }

  const searchResult = errorContainer.message.match(/^(.*?)(?:(?:\.?\s?\(?0x)|(?:\.?$))/);

  return searchResult ? searchResult[1] : null;
};
