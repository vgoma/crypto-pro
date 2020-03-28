import { OIDS_DICTIONARY } from '../constants';
import { TagsTranslations } from '../constants/tags-translations';

export interface TagTranslation {
  description: string;
  title: string;
  isTranslated: boolean;
}

/**
 * Парсит информацию из строки с информацией о сертификате
 *
 * @param tagsTranslations - словарь с расшифровками тэгов
 * @param rawInfo - данные для парсинга
 * @returns расшифрованная информация по отдельным тэгам
 */
export const _parseCertInfo = (tagsTranslations: TagsTranslations[], rawInfo: string): TagTranslation[] => {
  const extractedEntities: string[] = rawInfo.match(/([а-яА-Яa-zA-Z0-9.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);

  if (extractedEntities) {
    return extractedEntities.map((group) => {
      const segmentsMatch = group.match(/^([а-яА-Яa-zA-Z0-9.]+)=(.+?),?$/);
      let title = segmentsMatch?.[1];
      // Вырезаем лишние кавычки
      const description = segmentsMatch?.[2]?.replace(/^"(.*)"/, '$1')?.replace(/"{2}/g, '"');
      const oidIdentifierMatch = title?.match(/^OID\.(.*)/);
      const oidIdentifier = oidIdentifierMatch?.[1];
      let isTranslated = false;

      // Если нашли в тайтле ОИД, пытаемся его расшифровать
      if (oidIdentifier) {
        const oidTranslation = OIDS_DICTIONARY[oidIdentifier];

        if (oidTranslation) {
          title = oidTranslation;
          isTranslated = true;
        }
      }

      const tagTranslation = tagsTranslations.find((tag) => tag.possibleNames.find((name) => name === title))
        ?.translation;

      if (tagTranslation) {
        title = tagTranslation;
        isTranslated = true;
      }

      return { description, title, isTranslated };
    });
  }
};
