import { DownloadInformation } from "../../../projects/time-line/src/public-api"
import { Location } from "./locations"

export interface Education {
    school: Location,
    from: Date,
    to: Date,
    downloads: DownloadInformation[],
    subject?: string,
    degree?: string
}

