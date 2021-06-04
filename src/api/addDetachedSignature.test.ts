import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { createDetachedSignature } from './createDetachedSignature';
import { _getCadesCert } from '../helpers/_getCadesCert';
import { addDetachedSignature } from './addDetachedSignature';
import { createHash } from './createHash';

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
  Symbol('step 6'),
  Symbol('step 7'),
];

const executionFlow = {
  [executionSteps[0]]: {
    propset_Name: jest.fn(),
    propset_Value: jest.fn(),
  },
  [executionSteps[1]]: {
    propset_ContentEncoding: jest.fn(),
    propset_Content: jest.fn(),
    SignHash: jest.fn(() => executionSteps[4]),
    VerifyHash: jest.fn(),
    CoSignHash: jest.fn(() => executionSteps[6]),
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
  [executionSteps[5]]: {
    propset_Algorithm: jest.fn(),
    propset_DataEncoding: jest.fn(),
    Hash: jest.fn(),
    Value: executionSteps[7],
    SetHashValue: jest.fn(),
  },
  [executionSteps[6]]: 'newSignature',
  [executionSteps[7]]: 'hash',
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
    case 'CAdESCOM.HashedData':
      return executionSteps[5];
  }
});

describe('addDetachedSignature', () => {
  test('uses specified certificate', async () => {
    const originalBufferFrom = global.Buffer.from;

    (global.Buffer.from as jest.Mock) = jest.fn(() => ({
      toString: jest.fn(),
    }));

    const signature = await createDetachedSignature(parsedCertificateMock.thumbprint, 'message');
    const signatureHash = await createHash(signature);
    await addDetachedSignature(parsedCertificateMock.thumbprint, signature, signatureHash);

    expect(_getCadesCert).toHaveBeenCalledWith(parsedCertificateMock.thumbprint);

    expect(global.Buffer.from).toHaveBeenCalledTimes(1);

    global.Buffer.from = originalBufferFrom;
  });

  test('returns new signature', async () => {
    const originalBufferFrom = global.Buffer.from;

    (global.Buffer.from as jest.Mock) = jest.fn(() => ({
      toString: jest.fn(),
    }));

    let signature = await createDetachedSignature(parsedCertificateMock.thumbprint, 'message');
    const signatureHash = await createHash(signature);
    signature = await addDetachedSignature(parsedCertificateMock.thumbprint, signature, signatureHash);

    expect(_getCadesCert).toHaveBeenCalledWith(parsedCertificateMock.thumbprint);

    expect(global.Buffer.from).toHaveBeenCalledTimes(1);

    expect(signature).toEqual('newSignature');

    global.Buffer.from = originalBufferFrom;
  });
});
