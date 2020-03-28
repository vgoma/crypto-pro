import 'cadesplugin';
import { isValid } from './isValid';

const executionSteps = [Symbol('step 0'), Symbol('step 1')];

const executionFlow = {
  [executionSteps[0]]: {
    Result: executionSteps[1],
  },
  [executionSteps[1]]: true,
};

window.cadesplugin.__defineExecutionFlow(executionFlow);

describe('isValid', () => {
  test('returns validity state of certificate', async () => {
    const valid = await isValid.call({
      _cadesCertificate: {
        IsValid: jest.fn(() => executionSteps[0]),
      },
    });

    expect(valid).toEqual(true);
  });
});
