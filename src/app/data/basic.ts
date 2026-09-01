import { Localized } from "shared-models";

export interface Basics {
    address: string;
    eMail: string;
    phone: string;
    materialStatus: Localized<string>;
}