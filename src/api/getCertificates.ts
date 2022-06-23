import { Certificate } from './certificate';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { getUserCertificates } from './getUserCertificates';
import { getContainerCertificates } from './getContainerCertificates';
import { getAllUserCertificates } from './getAllUserCertificates';
import { getAllContainerCertificates } from './getAllContainerCertificates';

let certificatesCache: Certificate[];
/**
 * Возвращает список сертификатов, доступных пользователю из пользовательского хранилища и закрытых ключей, не установленных в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export const getCertificates = _afterPluginsLoaded(
  async (resetCache: boolean = false): Promise<Certificate[]> => {
    if (!resetCache && certificatesCache) {
      return certificatesCache;
    }

    let availableCertificates: Certificate[];

    try {
      availableCertificates = await getUserCertificates(resetCache);
    } catch (error) {
      console.error(error);

      availableCertificates = [];
    }

    try {
      const containerCertificates: Certificate[] = await getContainerCertificates(resetCache);

      if (!availableCertificates) {
        availableCertificates = containerCertificates;
      } else {
        let containerCertificatesCount = containerCertificates.length - 1;
        let foundAvailableCertificate;

        while (containerCertificatesCount) {
          foundAvailableCertificate = availableCertificates.find(
            (cert) => cert.thumbprint === containerCertificates[containerCertificatesCount].thumbprint,
          );

          if (!foundAvailableCertificate) {
            availableCertificates.push(containerCertificates[containerCertificatesCount]);
          }

          containerCertificatesCount--;
        }
      }
    } catch (error) {
      console.error(error);
    }

    if (!availableCertificates) {
      throw new Error('Нет доступных сертификатов');
    }

    certificatesCache = availableCertificates;

    return certificatesCache;
  },
);
