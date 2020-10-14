import { TagTranslation } from '../../helpers/_parseCertInfo';
import { ExtendedKeysTranslations } from './getDecodedExtendedKeyUsage';
export declare type CadesCertificate = any;
export declare class Certificate {
    _cadesCertificate: CadesCertificate;
    name: string;
    issuerName: string;
    subjectName: string;
    thumbprint: string;
    validFrom: string;
    validTo: string;
    hasPrivateKey: boolean;
    constructor(_cadesCertificate: CadesCertificate, name: string, issuerName: string, subjectName: string, thumbprint: string, validFrom: string, validTo: string, hasPrivateKey: boolean);
    getOwnerInfo(): Promise<TagTranslation[]>;
    getIssuerInfo(): Promise<TagTranslation[]>;
    getExtendedKeyUsage(): Promise<string[]>;
    getDecodedExtendedKeyUsage(): Promise<ExtendedKeysTranslations>;
    getAlgorithm(): Promise<string>;
    getCadesProp(propName: any): Promise<any>;
    isValid(): Promise<boolean>;
    exportBase64(): Promise<string>;
    hasExtendedKeyUsage(oids: any): Promise<boolean>;
}
