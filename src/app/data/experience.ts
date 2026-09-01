import { DownloadInformation } from "shared-models";
import { Location } from "./locations";

export interface Experiance {
    company: Location,
    downloads: DownloadInformation[],
    employedAs: string,
    from: string,
    to: string,
    dateFormat?: string,
}