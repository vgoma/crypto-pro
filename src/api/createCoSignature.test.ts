import 'cadesplugin';
import { parsedCertificates } from '../__mocks__/certificates';
import { createCoSignature } from './createCoSignature';
import { Certificate, CadesCertificate } from './certificate';

const [parsedCertificateMock] = parsedCertificates;

const executionSteps = [Symbol('step 0'), Symbol('step 1'), Symbol('step 2'), Symbol('step 3'), Symbol('step 4')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_Name: jest.fn(),
    propset_Value: jest.fn(),
  },
  [executionSteps[1]]: {
    propset_ContentEncoding: jest.fn(),
    VerifyHash: jest.fn(),
    CoSignHash: jest.fn(() => executionSteps[5]),
  },
  [executionSteps[2]]: {
    propset_Certificate: jest.fn(),
    AuthenticatedAttributes2: executionSteps[3],
    propset_Options: jest.fn(),
  },
  [executionSteps[3]]: {
    Add: jest.fn(),
  },
  [executionSteps[4]]: {
    propset_Algorithm: jest.fn(),
    propset_DataEncoding: jest.fn(),
    SetHashValue: jest.fn(),
  },
  [executionSteps[5]]: 'signature',
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
      return executionSteps[4];
  }
});

describe('createCoSignature', () => {
  test('follows the create co signature execution flow', async () => {
    const cert = new Certificate(
      parsedCertificateMock as CadesCertificate,
      parsedCertificateMock.name,
      parsedCertificateMock.issuerName,
      parsedCertificateMock.subjectName,
      parsedCertificateMock.thumbprint,
      parsedCertificateMock.validFrom,
      parsedCertificateMock.validTo,
      parsedCertificateMock.hasPrivateKey,
    );
    const oHashedData = {};
    const data = btoa('b285056dbf18d7392d7677369524dd14747459ed8143997e163b2986f92fd42c');

    const signature = await createCoSignature(cert, oHashedData, data);
    expect(signature).toEqual('signature');
  });
});
