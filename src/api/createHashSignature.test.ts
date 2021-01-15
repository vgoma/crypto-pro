import 'cadesplugin';
import { parsedCertificates } from '../__mocks__/certificates';
import { createHashSignature } from './createHashSignature';
import { CadesCertificate, Certificate } from './certificate';

const [parsedCertificateMock] = parsedCertificates;

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
    SignHash: jest.fn(() => executionSteps[5]),
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

describe('createHashSignature', () => {
  test('follows the create hash execution flow', async () => {
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
    const signature = await createHashSignature(cert, oHashedData);

    expect(signature).toEqual('signature');
  });
});
