import { Place } from "./Place";

export interface Content {
  where: Place;
  from: Date,
  to?: Date,
  downloads?: string[],
  label?: string,
  completion?: string,
}