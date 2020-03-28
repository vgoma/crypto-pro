import 'cadesplugin';
import { _extractMeaningfulErrorMessage } from './_extractMeaningfulErrorMessage';

describe('_extractMeaningfulErrorMessage', () => {
  test("returns meaningful message provided by vendor if it's possible", () => {
    expect(
      _extractMeaningfulErrorMessage(new Error('Какое-то более-менее подробное сообщение об ошибке. (0x8010006E)')),
    ).toBe('Какое-то более-менее подробное сообщение об ошибке');
    expect(
      _extractMeaningfulErrorMessage(new Error('Какое-то более-менее подробное сообщение об ошибке. (0x801')),
    ).toBe('Какое-то более-менее подробное сообщение об ошибке');
    expect(_extractMeaningfulErrorMessage(new Error('Какое-то более-менее подробное сообщение об ошибке.(0x801'))).toBe(
      'Какое-то более-менее подробное сообщение об ошибке',
    );
    expect(_extractMeaningfulErrorMessage(new Error('Какое-то более-менее подробное сообщение об ошибке(0x801'))).toBe(
      'Какое-то более-менее подробное сообщение об ошибке',
    );
    expect(_extractMeaningfulErrorMessage(new Error('Какое-то более-менее подробное сообщение об ошибке.'))).toBe(
      'Какое-то более-менее подробное сообщение об ошибке',
    );
    expect(_extractMeaningfulErrorMessage(new Error('Какое-то более-менее подробное сообщение об ошибке'))).toBe(
      'Какое-то более-менее подробное сообщение об ошибке',
    );
    expect(_extractMeaningfulErrorMessage(new Error('Какое-то более-менее. Подробное сообщение об ошибке'))).toBe(
      'Какое-то более-менее. Подробное сообщение об ошибке',
    );
    expect(_extractMeaningfulErrorMessage(new Error('Какое-то более-менее. Подробное сообщение об ошибке.'))).toBe(
      'Какое-то более-менее. Подробное сообщение об ошибке',
    );
    expect(_extractMeaningfulErrorMessage(new Error('Какая-то error случилась, по причине 666 (0x801'))).toBe(
      'Какая-то error случилась, по причине 666',
    );
    expect(_extractMeaningfulErrorMessage(new Error('Не удалось. 0x8010006E'))).toBe('Не удалось');
  });

  test("returns null if can't extract meaningful error message", () => {
    expect(_extractMeaningfulErrorMessage(new Error('Unknown error code (0x800705BA) (0x800705BA)'))).toBeNull();
    expect(_extractMeaningfulErrorMessage(new Error('Error. (0x8010006E)'))).toBeNull();
    expect(
      _extractMeaningfulErrorMessage(new Error('Some very long, but purely technical message. (0x8010006E)')),
    ).toBeNull();
    expect(_extractMeaningfulErrorMessage(new Error('OOPS. (0x8010006E)'))).toBeNull();
  });
});
