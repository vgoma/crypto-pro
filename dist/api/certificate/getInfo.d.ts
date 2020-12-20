import { TagsTranslations } from '../../constants/tags-translations';
import { TagTranslation } from '../../helpers/_parseCertInfo';
/**
 * Возвращает расшифрованную информацию о сертификате из указанного свойства по тэгам
 *
 * @param tags = словарь
 * @param entitiesPath = путь к разбираемой сущности
 * @returns расшифрованная информация по отдельным тэгам
 */
export declare const getInfo: (tags: TagsTranslations[], entitiesPath: string) => Promise<TagTranslation[]>;
