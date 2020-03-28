import { _isSupportedCSPVersion } from './_isSupportedCSPVersion';

describe('_isSupportedCSPVersion', () => {
  test('returns true for supported versions', () => {
    expect(_isSupportedCSPVersion('4.0')).toBe(true);
    expect(_isSupportedCSPVersion('4.9')).toBe(true);
    expect(_isSupportedCSPVersion('5.0')).toBe(true);
    expect(_isSupportedCSPVersion('9.9')).toBe(true);
  });

  test('returns false for unsupported versions', () => {
    expect(_isSupportedCSPVersion('0.0')).toBe(false);
    expect(_isSupportedCSPVersion('3.9')).toBe(false);
  });
});
