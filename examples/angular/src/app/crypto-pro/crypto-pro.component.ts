import { Component, OnInit } from '@angular/core';
import {
  getCertificate,
  getUserCertificates,
  getSystemInfo,
  isValidSystemSetup,
  createSignature,
  SystemInfo,
  Certificate
} from 'crypto-pro';

@Component({
  selector: 'app-crypto-pro',
  templateUrl: './crypto-pro.component.html',
  styleUrls: ['./crypto-pro.component.css']
})
export class CryptoProComponent implements OnInit {
  public certificateList: Certificate[] = [];
  public thumbprint: string = null;
  public signature: string;
  public systemInfo: SystemInfo & {
    isValidSystemSetup: boolean;
  };
  public error: string;
  public certInfo;

  constructor() { }

  public ngOnInit(): void {
    this.displayCertificates();
    this.displaySystemInfo();
  }

  public async createSignature(thumbprint) {
    // Вычислинный hash по ГОСТ Р 34.11-94 для строки: "abc"
    const hash = 'b285056dbf18d7392d7677369524dd14747459ed8143997e163b2986f92fd42c';
    const hashBase64 = window.btoa(hash);

    try {
      this.signature = await createSignature(thumbprint, hashBase64);
    } catch (error) {
      this.error = error.message;
    }
  }

  public async showCertInfo(thumbprint) {
    try {
      const certificate = await getCertificate(thumbprint);

      this.certInfo = {
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
      };
    } catch (error) {
      this.error = error.message;
    }
  }

  private async displayCertificates() {
    try {
      this.certificateList = await getUserCertificates();
    } catch (error) {
      this.error = error.message;
    }
  }

  private async displaySystemInfo() {
    try {
      this.systemInfo = {
        ...await getSystemInfo(),
        isValidSystemSetup: await isValidSystemSetup()
      };
    } catch (error) {
      this.error = error.message;
    }
  }
}
