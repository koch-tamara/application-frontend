import { ImageInformation } from "../../../projects/page-layout/src/public-api";
import { Localized } from "../../../projects/time-line/src/public-api";
import { Paragraph } from "./introduction";

export interface AboutMe {
    info: PersonalInformation;
    description: Localized<Paragraph[]>;
    statements: Statement[];
}

export interface PersonalInformation {
    name: Name;
    address: string;
    eMail: string;
    phone: string;
    birthDate: Date;
    materialStatus: Localized<string>;
    nationality: Localized<string>;
}

export interface Name {
    firstName: string;
    lastName: string;
    née?: string;
}

export interface Statement {
    statement: Localized<string>;
    person: Person;
}

export interface Person {
    name: string;
    position: Localized<string>;
    photo?: ImageInformation
}