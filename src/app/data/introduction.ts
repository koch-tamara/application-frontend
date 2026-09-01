import { Localized } from "shared-models";

export type Sentence = string;
export type Paragraph = Sentence[];
export interface Introduction extends Localized<Paragraph[]> { }
export interface Greeting extends Localized<string> { }