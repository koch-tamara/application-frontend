import { Content } from "../interfaces/Content";
import { Coordinates } from "./Coordinates";
import { MetaData } from "./MetaData";

export class TimeLineEntry {
    content: Content;
    data: MetaData;
    id: number;

    constructor(content: Content, id: number, isLastEntry: boolean, previousData?: MetaData) {
        this.content = content;
        this.data = new MetaData(isLastEntry, previousData);
        this.id = id;
    }

    public GetMostRightCoordinate(): Coordinates {
        const position = !!this.data.emptyStepAfterEntry
            ? this.data.emptyStepAfterEntry
            : this.data;
        return new Coordinates(position.coordinates.x + position.length, position.coordinates.y);
    }
}