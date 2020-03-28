import { _extractCommonName } from './_extractCommonName';

describe('_extractCommonName', () => {
  test('extracts common name from the start of provided string', () => {
    const string = 'CN=Иванов Иван Иванович, SNILS=11617693460';

    expect(_extractCommonName(string)).toBe('Иванов Иван Иванович');
  });

  test('extracts common name from the middle of provided string', () => {
    const string = 'STREET="Строителей, д.3, лит.Б", CN=Иванов Иван Иванович, SNILS=11617693460';

    expect(_extractCommonName(string)).toBe('Иванов Иван Иванович');
  });

  test('extracts common name from the end of provided string', () => {
    const string = 'SNILS=11617693460, CN=Иванов Иван Иванович';

    expect(_extractCommonName(string)).toBe('Иванов Иван Иванович');
  });

  test('extracts common name from provided string with the quotes', () => {
    const string = ['O="Общество с ограниченной ответственностью ""Сампо-Сервис"""', 'CN="ООО ""Сампо-Сервис"""'].join(
      ', ',
    );

    expect(_extractCommonName(string)).toBe('"ООО ""Сампо-Сервис"""');
  });
});
