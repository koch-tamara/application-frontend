import { Location } from "./locations"

export interface Education {
    school: Location,
    from: Date,
    to: Date,
    downloads: string[],
    subject?: string,
    degree?: string
}