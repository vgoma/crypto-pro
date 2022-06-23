import { Certificate } from './certificate';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { getAllUserCertificates } from './getAllUserCertificates';
import { getAllContainerCertificates } from './getAllContainerCertificates';

let certificatesCache: Certificate[];
/**
 * Возвращает список сертификатов, доступных пользователю из пользовательского хранилища и закрытых ключей, не установленных в системе, без фильтрации по дате и наличию приватного ключа
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов
 * @returns список сертификатов
 */
export const getAllCertificates = _afterPluginsLoaded(
  async (resetCache: boolean = false): Promise<Certificate[]> => {
    if (!resetCache && certificatesCache) {
      return certificatesCache;
    }

    let availableCertificates: Certificate[];

    try {
      availableCertificates = await getAllUserCertificates(resetCache);
    } catch (error) {
      console.error(error);

      availableCertificates = [];
    }

    try {
      const containerAllCertificates: Certificate[] = await getAllContainerCertificates(resetCache);

      if (!availableCertificates) {
        availableCertificates = containerAllCertificates;
      } else {
        let containerAllCertificatesCount = containerAllCertificates.length - 1;
        let foundAvailableCertificate;

        while (containerAllCertificatesCount) {
          foundAvailableCertificate = availableCertificates.find(
            (cert) => cert.thumbprint === containerAllCertificates[containerAllCertificatesCount].thumbprint,
          );

          if (!foundAvailableCertificate) {
            availableCertificates.push(containerAllCertificates[containerAllCertificatesCount]);
          }

          containerAllCertificatesCount--;
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
