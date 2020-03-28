import React, { useState, useEffect } from 'react';
import { getUserCertificates } from 'crypto-pro';

function CertList({onChange, onError}) {
  const [certificates, setCertificates] = useState([]);

  function selectCertificate(event) {
    onChange(certificates.find(({thumbprint}) => thumbprint === event.target.value));
  }

  useEffect(() => {
    (async () => {
      try {
        setCertificates(await getUserCertificates());
      } catch (error) {
        onError(error.message);
      }
    })();
  }, [onError]);

  return (
    <select onChange={selectCertificate}>
      <option defaultValue={null}>Не выбран</option>
      {certificates.map(({name, thumbprint}) =>
        <option key={thumbprint} value={thumbprint}>{name}</option>
      )}
    </select>
  );
}

export default CertList;
