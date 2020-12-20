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
export declare const _parseCertInfo: (tagsTranslations: TagsTranslations[], rawInfo: string) => TagTranslation[];
