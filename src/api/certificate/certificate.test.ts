import 'cadesplugin';
import { parsedCertificates } from '../../__mocks__/certificates';
import { ISSUER_TAGS_TRANSLATIONS, SUBJECT_TAGS_TRANSLATIONS } from '../../constants';
import { exportBase64 } from './exportBase64';
import { getAlgorithm } from './getAlgorithm';
import { getCadesProp } from './getCadesProp';
import { getDecodedExtendedKeyUsage } from './getDecodedExtendedKeyUsage';
import { getExtendedKeyUsage } from './getExtendedKeyUsage';
import { getInfo } from './getInfo';
import { hasExtendedKeyUsage } from './hasExtendedKeyUsage';
import { isValid } from './isValid';
import { Certificate } from './certificate';

const [parsedCertificateMock] = parsedCertificates;
const oidsMock = ['oid 1', 'oid 2'];

jest.mock('./isValid', () => ({ isValid: jest.fn(() => 'isValid') }));
jest.mock('./getCadesProp', () => ({ getCadesProp: jest.fn(() => 'getCadesProp') }));
jest.mock('./exportBase64', () => ({ exportBase64: jest.fn(() => 'exportBase64') }));
jest.mock('./getAlgorithm', () => ({ getAlgorithm: jest.fn(() => 'getAlgorithm') }));
jest.mock('./getInfo', () => ({ getInfo: jest.fn(() => 'getInfo') }));
jest.mock('./getExtendedKeyUsage', () => ({ getExtendedKeyUsage: jest.fn(() => 'getExtendedKeyUsage') }));
jest.mock('./getDecodedExtendedKeyUsage', () => ({
  getDecodedExtendedKeyUsage: jest.fn(() => 'getDecodedExtendedKeyUsage'),
}));
jest.mock('./hasExtendedKeyUsage', () => ({ hasExtendedKeyUsage: jest.fn(() => 'hasExtendedKeyUsage') }));

beforeEach(() => {
  (isValid as jest.Mock).mockClear();
  (getCadesProp as jest.Mock).mockClear();
  (exportBase64 as jest.Mock).mockClear();
  (getAlgorithm as jest.Mock).mockClear();
  (getInfo as jest.Mock).mockClear();
  (getExtendedKeyUsage as jest.Mock).mockClear();
  (getDecodedExtendedKeyUsage as jest.Mock).mockClear();
  (hasExtendedKeyUsage as jest.Mock).mockClear();
});

const certificate = new Certificate(
  null,
  parsedCertificateMock.name,
  parsedCertificateMock.issuerName,
  parsedCertificateMock.subjectName,
  parsedCertificateMock.thumbprint,
  parsedCertificateMock.validFrom,
  parsedCertificateMock.validTo,
);

describe('getInfo', () => {
  test("calls external APIs for each method and passes it's results outside", async () => {
    expect(certificate.isValid()).toEqual('isValid');
    expect(isValid).toHaveBeenCalledTimes(1);
    expect(certificate.getCadesProp('property name')).toEqual('getCadesProp');
    expect(getCadesProp).toHaveBeenCalledWith('property name');
    expect(certificate.exportBase64()).toEqual('exportBase64');
    expect(exportBase64).toHaveBeenCalledTimes(1);
    expect(certificate.getAlgorithm()).toEqual('getAlgorithm');
    expect(getAlgorithm).toHaveBeenCalledTimes(1);
    expect(certificate.getOwnerInfo()).toEqual('getInfo');
    expect(getInfo).toHaveBeenCalledWith(SUBJECT_TAGS_TRANSLATIONS, 'SubjectName');
    expect(certificate.getIssuerInfo()).toEqual('getInfo');
    expect(getInfo).toHaveBeenCalledWith(ISSUER_TAGS_TRANSLATIONS, 'IssuerName');
    expect(certificate.getExtendedKeyUsage()).toEqual('getExtendedKeyUsage');
    expect(getExtendedKeyUsage).toHaveBeenCalledTimes(1);
    expect(certificate.getDecodedExtendedKeyUsage()).toEqual('getDecodedExtendedKeyUsage');
    expect(getDecodedExtendedKeyUsage).toHaveBeenCalledTimes(1);
    expect(certificate.hasExtendedKeyUsage(oidsMock)).toEqual('hasExtendedKeyUsage');
    expect(hasExtendedKeyUsage).toHaveBeenCalledWith(oidsMock);
  });
});
