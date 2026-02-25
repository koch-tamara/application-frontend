import { EImagePosition } from "../enums/EImagePosition";
import { Position } from "./Position";
import { Coordinates } from "./Coordinates";
import { RandomNumberInRange } from "./RandomNumberInRange";
import { EntryMaxLength, EntryMinLength, SmallestYDistanceToImageCenter, BiggestYDistanceToImageCenter, BezierRadius, SideDistanceToNearestEntry } from "../helper/TimeLineDefaults";

export class MetaData extends Position {
    position: EImagePosition;
    emptyStepAfterEntry?: Position;

    constructor(isLastEntry: boolean, to?: Date, previousPosition?: MetaData) {

        const entryLength = isLastEntry && !to
            ? EntryMaxLength + EntryMinLength
            : new RandomNumberInRange(EntryMinLength, EntryMaxLength).randomIntInRange;
        const yTopRange = new RandomNumberInRange(
            -SmallestYDistanceToImageCenter,
            -BiggestYDistanceToImageCenter
        );
        const yBottomRange = new RandomNumberInRange(
            -yTopRange.max,
            -yTopRange.min
        );
        const position = MetaData.getCurrentPosition(previousPosition);
        const coordinates = MetaData.getCoordinates(
            position,
            yBottomRange.randomIntInRange,
            yTopRange.randomIntInRange,
            previousPosition
        );

        super(coordinates, entryLength);

        this.position = position;

        if (isLastEntry) return;

        if (Math.random() < 0.2) {
            const gapLength = new RandomNumberInRange(10, 25).randomIntInRange;

            this.emptyStepAfterEntry = new Position(
                new Coordinates(
                    this.coordinates.x + this.length,
                    new RandomNumberInRange(
                        -SmallestYDistanceToImageCenter + 2 * BezierRadius,
                        SmallestYDistanceToImageCenter - 2 * BezierRadius
                    ).randomIntInRange
                ),
                gapLength
            );
        }
    }


    private static randomPosition(): EImagePosition {
        const values = Object.values(EImagePosition).filter(v => typeof v === 'number') as EImagePosition[];
        return values[Math.floor(Math.random() * values.length)];
    }

    private static getCurrentPosition(previousPosition?: MetaData): EImagePosition {
        if (!previousPosition) {
            return MetaData.randomPosition();
        }
        return previousPosition.position === EImagePosition.bottom
            ? EImagePosition.top
            : EImagePosition.bottom;
    }

    private static getCoordinates(currentPosition: EImagePosition, bottomY: number, topY: number, previousPosition?: MetaData): Coordinates {
        const randomY = currentPosition === EImagePosition.bottom
            ? bottomY
            : topY;

        if (!previousPosition) {
            return new Coordinates(SideDistanceToNearestEntry, randomY);
        }

        let currentX = previousPosition.coordinates.x + previousPosition.length
        if (previousPosition.emptyStepAfterEntry) {
            currentX += previousPosition.emptyStepAfterEntry.length;
        }
        return new Coordinates(currentX, randomY);
    }
}
