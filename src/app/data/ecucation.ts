import { DownloadInformation } from "shared-models"
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

