import { Education } from "./ecucation";
import { Experiance } from "./experience";
import { Introduction } from "./introduction";

export class ApplicationContent {
    customer: Customer;
    experience: Experiance[];
    education: Education[];
    introduction: Introduction;

    constructor(
        customer: Customer, 
        experience: Experiance[], 
        education: Education[],
        introduction: Introduction
    ){
        this.customer = customer;
        this.experience = experience;
        this.education = education;
        this.introduction = introduction;
    }
}

export interface Customer {
    id: string;
    name: string;
    isBlindApplication: boolean;
}