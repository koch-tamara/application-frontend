import { Basics } from "./basic";
import { Education } from "./ecucation";
import { Experiance } from "./experience";
import { Introduction } from "./introduction";
import { Skills } from "./skills";

export class ApplicationContent {
    experience: Experiance[];
    education: Education[];
    introduction: Introduction;
    skills: Skills;
    basics: Basics;

    constructor(
        experience: Experiance[],
        education: Education[],
        introduction: Introduction,
        skills: Skills,
        basics: Basics,
    ) {
        this.experience = experience;
        this.education = education;
        this.introduction = introduction;
        this.skills = skills;
        this.basics = basics;
    }
}