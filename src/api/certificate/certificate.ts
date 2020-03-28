import { ISSUER_TAGS_TRANSLATIONS, SUBJECT_TAGS_TRANSLATIONS } from '../../constants';
import { TagTranslation } from '../../helpers/_parseCertInfo';
import { exportBase64 } from './exportBase64';
import { getAlgorithm } from './getAlgorithm';
import { getCadesProp } from './getCadesProp';
import { getDecodedExtendedKeyUsage, ExtendedKeysTranslations } from './getDecodedExtendedKeyUsage';
import { getExtendedKeyUsage } from './getExtendedKeyUsage';
import { getInfo } from './getInfo';
import { hasExtendedKeyUsage } from './hasExtendedKeyUsage';
import { isValid } from './isValid';

export type CadesCertificate = any;

export class Certificate {
  constructor(
    public _cadesCertificate: CadesCertificate,
    public name: string,
    public issuerName: string,
    public subjectName: string,
    public thumbprint: string,
    public validFrom: string,
    public validTo: string,
  ) {}

  public getOwnerInfo(): Promise<TagTranslation[]> {
    return getInfo.call(this, SUBJECT_TAGS_TRANSLATIONS, 'SubjectName');
  }

  public getIssuerInfo(): Promise<TagTranslation[]> {
    return getInfo.call(this, ISSUER_TAGS_TRANSLATIONS, 'IssuerName');
  }

  public getExtendedKeyUsage(): Promise<string[]> {
    return getExtendedKeyUsage.call(this);
  }

  public getDecodedExtendedKeyUsage(): Promise<ExtendedKeysTranslations> {
    return getDecodedExtendedKeyUsage.call(this);
  }

  public getAlgorithm(): Promise<string> {
    return getAlgorithm.call(this);
  }

  public getCadesProp(propName): Promise<any> {
    return getCadesProp.call(this, propName);
  }

  public isValid(): Promise<boolean> {
    return isValid.call(this);
  }

  public exportBase64(): Promise<string> {
    return exportBase64.call(this);
  }

  public hasExtendedKeyUsage(oids): Promise<boolean> {
    return hasExtendedKeyUsage.call(this, oids);
  }
}
