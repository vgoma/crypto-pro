import 'cadesplugin';
import { parsedCertificates } from '../__mocks__/certificates';
import { getCertificate } from './getCertificate';
import { getUserCertificates } from './getUserCertificates';

jest.mock('./getUserCertificates', () => ({ getUserCertificates: jest.fn(() => parsedCertificates) }));

beforeEach(() => {
  (getUserCertificates as jest.Mock).mockClear();
});

describe('getCertificate', () => {
  const [sampleCertificate] = parsedCertificates;

  test('calls getUserCertificates internally', async () => {
    await getCertificate(sampleCertificate.thumbprint);

    expect(getUserCertificates).toHaveBeenCalledTimes(1);
  });

  test('returns requested certificate', async () => {
    expect(await getCertificate(sampleCertificate.thumbprint)).toStrictEqual(sampleCertificate);
  });

  test("throws error if certificate wasn't found", async () => {
    await expect(getCertificate('some non-existing thumbprint')).rejects.toThrowError('не найден');
  });
});
