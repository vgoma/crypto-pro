import { _isSupportedCadesVersion } from './_isSupportedCadesVersion';

describe('_isSupportedCadesVersion', () => {
  test('returns true for supported versions', () => {
    expect(_isSupportedCadesVersion('2.0.12438')).toBe(true);
    expect(_isSupportedCadesVersion('9.9.0')).toBe(true);
  });

  test('returns false for unsupported versions', () => {
    expect(_isSupportedCadesVersion('1.3.6')).toBe(false);
  });
});
