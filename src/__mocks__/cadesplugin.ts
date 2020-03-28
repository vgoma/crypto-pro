let executionFlow = null;

Object.defineProperty(window, 'cadesplugin', {
  writable: true,
  value: {
    set_log_level: jest.fn(),
    getLastError: jest.fn(),
    CreateObjectAsync: jest.fn(),
    __defineExecutionFlow: (newExecutionFlow): void => {
      executionFlow = newExecutionFlow;
    },
    async_spawn: jest.fn((generatorFn) => {
      const generatorIterable = generatorFn();
      let iterable = generatorIterable.next();

      while (!iterable.done) {
        iterable = generatorIterable.next(executionFlow[iterable.value]);
      }

      return iterable.value;
    }),
  },
});
