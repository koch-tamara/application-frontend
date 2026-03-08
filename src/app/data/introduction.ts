import { ImageInformation } from "../../../projects/page-layout/src/public-api";
import { Localized } from "./localizeType";
import { Location } from "./locations";


// ToDo: some company information are already configured in 'Customer'
export interface Introduction {
    company: Company; 
    content: IntroductionContent;
    date: Date;
    greeting?: Greeting;
}

export interface Company  {
    id: string;
    place: Location,
    contact?: Contact;
    logo?: ImageInformation;
}

export interface Contact {
    firstName?: string;
    lastName: string;
    sex: ESex;
}

export enum ESex {
    male,
    female
}

export type Sentence = string;
export type Paragraph = Sentence[];
export interface IntroductionContent extends Localized<Paragraph[]> {}
export interface Greeting  extends Localized<string> {}