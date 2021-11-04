import React, { useState, useEffect } from 'react';
import { execute } from 'crypto-pro';

function CustomSystemInfo() {
  const [customSystemInfo, setCustomSystemInfo] = useState(null);
  const [customSystemInfoError, setCustomSystemInfoError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Crypto-Pro GOST R 34.10-2001 Cryptographic Service Provider
        const providerType = 75;

        setCustomSystemInfo(await execute(function (utils) {
          return eval(
            utils._generateCadesFn(function getVersion() {
              var cadesAbout, cadesVersion, minor, major, build, version, providerName;

              try {
                cadesAbout = utils.__cadesAsyncToken__ + utils.__createCadesPluginObject__('CAdESCOM.About');
                providerName = utils.__cadesAsyncToken__ + cadesAbout.CSPName();
                cadesVersion = utils.__cadesAsyncToken__ + cadesAbout.CSPVersion(providerName, providerType);
                minor = utils.__cadesAsyncToken__ + cadesVersion.MinorVersion;
                major = utils.__cadesAsyncToken__ + cadesVersion.MajorVersion;
                build = utils.__cadesAsyncToken__ + cadesVersion.BuildVersion;
                version = utils.__cadesAsyncToken__ + cadesVersion.toString();
              } catch (error) {
                console.error(error);

                throw new Error(utils._extractMeaningfulErrorMessage(error) || 'Ошибка при извлечении информации');
              }

              return [
                providerName,
                [major, minor, build].join('.'),
                version
              ].join(', ');
            })
          );
        }));
      } catch (error) {
        setCustomSystemInfoError(error.message);
      }
    })();
  });

  return (
    <pre>
      {customSystemInfo ? (
        JSON.stringify(customSystemInfo, null, '  ')
      ) : (
        customSystemInfoError || null
      )}
    </pre>
  );
}

export default CustomSystemInfo;
