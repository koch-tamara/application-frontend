import { Localized } from "shared-models";

export interface Skills {
    hardSkills: Assessment[];
    softSkills: { label: Localized<string> }[];
}

export interface Assessment {
    label: Localized<string>;
    rating: number;
}