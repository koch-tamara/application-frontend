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

    constructor(
        customer: Customer, 
        experience: Experiance[], 
        education: Education[],
        introduction: Introduction,
        skills: Skills,
    ){
        this.customer = customer;
        this.experience = experience;
        this.education = education;
        this.introduction = introduction;
        this.skills = skills;
    }
}

export interface Customer {
    id: string;
    name: string;
    isBlindApplication: boolean;
}