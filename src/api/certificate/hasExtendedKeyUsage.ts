import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { Certificate } from './certificate';

/**
 * Проверяет наличие ОИД'а (ОИД'ов) у сертификата
 *
 * @param oids - ОИД'ы для проверки
 * @returns флаг наличия ОИД'ов у сертификата
 */
export const hasExtendedKeyUsage = _afterPluginsLoaded(async function (oids: string | string[]): Promise<boolean> {
  const certOids = await (this as Certificate).getExtendedKeyUsage();

  let result: boolean;

  if (Array.isArray(oids)) {
    result = oids.every((oidToCheck) => certOids.some((certOid) => certOid === oidToCheck));
  } else {
    result = certOids.some((certOid) => certOid === oids);
  }

  return result;
});
