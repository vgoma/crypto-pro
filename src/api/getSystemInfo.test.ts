import 'cadesplugin';
import { getSystemInfo } from './getSystemInfo';

const executionSteps = [
  Symbol('step 0'),
  Symbol('step 1'),
  Symbol('step 2'),
  Symbol('step 3'),
  Symbol('step 4'),
  Symbol('step 5'),
];

// "any" because of using toString on the literal
const executionFlow: any = {
  [executionSteps[0]]: {
    PluginVersion: executionSteps[1],
    Version: executionSteps[2],
    CSPVersion: jest.fn(() => executionSteps[3]),
  },
  [executionSteps[1]]: undefined,
  [executionSteps[2]]: {
    toString: jest.fn(() => executionSteps[4]),
  },
  [executionSteps[3]]: {
    toString: jest.fn(() => executionSteps[5]),
  },
  [executionSteps[4]]: '2.0.13771',
  [executionSteps[5]]: '4.0.9971',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => executionSteps[0]);

describe('getSystemInfo', () => {
  test('returns information about environment', async () => {
    const systemInfo = await getSystemInfo();

    expect(systemInfo).toStrictEqual({
      cadesVersion: '2.0.13771',
      cspVersion: '4.0.9971',
    });
  });
});
