import 'cadesplugin';
import { parsedCertificates } from '../__mocks__/certificates';
import { CadesCertificate, Certificate } from './certificate';
import { encryptEnvelopedData } from './encryptEnvelopedData';

const [parsedCertificateMock] = parsedCertificates;

const executionSteps = [Symbol('step 0'), Symbol('step 1')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_ContentEncoding: jest.fn(),
    propset_Content: jest.fn(),
    Recipients: executionSteps[1],
    Encrypt: jest.fn(() => executionSteps[2]),
  },
  [executionSteps[1]]: {
    Add: jest.fn(),
  },
  [executionSteps[2]]: 'signature',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => {
  return executionSteps[0];
});

describe('encryptEnvelopedData', () => {
  test('checks encrypt enveloped data workflow', async () => {
    const cert = new Certificate(
      parsedCertificateMock as CadesCertificate,
      parsedCertificateMock.name,
      parsedCertificateMock.issuerName,
      parsedCertificateMock.subjectName,
      parsedCertificateMock.thumbprint,
      parsedCertificateMock.validFrom,
      parsedCertificateMock.validTo,
    );

    const result = await encryptEnvelopedData([cert], btoa('message'));
    expect(result).toEqual('signature');
  });
});
