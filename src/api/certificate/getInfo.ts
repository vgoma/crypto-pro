import { TagsTranslations } from '../../constants/tags-translations';
import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../../helpers/_extractMeaningfulErrorMessage';
import { _parseCertInfo, TagTranslation } from '../../helpers/_parseCertInfo';
import { getCadesProp } from './getCadesProp';

/**
 * Возвращает расшифрованную информацию о сертификате из указанного свойства по тэгам
 *
 * @param tags = словарь
 * @param entitiesPath = путь к разбираемой сущности
 * @returns расшифрованная информация по отдельным тэгам
 */
export const getInfo = _afterPluginsLoaded(async function (
  tags: TagsTranslations[],
  entitiesPath: string,
): Promise<TagTranslation[]> {
  let entities: string;

  try {
    entities = await getCadesProp.call(this, entitiesPath);
  } catch (error) {
    console.error(error);

    throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при извлечении информации из сертификата');
  }

  return _parseCertInfo(tags, entities);
});
