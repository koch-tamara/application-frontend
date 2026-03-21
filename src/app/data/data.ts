import { AboutMe } from "./about-me";
import { Education } from "./ecucation";
import { Experiance } from "./experience";
import { Introduction } from "./introduction";
import { Skills } from "./skills";

export class ApplicationContent {
    customer: Customer;
    experience: Experiance[];
    education: Education[];
    introduction: Introduction;
    skills: Skills;
    aboutMe: AboutMe;

    constructor(
        customer: Customer,
        experience: Experiance[],
        education: Education[],
        introduction: Introduction,
        skills: Skills,
        aboutMe: AboutMe,
    ) {
        this.customer = customer;
        this.experience = experience;
        this.education = education;
        this.introduction = introduction;
        this.skills = skills;
        this.aboutMe = aboutMe;
    }
}

export interface Customer {
    id: string;
    name: string;
    isBlindApplication: boolean;
}