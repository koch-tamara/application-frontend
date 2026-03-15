import { Localized } from "./localizeType";

export interface Skills {
    hardSkills: Assessment[];
    softSkills: Assessment[];
}

export interface Assessment {
    label: Localized<string>;
    rating: number;
}