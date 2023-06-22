import 'cadesplugin';
import { createHash } from './createHash';

const executionSteps = [Symbol('step 0'), Symbol('step 1')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_Algorithm: jest.fn(),
    propset_DataEncoding: jest.fn(),
    Hash: jest.fn(),
    Value: executionSteps[1],
  },
  [executionSteps[1]]: 'hash',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation((object) => {
  switch (object) {
    case 'CAdESCOM.HashedData':
      return executionSteps[0];
  }
});

describe('createHash', () => {
  test('uses Buffer to encrypt the message', async () => {
    const originalBufferFrom = global.Buffer.from;

    (global.Buffer.from as jest.Mock) = jest.fn(() => ({
      toString: jest.fn(),
    }));

    await createHash('message');

    expect(global.Buffer.from).toHaveBeenCalledTimes(1);

    global.Buffer.from = originalBufferFrom;
  });

  test('returns created hash', async () => {
    const hash = await createHash('message');

    expect(hash).toEqual('hash');
  });

  test('returns created hash with specified encoding', async () => {
    const hash = await createHash('message', { encoding: 'binary' });

    expect(hash).toEqual('hash');
  });
});
