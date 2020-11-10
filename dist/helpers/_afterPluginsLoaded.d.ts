declare type Unpromisify<T> = T extends Promise<infer R> ? R : T;
export declare const _afterPluginsLoaded: <T extends (...args: any[]) => any>(fn: T) => (...args: Parameters<T>) => Promise<Unpromisify<ReturnType<T>>>;
export {};
