import React, { useState } from 'react';
import { createAttachedSignature, createDetachedSignature, createHash } from 'crypto-pro';
import Message from './components/Message';
import Certificate from './components/Certificate';
import SignatureType from './components/SignatureType';
import Hash from './components/Hash';
import Signature from './components/Signature';
import CustomSystemInfo from './components/CustomSystemInfo';
import SystemInfo from './components/SystemInfo';

function App() {
  const [message, setMessage] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [detachedSignature, setSignatureType] = useState(null);
  const [hash, setHash] = useState('');
  const [hashStatus, setHashStatus] = useState('Не вычислен');
  const [hashError, setHashError] = useState(null);
  const [signature, setSignature] = useState('');
  const [signatureStatus, setSignatureStatus] = useState('Не создана');
  const [signatureError, setSignatureError] = useState(null);

  async function createSignature(event) {
    let hash;

    event.preventDefault();

    setSignature('');
    setSignatureError(null);

    setHash('');
    setHashError(null);
    setHashStatus('Вычисляется...');

    try {
      hash = await createHash(message);

      setHash(hash);
    } catch (error) {
      setHashError(error.message);

      return;
    }

    setHashStatus('Не вычислен');
    setSignatureStatus('Создается...');

    if (detachedSignature) {
      try {
        setSignature(await createDetachedSignature(certificate.thumbprint, hash));
      } catch (error) {
        setSignatureError(error.message);
      }

      setSignatureStatus('Не создана');

      return;
    }

    try {
      setSignature(await createAttachedSignature(certificate.thumbprint, message));
    } catch (error) {
      setSignatureError(error.message);
    }

    setSignatureStatus('Не создана');
  }

  return (
    <>
      <form onSubmit={createSignature} noValidate>
        <fieldset>
          <Message onChange={setMessage}/>

          <br/><br/>

          <Certificate onChange={setCertificate}/>

          <SignatureType onChange={setSignatureType}/>

          <br/><br/>
          <hr/>

          <button
            type="submit"
            disabled={!certificate || !message}>
            Создать подпись
          </button>
        </fieldset>
      </form>

      <fieldset>
        <Hash
          hash={hash}
          hashStatus={hashStatus}
          hashError={hashError}/>

        <Signature
          signature={signature}
          signatureStatus={signatureStatus}
          signatureError={signatureError}/>

        <p>
          Для <a href="https://www.gosuslugi.ru/pgu/eds/"
                 target="_blank"
                 rel="nofollow noopener noreferrer"
                 title="Перейти к проверке подписи">проверки</a> нужно
          создать файл со сгенерированной подписью в кодировке UTF-8 с расширением *.sgn
          <br/>
          для отделенной подписи (или *.sig для совмещенной).
        </p>
      </fieldset>

      <fieldset>
        <legend>Информация о системе</legend>
        <CustomSystemInfo/>
        <SystemInfo/>
      </fieldset>
    </>
  );
}

export default App;
