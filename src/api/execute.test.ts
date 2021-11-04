import 'cadesplugin';
import { execute } from './execute';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

jest.mock('../helpers/_extractMeaningfulErrorMessage', () => ({ _extractMeaningfulErrorMessage: jest.fn() }));
jest.mock('../helpers/_generateCadesFn', () => ({
  __cadesAsyncToken__: jest.fn(),
  __createCadesPluginObject__: jest.fn(),
  _generateCadesFn: jest.fn(),
}));

beforeEach(() => {
  (_extractMeaningfulErrorMessage as jest.Mock).mockClear();
  (__cadesAsyncToken__ as jest.Mock).mockClear();
  (__createCadesPluginObject__ as jest.Mock).mockClear();
  (_generateCadesFn as jest.Mock).mockClear();
});

describe('execute', () => {
  test('calls custom implementation with exposed API', async () => {
    const customCallback = jest.fn();

    await execute(customCallback);

    expect(customCallback).toHaveBeenCalledTimes(1);
    expect(customCallback).toHaveBeenCalledWith({
      cadesplugin: window.cadesplugin,
      _generateCadesFn,
      __cadesAsyncToken__,
      __createCadesPluginObject__,
      _extractMeaningfulErrorMessage,
    });
  });
});
