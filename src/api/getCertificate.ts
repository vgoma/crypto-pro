import { Certificate } from './certificate';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { getCertificates } from './getCertificates';
import { getAllCertificates } from './getAllCertificates';

/**
 * Возвращает сертификат по отпечатку
 *
 * @param thumbprint - отпечаток сертификата
 * @param validOnly - проверять сертификаты по дате и наличию приватного ключа
 * @returns сертификат
 */
export const getCertificate = _afterPluginsLoaded(
  async (thumbprint: string, validOnly: boolean = true): Promise<Certificate> => {
    if (!thumbprint) {
      throw new Error('Отпечаток не указан');
    }

    let availableCertificates: Certificate[];

    if (validOnly) {
      availableCertificates = await getCertificates();
    } else {
      availableCertificates = await getAllCertificates();
    }

    const foundCertificate: Certificate = availableCertificates.find((cert) => cert.thumbprint === thumbprint);

    if (!foundCertificate) {
      throw new Error(`Сертификат с отпечатком: "${thumbprint}" не найден`);
    }

    return foundCertificate;
  },
);
