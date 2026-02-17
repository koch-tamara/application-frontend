import { Coordinates } from "./Coordinates";

export class Position {
    length: number;
    coordinates: Coordinates;

    constructor(coordinates: Coordinates, length: number){
        this.coordinates = coordinates;
        this.length = length;
    }
}