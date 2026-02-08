import { Location } from "./locations";

export interface Experiance {
    company: Location,
    downloads: string[],
    employedAs: string,
    from: Date,
    to: Date
}