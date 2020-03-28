import 'cadesplugin';
import 'console-error';
import { isValidSystemSetup } from './isValidSystemSetup';
import { getSystemInfo } from './getSystemInfo';
import { _isSupportedCadesVersion } from '../helpers/_isSupportedCadesVersion';
import { _isSupportedCSPVersion } from '../helpers/_isSupportedCSPVersion';

jest.mock('./getSystemInfo', () => ({ getSystemInfo: jest.fn() }));
jest.mock('../helpers/_isSupportedCadesVersion', () => ({ _isSupportedCadesVersion: jest.fn() }));
jest.mock('../helpers/_isSupportedCSPVersion', () => ({ _isSupportedCSPVersion: jest.fn() }));

beforeEach(() => {
  (getSystemInfo as jest.Mock).mockClear();
  (_isSupportedCadesVersion as jest.Mock).mockClear();
  (_isSupportedCSPVersion as jest.Mock).mockClear();
});

describe('isValidSystemSetup', () => {
  (getSystemInfo as jest.Mock).mockImplementation(() => ({
    cadesVersion: '2.0.13771',
    cspVersion: '4.0.9971',
  }));
  (_isSupportedCadesVersion as jest.Mock).mockImplementation(() => true);
  (_isSupportedCSPVersion as jest.Mock).mockImplementation(() => true);

  describe('positive scenario', () => {
    test("calls getSystemInfo to verify that it's possible", async () => {
      await isValidSystemSetup();

      expect(getSystemInfo).toHaveBeenCalledTimes(1);
    });

    test('checks for validity using separate external helpers', async () => {
      await isValidSystemSetup();

      expect(_isSupportedCadesVersion).toHaveBeenCalledTimes(1);
      expect(_isSupportedCSPVersion).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative scenario', () => {
    test('throws error from getSystemInfo', async () => {
      const errorMessage = 'Какая-то синтаксическая ошибка';
      const vendorErrorMessage = 'Произошла ошибка из-за какой-то проблемы';

      (getSystemInfo as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      (window.cadesplugin.getLastError as jest.Mock).mockImplementationOnce(() => new Error(vendorErrorMessage));

      await expect(isValidSystemSetup()).rejects.toThrowError(vendorErrorMessage);
    });

    test('throws error if cades version is unsupported', async () => {
      (_isSupportedCadesVersion as jest.Mock).mockImplementationOnce(() => false);

      await expect(isValidSystemSetup()).rejects.toThrowError('Не поддерживаемая версия плагина');
    });

    test('throws error if CSP version is unsupported', async () => {
      (_isSupportedCSPVersion as jest.Mock).mockImplementationOnce(() => false);

      await expect(isValidSystemSetup()).rejects.toThrowError('Не поддерживаемая версия CSP');
    });
  });
});
