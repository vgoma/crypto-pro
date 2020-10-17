import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { createAttachedSignature } from './createAttachedSignature';
import { _getCadesCert } from '../helpers/_getCadesCert';

const [rawCertificateMock] = rawCertificates;
const [parsedCertificateMock] = parsedCertificates;

jest.mock('../helpers/_getCadesCert', () => ({ _getCadesCert: jest.fn(() => rawCertificateMock) }));

beforeEach(() => {
  (_getCadesCert as jest.Mock).mockClear();
});

const executionSteps = [Symbol('step 0'), Symbol('step 1'), Symbol('step 2'), Symbol('step 3'), Symbol('step 4')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_Name: jest.fn(),
    propset_Value: jest.fn(),
  },
  [executionSteps[1]]: {
    propset_ContentEncoding: jest.fn(),
    propset_Content: jest.fn(),
    SignCades: jest.fn(() => executionSteps[4]),
  },
  [executionSteps[2]]: {
    propset_Certificate: jest.fn(),
    AuthenticatedAttributes2: executionSteps[3],
    propset_Options: jest.fn(),
  },
  [executionSteps[3]]: {
    Add: jest.fn(),
  },
  [executionSteps[4]]: 'signature',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation((object) => {
  switch (object) {
    case 'CADESCOM.CPAttribute':
      return executionSteps[0];
    case 'CAdESCOM.CadesSignedData':
      return executionSteps[1];
    case 'CAdESCOM.CPSigner':
      return executionSteps[2];
  }
});

describe('createAttachedSignature', () => {
  test('uses Buffer to encrypt the message', async () => {
    const originalBufferFrom = (window as any).Buffer.from;

    (window as any).Buffer.from = jest.fn(() => ({
      toString: jest.fn(),
    }));

    await createAttachedSignature(parsedCertificateMock.thumbprint, 'message');

    expect((window as any).Buffer.from).toHaveBeenCalledTimes(1);

    (window as any).Buffer.from = originalBufferFrom;
  });

  test('uses specified certificate', async () => {
    await createAttachedSignature(parsedCertificateMock.thumbprint, 'message');

    expect(_getCadesCert).toHaveBeenCalledWith(parsedCertificateMock.thumbprint);
  });

  test('returns signature', async () => {
    const signature = await createAttachedSignature(parsedCertificateMock.thumbprint, 'message');

    expect(signature).toEqual('signature');
  });
});
