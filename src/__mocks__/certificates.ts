export const rawCertificates = [
  {
    IssuerName: [
      'CN="ООО ""Сампо-Сервис"""',
      'O="Общество с ограниченной ответственностью ""Сампо-Сервис"""',
      'OU=Удостоверяющий центр',
      'STREET="ул. Большая Разночинная, д. 14, лит. А"',
      'L=Санкт-Петербург',
      'S=78 Санкт-Петербург',
      'C=RU',
      'INN=007813317783',
      'OGRN=1057810150892',
      'E=uc@sampokey.ru',
    ].join(', '),
    SubjectName: [
      'CN=Иванов Иван Иванович',
      'SN=Иванов',
      'G=Иван Иванович',
      'C=RU',
      'S=78 Санкт-Петербург',
      'L=г. Санкт-Петербург',
      'STREET="ул. Строителей, д. 25, кв. 12"',
      'SNILS=41013691319',
      'INN=943018791378',
      'E=email@example.com',
    ].join(', '),
    Thumbprint: '1C6838E1316C5F0C6A126D58D081D2435A3CFC7B',
    ValidFromDate: '2019-12-06T11:58:21.000Z',
    ValidToDate: '2020-12-06T12:08:21.000Z',
  },
];

export const parsedCertificates = [
  {
    name: 'Иванов Иван Иванович',
    issuerName: rawCertificates[0].IssuerName,
    subjectName: rawCertificates[0].SubjectName,
    thumbprint: rawCertificates[0].Thumbprint,
    validFrom: rawCertificates[0].ValidFromDate,
    validTo: rawCertificates[0].ValidToDate,
  },
];
