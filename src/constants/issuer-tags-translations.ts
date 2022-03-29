import { TagsTranslations } from './tags-translations';

export const ISSUER_TAGS_TRANSLATIONS: TagsTranslations[] = [
  { possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя' },
  { possibleNames: ['CN'], translation: 'Удостоверяющий центр' },
  { possibleNames: ['C'], translation: 'Страна' },
  { possibleNames: ['S'], translation: 'Регион' },
  { possibleNames: ['STREET'], translation: 'Адрес' },
  { possibleNames: ['O'], translation: 'Компания' },
  { possibleNames: ['OU'], translation: 'Тип' },
  { possibleNames: ['T'], translation: 'Должность' },
  { possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН' },
  { possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП' },
  { possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС' },
  { possibleNames: ['ИНН', 'INN', 'ИНН организации'], translation: 'ИНН' },
  { possibleNames: ['ИНН ЮЛ', 'INNLE'], translation: 'ИНН ЮЛ' },
  { possibleNames: ['E'], translation: 'Email' },
  { possibleNames: ['L'], translation: 'Город' },
];
