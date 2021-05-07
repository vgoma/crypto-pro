import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { getAllUserCertificates } from './getAllUserCertificates';

const [rawCertificateMock] = rawCertificates;
const [parsedCertificateMock] = parsedCertificates;

const executionSteps = [
  Symbol('step 0'),
  Symbol('step 1'),
  Symbol('step 2'),
  Symbol('step 3'),
  Symbol('step 4'),
  Symbol('step 5'),
  Symbol('step 6'),
  Symbol('step 7'),
  Symbol('step 8'),
];

const executionFlow = {
  [executionSteps[0]]: {
    Certificates: executionSteps[1],
    Close: jest.fn(),
    Open: jest.fn(),
  },
  [executionSteps[1]]: {
    Count: executionSteps[2],
    Item: jest.fn(() => executionSteps[3]),
  },
  [executionSteps[2]]: 1,
  [executionSteps[3]]: {
    IssuerName: executionSteps[6],
    SubjectName: executionSteps[5],
    Thumbprint: executionSteps[4],
    ValidFromDate: executionSteps[7],
    ValidToDate: executionSteps[8],
  },
  [executionSteps[6]]: rawCertificateMock.IssuerName,
  [executionSteps[5]]: rawCertificateMock.SubjectName,
  [executionSteps[4]]: rawCertificateMock.Thumbprint,
  [executionSteps[7]]: rawCertificateMock.ValidFromDate,
  [executionSteps[8]]: rawCertificateMock.ValidToDate,
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => executionSteps[0]);

describe('getUserCertificates', () => {
  test('returns certificates list', async () => {
    const certificates = await getAllUserCertificates();

    expect(certificates.length).toBeGreaterThan(0);
  });

  test('returns certificates with correct fields', async () => {
    const [certificate] = await getAllUserCertificates();

    expect(certificate).toMatchObject(parsedCertificateMock);
  });
});
