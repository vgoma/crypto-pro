import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { createAttachedSignature } from './createAttachedSignature';
import { _getCadesCert } from '../helpers/_getCadesCert';
import { addAttachedSignature } from './addAttachedSignature';

const [rawCertificateMock] = rawCertificates;
const [parsedCertificateMock] = parsedCertificates;

jest.mock('../helpers/_getCadesCert', () => ({ _getCadesCert: jest.fn(() => rawCertificateMock) }));

beforeEach(() => {
  (_getCadesCert as jest.Mock).mockClear();
});

const executionSteps = [
  Symbol('step 0'),
  Symbol('step 1'),
  Symbol('step 2'),
  Symbol('step 3'),
  Symbol('step 4'),
  Symbol('step 5'),
];

const executionFlow = {
  [executionSteps[0]]: {
    propset_Name: jest.fn(),
    propset_Value: jest.fn(),
  },
  [executionSteps[1]]: {
    propset_ContentEncoding: jest.fn(),
    propset_Content: jest.fn(),
    SignCades: jest.fn(() => executionSteps[4]),
    CoSignCades: jest.fn(() => executionSteps[5]),
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
  [executionSteps[5]]: 'newSignature',
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

describe('addAttachedSignature', () => {
  test('uses Buffer to encrypt the message', async () => {
    const originalBufferFrom = global.Buffer.from;

    (global.Buffer.from as jest.Mock) = jest.fn(() => ({
      toString: jest.fn(),
    }));

    await createAttachedSignature(parsedCertificateMock.thumbprint, 'message');
    await addAttachedSignature(parsedCertificateMock.thumbprint, 'message');

    expect(global.Buffer.from).toHaveBeenCalledTimes(2);

    global.Buffer.from = originalBufferFrom;
  });

  test('uses specified certificate', async () => {
    await addAttachedSignature(parsedCertificateMock.thumbprint, 'message');

    expect(_getCadesCert).toHaveBeenCalledWith(parsedCertificateMock.thumbprint);
  });

  test('returns new signature', async () => {
    await createAttachedSignature(parsedCertificateMock.thumbprint, 'message');
    const signature = await addAttachedSignature(parsedCertificateMock.thumbprint, 'message');

    expect(signature).toEqual('newSignature');
  });
});
