import React, { useState, useEffect } from 'react';
import { getSystemInfo, isValidSystemSetup } from 'crypto-pro';

function SystemInfo({onError}) {
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setSystemInfo({
          ...await getSystemInfo(),
          isValidSystemSetup: await isValidSystemSetup()
        });
      } catch (error) {
        onError(error.message);
      }
    })();
  }, [onError]);

  if (!systemInfo) {
    return null;
  }

  return (
    <pre>{JSON.stringify(systemInfo, null, '  ')}</pre>
  );
}

export default SystemInfo;
