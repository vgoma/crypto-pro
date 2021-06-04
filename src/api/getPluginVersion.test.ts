import 'cadesplugin';
import { getPluginVersion } from './getPluginVersion';

const executionSteps = [Symbol('step 0'), Symbol('step 1'), Symbol('step 2'), Symbol('step 3')];

// "any" because of using toString on the literal
const executionFlow: any = {
  [executionSteps[0]]: {
    PluginVersion: executionSteps[1],
    Version: executionSteps[2],
  },
  [executionSteps[1]]: undefined,
  [executionSteps[2]]: {
    toString: jest.fn(() => executionSteps[3]),
  },
  [executionSteps[3]]: '2.0.13771',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => executionSteps[0]);

describe('getPluginVersion', () => {
  test('returns information about plugin', async () => {
    const pluginVersion = await getPluginVersion();

    expect(pluginVersion).toStrictEqual('2.0.13771');
  });
});
