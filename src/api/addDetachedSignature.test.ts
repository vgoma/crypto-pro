import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { createDetachedSignature } from './createDetachedSignature';
import { _getCadesCert } from '../helpers/_getCadesCert';
import { addDetachedSignature } from './addDetachedSignature';

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
    VerifyCades: jest.fn(),
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
    SetHashValue: jest.fn(),
  },
  [executionSteps[6]]: 'newSignature',
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
    const signature = await createDetachedSignature(parsedCertificateMock.thumbprint, 'message');
    await addDetachedSignature(parsedCertificateMock.thumbprint, signature);

    expect(_getCadesCert).toHaveBeenCalledWith(parsedCertificateMock.thumbprint);
  });

  test('returns new signature', async () => {
    let signature = await createDetachedSignature(parsedCertificateMock.thumbprint, 'message');
    signature = await addDetachedSignature(parsedCertificateMock.thumbprint, signature);

    expect(signature).toEqual('newSignature');
  });
});
