import 'cadesplugin';
import 'console-error';
import { _afterPluginsLoaded } from './_afterPluginsLoaded';

const cadesPluginMock = window.cadesplugin;

describe('_afterPluginsLoaded', () => {
  beforeEach(() => {
    window.cadesplugin = cadesPluginMock;
  });

  test('sets log level on a vendor library', async () => {
    const wrappedMethod = _afterPluginsLoaded(jest.fn());

    await wrappedMethod();

    expect(window.cadesplugin.set_log_level).toBeCalled();
  });

  test("throws Error when Cades plugin isn't available", async () => {
    const wrappedMethod = _afterPluginsLoaded(jest.fn());

    window.cadesplugin = Promise.reject();

    await expect(wrappedMethod()).rejects.toThrow();
  });

  test('throws Error from Cades plugin if it occurs', async () => {
    const wrappedMethod = _afterPluginsLoaded(jest.fn());
    const vendorErrorMessage = 'Что-то пошло не так, и об этом стоит знать пользователю';

    window.cadesplugin = Promise.reject(new Error(vendorErrorMessage));

    await expect(wrappedMethod()).rejects.toThrowError(vendorErrorMessage);
  });

  test('calls method body when invoked', async () => {
    const methodBody = jest.fn();
    const wrappedMethod = _afterPluginsLoaded(methodBody);

    await wrappedMethod();

    expect(methodBody).toBeCalled();
  });
});
