// синтетические переменные, которые подменяются в рантайме
export const __cadesAsyncToken__ = {};
export const __createCadesPluginObject__ = (...args): any => ({});

function getGeneratorConstructor(): GeneratorFunction {
  return new Function('', 'return Object.getPrototypeOf(function*(){}).constructor')();
}

export const _generateCadesFn = (callback: Function): string => {
  const { cadesplugin } = window;
  const cadesGeneratorsAPI = Boolean(cadesplugin.CreateObjectAsync);
  const callbackName = callback.name || 'dynamicFn';
  const callbackLiteral = String(callback);
  const callbackArguments = callbackLiteral.match(/^function[\s\w]*?\((.*?)\)/)?.[1] || '';
  const callbackBody = callbackLiteral.replace(/^.*?{([\s\S]*?)}$/, '$1');
  let crossEnvCallbackLiteral = String(
    new (cadesGeneratorsAPI ? getGeneratorConstructor() : Function)(callbackArguments, callbackBody),
  );

  crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(
    /(?:\w+?\.)?__createCadesPluginObject__(\([\s\S]*?\))/gm,
    `cadesplugin.CreateObject${cadesGeneratorsAPI ? 'Async' : ''}$1`,
  );

  crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(
    /(?:\w+?\.)?__cadesAsyncToken__\s*?\+\s*?\b/gm,
    cadesGeneratorsAPI ? 'yield ' : '',
  );

  if (!cadesGeneratorsAPI) {
    crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/propset_(.*?)\((.*?)\)/gm, '$1 = $2');
  }

  return [
    cadesGeneratorsAPI ? `cadesplugin.async_spawn(${crossEnvCallbackLiteral});` : `(${crossEnvCallbackLiteral})();`,
    `//# sourceURL=crypto-pro_${callbackName}.js`,
  ].join('');
};
