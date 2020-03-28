import React from 'react';
import { createSignature } from 'crypto-pro';

function Sign({certificate, onSign, onError, children}) {
  async function sign() {
    // Вычислинный hash по ГОСТ Р 34.11-94 для строки: "abc"
    const hash = 'b285056dbf18d7392d7677369524dd14747459ed8143997e163b2986f92fd42c';
    const hashBase64 = window.btoa(hash);

    try {
      onSign(await createSignature(certificate.thumbprint, hashBase64));
    } catch (error) {
      onError(error.message);
    }
  }

  return (
    <button
      type="button"
      disabled={!certificate}
      onClick={sign}>
      {children}
    </button>
  );
}

export default Sign;
