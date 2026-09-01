
export enum ELanguage {
    en = 'en',
    de = 'de'
}

export type Localized<T> = {
    [K in ELanguage]: T;
};