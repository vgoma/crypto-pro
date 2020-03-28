import { ISSUER_TAGS_TRANSLATIONS, SUBJECT_TAGS_TRANSLATIONS } from '../constants';
import { _parseCertInfo } from './_parseCertInfo';

describe('_parseCertInfo', () => {
  test('parses info about subject', () => {
    const subjectInfo = [
      'T=Генеральный директор',
      'UnstructuredName="INN=7811514258/KPP=781101002/OGRN=1127847087885"',
      'STREET="Строителей, д.3, лит.Б"',
      'CN=Иванов Иван Иванович',
      'G=Иван Иванович',
      'SN=Иванов',
      'OU=Администрация',
      'O="ООО ""Рога и Копыта"""',
      'L=Санкт-Петербург',
      'S=78 г. Санкт-Петербург',
      'C=RU',
      'OID.1.2.643.6.3.1.4.1=Петров',
      'UNKNOWN=неизвестный тэг',
      'E=email@example.ru',
      'INN=007811514257',
      'OGRN=1127847087885',
      'SNILS=11617693460',
    ].join(', ');

    expect(_parseCertInfo(SUBJECT_TAGS_TRANSLATIONS, subjectInfo)).toStrictEqual([
      {
        description: 'Генеральный директор',
        title: 'Должность',
        isTranslated: true,
      },
      {
        description: 'INN=7811514258/KPP=781101002/OGRN=1127847087885',
        title: 'Неструктурированное имя',
        isTranslated: true,
      },
      {
        description: 'Строителей, д.3, лит.Б',
        title: 'Адрес',
        isTranslated: true,
      },
      {
        description: 'Иванов Иван Иванович',
        title: 'Владелец',
        isTranslated: true,
      },
      {
        description: 'Иван Иванович',
        title: 'Имя Отчество',
        isTranslated: true,
      },
      {
        description: 'Иванов',
        title: 'Фамилия',
        isTranslated: true,
      },
      {
        description: 'Администрация',
        title: 'Отдел/подразделение',
        isTranslated: true,
      },
      {
        description: 'ООО "Рога и Копыта"',
        title: 'Компания',
        isTranslated: true,
      },
      {
        description: 'Санкт-Петербург',
        title: 'Город',
        isTranslated: true,
      },
      {
        description: '78 г. Санкт-Петербург',
        title: 'Регион',
        isTranslated: true,
      },
      {
        description: 'RU',
        title: 'Страна',
        isTranslated: true,
      },
      {
        description: 'Петров',
        title: 'Администратор организации',
        isTranslated: true,
      },
      {
        description: 'неизвестный тэг',
        title: 'UNKNOWN',
        isTranslated: false,
      },
      {
        description: 'email@example.ru',
        title: 'Email',
        isTranslated: true,
      },
      {
        description: '007811514257',
        title: 'ИНН',
        isTranslated: true,
      },
      {
        description: '1127847087885',
        title: 'ОГРН',
        isTranslated: true,
      },
      {
        description: '11617693460',
        title: 'СНИЛС',
        isTranslated: true,
      },
    ]);
  });

  test('parses info about issuer', () => {
    const issuerInfo = [
      'CN="ООО ""Сампо-Сервис"""',
      'SN="Фамилия издателя, серьезно?"',
      'O="Общество с ограниченной ответственностью ""Сампо-Сервис"""',
      'OU=Удостоверяющий центр',
      'STREET="ул. Большая Разночинная, д. 14, лит. А"',
      'L=Санкт-Петербург',
      'S=78 Санкт-Петербург',
      'C=RU',
      'INN=007813317783',
      'OGRN=1057810150892',
      'E=uc@sampokey.ru',
    ].join(', ');

    expect(_parseCertInfo(ISSUER_TAGS_TRANSLATIONS, issuerInfo)).toStrictEqual([
      {
        description: 'ООО "Сампо-Сервис"',
        title: 'Удостоверяющий центр',
        isTranslated: true,
      },
      {
        description: 'Фамилия издателя, серьезно?',
        title: 'SN',
        isTranslated: false,
      },
      {
        description: 'Общество с ограниченной ответственностью "Сампо-Сервис"',
        title: 'Компания',
        isTranslated: true,
      },
      {
        description: 'Удостоверяющий центр',
        title: 'Тип',
        isTranslated: true,
      },
      {
        description: 'ул. Большая Разночинная, д. 14, лит. А',
        title: 'Адрес',
        isTranslated: true,
      },
      {
        description: 'Санкт-Петербург',
        title: 'Город',
        isTranslated: true,
      },
      {
        description: '78 Санкт-Петербург',
        title: 'Регион',
        isTranslated: true,
      },
      {
        description: 'RU',
        title: 'Страна',
        isTranslated: true,
      },
      {
        description: '007813317783',
        title: 'ИНН',
        isTranslated: true,
      },
      {
        description: '1057810150892',
        title: 'ОГРН',
        isTranslated: true,
      },
      {
        description: 'uc@sampokey.ru',
        title: 'Email',
        isTranslated: true,
      },
    ]);
  });
});
