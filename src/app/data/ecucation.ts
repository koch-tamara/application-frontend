import { DownloadInformation } from "../../../projects/time-line/src/public-api"
import { Location } from "./locations"

export interface Education {
    school: Location,
    from: string,
    to: string,
    downloads: DownloadInformation[],
    subject?: string,
    degree?: string,
    dateFormat?: string
}

