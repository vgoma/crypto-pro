import { Certificate } from './certificate';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { getUserCertificates } from './getUserCertificates';

/**
 * Возвращает сертификат по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @returns сертификат
 */
export const getCertificate = _afterPluginsLoaded(
  async (thumbprint: string): Promise<Certificate> => {
    if (!thumbprint) {
      throw new Error('Отпечаток не указан');
    }

    const availableCertificates: Certificate[] = await getUserCertificates();
    const foundCertificate: Certificate = availableCertificates.find((cert) => cert.thumbprint === thumbprint);

    if (!foundCertificate) {
      throw new Error(`Сертификат с отпечатком: "${thumbprint}" не найден`);
    }

    return foundCertificate;
  },
);
