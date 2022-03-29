import 'cadesplugin';
import { setLogLevel } from './setLogLevel';
import { LOG_LEVEL_DEBUG } from '../constants';

describe('setLogLevel', function () {
  test('should set log level', async function () {
    await setLogLevel(LOG_LEVEL_DEBUG);

    expect(window.cadesplugin.set_log_level).toHaveBeenCalledWith(LOG_LEVEL_DEBUG);
  });
});
