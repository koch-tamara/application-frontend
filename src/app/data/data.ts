import { Education } from "./ecucation";
import { Experiance } from "./experience";

export class ApplicationContent {
    customer: Customer;
    experience: Experiance[];
    education: Education[];

    constructor(customer: Customer, experience: Experiance[], education: Education[]){
        this.customer = customer;
        this.experience = experience;
        this.education = education;
    }
}

export interface Customer {
    id: string;
    name: string;
    isBlindApplication: boolean;
}