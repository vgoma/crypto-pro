import 'cadesplugin';
import { hasExtendedKeyUsage } from './hasExtendedKeyUsage';

const oidsMock = ['1.3.6.1.4.1.311.80.1', '1.3.6.1.5.5.7.3.2', '1.3.6.1.4.1.311.10.3.12'];

describe('hasExtendedKeyUsage', () => {
  test('returns info about existing oids of a certificate', async () => {
    const getExtendedKeyUsageStub = jest.fn(() => oidsMock);
    const certificateStub = { getExtendedKeyUsage: getExtendedKeyUsageStub };

    expect(await hasExtendedKeyUsage.call(certificateStub, '1.3.6.1.4.1.311.80.1')).toEqual(true);
    expect(await hasExtendedKeyUsage.call(certificateStub, ['1.3.6.1.5.5.7.3.2', '1.3.6.1.4.1.311.10.3.12'])).toEqual(
      true,
    );
    expect(await hasExtendedKeyUsage.call(certificateStub, 'non-existing oid')).toEqual(false);
    expect(getExtendedKeyUsageStub).toBeCalledTimes(3);
  });
});
