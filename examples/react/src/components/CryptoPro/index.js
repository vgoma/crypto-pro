import { useState } from 'react';
import CertList from './CertList';
import CertInfo from './CertInfo';
import Sign from './Sign';
import SystemInfo from './SystemInfo';

const CryptoPro = ({children}) => {
  const [certificate, setCertificate] = useState(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  return children({
    certificate,
    setCertificate,
    signature,
    setSignature,
    error,
    setError
  });
};

CryptoPro.CertList = CertList;
CryptoPro.Sign = Sign;
CryptoPro.CertInfo = CertInfo;
CryptoPro.SystemInfo = SystemInfo;

export default CryptoPro;
