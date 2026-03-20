import { DownloadInformation } from "../../../projects/time-line/src/public-api";
import { Location } from "./locations";

export interface Experiance {
    company: Location,
    downloads: DownloadInformation[],
    employedAs: string,
    from: Date,
    to: Date
}