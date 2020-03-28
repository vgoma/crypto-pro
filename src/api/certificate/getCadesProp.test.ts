import 'cadesplugin';
import { getCadesProp } from './getCadesProp';

const cadesPropertyContentMock = 'content of a cades property';

const executionSteps = [Symbol('step 0')];

const executionFlow = {
  [executionSteps[0]]: cadesPropertyContentMock,
};

window.cadesplugin.__defineExecutionFlow(executionFlow);

describe('getCadesProp', () => {
  test('returns contents of a cades prop', async () => {
    const cadesPropertyContent = await getCadesProp.call(
      {
        _cadesCertificate: {
          cadesProperty: executionSteps[0],
        },
      },
      'cadesProperty',
    );

    expect(cadesPropertyContent).toEqual(cadesPropertyContentMock);
  });
});
