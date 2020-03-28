import React from 'react';
import './App.css';
import CryptoPro from './components/CryptoPro';

function App() {
  return (
    <CryptoPro>{({certificate, setCertificate, signature, setSignature, error, setError}) =>
      <>
        <CryptoPro.CertList onChange={setCertificate} onError={setError}/>
        <CryptoPro.Sign certificate={certificate} onSign={setSignature} onError={setError}>
          Создать подпись
        </CryptoPro.Sign>
        <CryptoPro.CertInfo certificate={certificate} onError={setError}/>
        <textarea value={signature} readOnly cols="100" rows="30"/>
        <pre>{error}</pre>
        <CryptoPro.SystemInfo onError={setError}/>
      </>
    }</CryptoPro>
  );
}

export default App;
