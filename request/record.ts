export type Record<K extends keyof any, T> = {
    [P in K]: T;
};