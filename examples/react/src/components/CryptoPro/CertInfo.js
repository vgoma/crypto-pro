import React, { useState } from 'react';

function CertInfo({certificate, onError}) {
  const [certInfo, setCertInfo] = useState(null);

  async function showCertInfo() {
    try {
      setCertInfo({
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
        "['1.3.6.1.5.5.7.3.2', '1.3.6.1.4.1.311.10.3.12']": await certificate.hasExtendedKeyUsage([
          '1.3.6.1.5.5.7.3.2',
          '1.3.6.1.4.1.311.10.3.12'
        ]),
        '1.3.6.1.4.1.311.80.2': await certificate.hasExtendedKeyUsage('1.3.6.1.4.1.311.80.2'),
        "'1.3.6.1.5.5.7.3.3', '1.3.6.1.4.1.311.10.3.12'": await certificate.hasExtendedKeyUsage([
          '1.3.6.1.5.5.7.3.3',
          '1.3.6.1.4.1.311.10.3.12'
        ]),
      });
    } catch (error) {
      onError(error.message);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={showCertInfo}
        disabled={!certificate}>
        Информация о сертификате
      </button>
      <br/>
      {certInfo ? (
        <pre>{JSON.stringify(certInfo, null, '  ')}</pre>
      ) : null}
    </>
  );
}

export default CertInfo;
