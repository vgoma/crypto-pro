const oldestSupportedCSPVersion = 4.0;

export const _isSupportedCSPVersion = (version: string): boolean => {
  version = version.match(/\d+?\b(?:\.\d+)?/)?.[0];

  return Number(version) >= oldestSupportedCSPVersion;
};
