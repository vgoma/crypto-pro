import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { getUserCertificates } from './getUserCertificates';

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
  Symbol('step 9'),
  Symbol('step 10'),
];

const executionFlow = {
  [executionSteps[0]]: {
    Certificates: executionSteps[1],
    Close: jest.fn(),
    Open: jest.fn(),
  },
  [executionSteps[1]]: {
    Find: jest.fn(() => executionSteps[2]),
  },
  [executionSteps[2]]: {
    Find: jest.fn(() => executionSteps[3]),
  },
  [executionSteps[3]]: {
    Count: executionSteps[4],
    Item: jest.fn(() => executionSteps[5]),
  },
  [executionSteps[4]]: 1,
  [executionSteps[5]]: {
    IssuerName: executionSteps[8],
    SubjectName: executionSteps[7],
    Thumbprint: executionSteps[6],
    ValidFromDate: executionSteps[9],
    ValidToDate: executionSteps[10],
  },
  [executionSteps[8]]: rawCertificateMock.IssuerName,
  [executionSteps[7]]: rawCertificateMock.SubjectName,
  [executionSteps[6]]: rawCertificateMock.Thumbprint,
  [executionSteps[9]]: rawCertificateMock.ValidFromDate,
  [executionSteps[10]]: rawCertificateMock.ValidToDate,
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => executionSteps[0]);

describe('getUserCertificates', () => {
  test('returns certificates list', async () => {
    const certificates = await getUserCertificates();

    expect(certificates.length).toBeGreaterThan(0);
  });

  test('returns certificates with correct fields', async () => {
    const [certificate] = await getUserCertificates();

    expect(certificate).toMatchObject(parsedCertificateMock);
  });
});
