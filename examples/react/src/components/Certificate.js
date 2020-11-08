import React, { useState, useEffect } from 'react';
import { getCertificate, getUserCertificates } from 'crypto-pro';

function Certificate({onChange}) {
  const [certificates, setCertificates] = useState([]);
  const [certificatesError, setCertificatesError] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [detailsError, setDetailsError] = useState(null);

  function selectCertificate(event) {
    const certificate = certificates.find(({thumbprint}) => thumbprint === event.target.value);

    setCertificate(certificate);
    onChange(certificate);
  }

  async function loadCertificateDetails(thumbprint) {
    try {
      const certificate = await getCertificate(thumbprint);

      setCertificateDetails({
        name: certificate.name,
        issuerName: certificate.issuerName,
        subjectName: certificate.subjectName,
        thumbprint: certificate.thumbprint,
        validFrom: certificate.validFrom,
        validTo: certificate.validTo,
        isValid: await certificate.isValid(),
        version: await certificate.getCadesProp('Version'),
        base64: await certificate.exportBase64(),
        algorithm: await certificate.getAlgorithm(),
        extendedKeyUsage: await certificate.getExtendedKeyUsage(),
        ownerInfo: await certificate.getOwnerInfo(),
        issuerInfo: await certificate.getIssuerInfo(),
        decodedExtendedKeyUsage: await certificate.getDecodedExtendedKeyUsage(),
        '1.3.6.1.4.1.311.80.1': await certificate.hasExtendedKeyUsage('1.3.6.1.4.1.311.80.1'),
        '[\'1.3.6.1.5.5.7.3.2\', \'1.3.6.1.4.1.311.10.3.12\']': await certificate.hasExtendedKeyUsage([
          '1.3.6.1.5.5.7.3.2',
          '1.3.6.1.4.1.311.10.3.12'
        ]),
        '1.3.6.1.4.1.311.80.2': await certificate.hasExtendedKeyUsage('1.3.6.1.4.1.311.80.2'),
        '\'1.3.6.1.5.5.7.3.3\', \'1.3.6.1.4.1.311.10.3.12\'': await certificate.hasExtendedKeyUsage([
          '1.3.6.1.5.5.7.3.3',
          '1.3.6.1.4.1.311.10.3.12'
        ]),
      });
    } catch (error) {
      setDetailsError(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setCertificates(await getUserCertificates());
      } catch (error) {
        setCertificatesError(error.message);
      }
    })();
  });

  return (
    <>
      <label htmlFor="certificate">Сертификат: *</label>

      <br/>

      <select id="certificate" onChange={selectCertificate}>
        <option defaultValue={null}>Не выбран</option>

        {certificates.map(({name, thumbprint, validTo}) =>
          <option key={thumbprint} value={thumbprint}>
            {name + ' (действителен до: ' + validTo + ')'}
          </option>
        )}
      </select>

      <pre>{certificatesError || null}</pre>

      {certificate ? (
        <>
          <details
            onClick={loadCertificateDetails.bind(this, certificate.thumbprint)}>
            <summary>Информация о сертификате</summary>

            <pre>
              {certificateDetails ? (
                JSON.stringify(certificateDetails, null, '  ')
              ) : 'Запрашивается...'}
            </pre>
          </details>

          <pre>{detailsError || null}</pre>
        </>
      ) : null}
    </>
  );
}

export default Certificate;
