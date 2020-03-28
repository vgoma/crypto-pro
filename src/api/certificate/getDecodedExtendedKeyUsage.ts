import { OIDS_DICTIONARY } from '../../constants';
import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { Certificate } from './certificate';

export interface ExtendedKeysTranslations {
  [key: string]: string | null;
}

/**
 * Возвращает расшифрованные ОИД'ы сертификата
 *
 * @returns словарь расшифрованных ОИД'ов
 */
export const getDecodedExtendedKeyUsage = _afterPluginsLoaded(async function (): Promise<ExtendedKeysTranslations> {
  const certificateOids = await (this as Certificate).getExtendedKeyUsage();

  return certificateOids.reduce(
    (decodedOids, oidCode) => ({
      ...decodedOids,
      [oidCode]: OIDS_DICTIONARY[oidCode] || null,
    }),
    {},
  );
});
