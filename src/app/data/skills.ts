import { Localized } from "../../../projects/time-line/src/public-api";

export interface Skills {
    hardSkills: Assessment[];
    softSkills: Assessment[];
}

export interface Assessment {
    label: Localized<string>;
    rating: number;
}