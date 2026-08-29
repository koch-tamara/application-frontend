import { Localized } from "../../../projects/time-line/src/public-api";

export interface Basics {
    address: string;
    eMail: string;
    phone: string;
    materialStatus: Localized<string>;
}