import { CadesCertificate } from '../api/certificate';
import { _afterPluginsLoaded } from './_afterPluginsLoaded';
import { _getCadesUserCert } from './_getCadesUserCert';
import { _getCadesContainerCert } from './_getCadesContainerCert';

/**
 * Возвращает сертификат в формате Cades по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат в формате Cades
 */
export const _getCadesCert = _afterPluginsLoaded(
  async (thumbprint: string): Promise<CadesCertificate> => {
    let cadesCertificate: CadesCertificate;

    try {
      cadesCertificate = await _getCadesUserCert(thumbprint);
    } catch (error) {
      console.log(error);

      cadesCertificate = await _getCadesContainerCert(thumbprint);
    }

    return cadesCertificate;
  },
);
