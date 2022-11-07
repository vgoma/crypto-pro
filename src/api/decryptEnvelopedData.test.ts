import 'cadesplugin';
import { decryptEnvelopedData } from './decryptEnvelopedData';
import { _getCadesCert } from '../helpers/_getCadesCert';

const executionSteps = [Symbol('step 0')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_ContentEncoding: jest.fn(),
    Decrypt: jest.fn(),
    Content: 'decrypted',
  },
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => {
  return executionSteps[0];
});

describe('decryptEnvelopedData', () => {
  test('returns unencrypted enveloped data', async () => {
    const signature = await decryptEnvelopedData('EncryptedMessage');

    expect(signature).toEqual('decrypted');
  });
});
