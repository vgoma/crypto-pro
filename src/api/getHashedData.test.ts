import 'cadesplugin';
import { getHashedData } from './getHashedData';
import { CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 } from '../constants';

const expected = '3F539A213E97C802CC229D474C6AA32A825A360B2A933A949FD925208D9CE1BB';

const executionSteps = [Symbol('step 0')];

const executionFlow: any = {
  [executionSteps[0]]: {
    propset_Algorithm: jest.fn(),
    propset_DataEncoding: jest.fn(),
    Hash: jest.fn(),
    Value: expected,
  },
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => executionSteps[0]);

describe('getHashedData', () => {
  test('returns hashed data object', async () => {
    const oHashedData = await getHashedData(CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
    await oHashedData.Hash(btoa('test_data'));
    const value = oHashedData.Value;

    expect(value).toEqual(expected);
  });
});
