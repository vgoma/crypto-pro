import { Certificate } from './certificate';
export declare const createHashSignature: (oCertificate: Certificate, oHashedData: any) => Promise<string>;
