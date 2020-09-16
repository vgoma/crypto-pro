import 'cadesplugin';
import { decryptEvelopedData } from './decryptEnvelopedData';

const executionSteps = [Symbol('step 0'), Symbol('step 1')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_ContentEncoding: jest.fn(),
    Decrypt: jest.fn(),
    Content: executionSteps[1],
  },
  [executionSteps[1]]: 'message',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => {
  return executionSteps[0];
});

describe('decryptEnvelopedData', () => {
  test('follow the decrypt enveloped data workflow', async () => {
    const result = await decryptEvelopedData('signature');
    expect(result).toEqual('message');
  });
});
