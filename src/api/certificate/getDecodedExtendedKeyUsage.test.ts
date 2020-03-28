import 'cadesplugin';
import { getDecodedExtendedKeyUsage } from './getDecodedExtendedKeyUsage';

const oidsMock = ['1.2.643.3.131.1.1', '1.2.643.6.3.1.3.1', '1.2.643.3.141.1.1'];

describe('getDecodedExtendedKeyUsage', () => {
  test('returns translated info about existing oids of a certificate', async () => {
    const getExtendedKeyUsageStub = jest.fn(() => oidsMock);
    const certificateStub = { getExtendedKeyUsage: getExtendedKeyUsageStub };

    expect(await getDecodedExtendedKeyUsage.call(certificateStub)).toEqual({
      '1.2.643.3.131.1.1': 'ИНН',
      '1.2.643.3.141.1.1': 'РНС ФСС',
      '1.2.643.6.3.1.3.1': 'Участник размещения заказа',
    });
    expect(getExtendedKeyUsageStub).toBeCalledTimes(1);
  });
});
