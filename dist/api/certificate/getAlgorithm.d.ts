interface AlgorithmInfo {
    algorithm: string;
    oid: string;
}
/**
 * Возвращает информацию об алгоритме сертификата
 *
 * @returns информацию об алгоритме и его OID'е
 */
export declare const getAlgorithm: () => Promise<AlgorithmInfo>;
export {};
