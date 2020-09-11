import { Certificate } from './certificate';
export declare const createCoSignature: (oCertificate: Certificate, oHashedData: any, sSignedMessage: string) => Promise<string>;
