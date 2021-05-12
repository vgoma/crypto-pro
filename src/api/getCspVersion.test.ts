import 'cadesplugin';
import { getCspVersion } from './getCspVersion';

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
    CSPVersion: jest.fn(() => executionSteps[1]),
  },
  [executionSteps[1]]: {
    toString: jest.fn(() => executionSteps[2]),
  },
  [executionSteps[2]]: '4.0.9971',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(
  () => executionSteps[0],
);

describe('getCspVersion', () => {
  test('returns information about CSP', async () => {
    const cspVersion = await getCspVersion();

    expect(cspVersion).toStrictEqual('4.0.9971');
  });
});
