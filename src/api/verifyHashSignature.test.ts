import 'cadesplugin';
import { verifyHashSignature } from './verifyHashSignature';

const executionSteps = [
  Symbol('step 0'),
  Symbol('step 1'),
  Symbol('step 2'),
  Symbol('step 3'),
  Symbol('step 4'),
];

const executionFlow = {
  [executionSteps[0]]: {
    propset_ContentEncoding: jest.fn(),
    VerifyHash: jest.fn(() => executionSteps[2]),
  },
  [executionSteps[1]]: {
    propset_Algorithm: jest.fn(),
    propset_DataEncoding: jest.fn(),
    SetHashValue: jest.fn(),
  },
  [executionSteps[2]]: true,
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation((object) => {
  switch (object) {
    case 'CAdESCOM.CadesSignedData':
      return executionSteps[0];
    case 'CAdESCOM.HashedData':
      return executionSteps[1];
  }
});

describe('verifyHashSignature', () => {
  test('runs a hash verification flow', async () => {
    const oHashedData = {};
    const sSignedMessage = 'some_message';
    const valid = verifyHashSignature(oHashedData, sSignedMessage);

    expect(valid).toBeTruthy();
  });
});
