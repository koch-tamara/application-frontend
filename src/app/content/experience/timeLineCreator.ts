import { ElementRef } from "@angular/core";
import { TimeLineEntry } from "./experience.component";

const biggestYDistanceToImageCenter = 100;
const smallestYDistanceToImageCenter = 40;
const sideDistanceToNearestEntry = 50;

class EntryInformation {
    content: TimeLineEntry;
    position: PositionData;
    id: number;
    constructor(content: TimeLineEntry, id: number, previousPosition?: PositionData){
        this.content = content;
        this.position = new PositionData(previousPosition);
        this.id = id;
    }
}

class PositionData {
    coordinate: Coordinate;
    position: EPosition;
    length: number;
    emptyStepAfterEntry?: {
        length: number;
        coordinate: Coordinate;
    };

    private entryLength = new Range(50, 70);
    private gapLength = new Range(5, 20);
    private yTopRange = new Range(-smallestYDistanceToImageCenter, -biggestYDistanceToImageCenter);
    private yBottomRange = new Range(this.yTopRange.max*(-1), this.yTopRange.min*(-1));

    constructor(previousPosition?: PositionData){
        this.position = this.getCurrentPosition(previousPosition);
        this.coordinate = this.getCoordinates(this.position, previousPosition);
        this.length = this.entryLength.randomIntInRange;

        const hasEmptyStepAfterEntry = Math.random() < 0.2;
        if (hasEmptyStepAfterEntry){
            this.emptyStepAfterEntry = {
                length: this.gapLength.randomIntInRange,
                coordinate: new Coordinate(this.coordinate.x + this.length, new Range(-smallestYDistanceToImageCenter*0.8, smallestYDistanceToImageCenter*0.8).randomIntInRange)
            }
        }
    }

    private randomPosition(): EPosition {
        const values = Object.values(EPosition).filter(v => typeof v === 'number') as EPosition[];
        return values[Math.floor(Math.random() * values.length)];
    }

    private getCurrentPosition(previousPosition?: PositionData): EPosition {
        if (!previousPosition){
            return this.randomPosition();
        }
        return previousPosition.position === EPosition.bottom
            ? EPosition.top
            : EPosition.bottom;
    }

    private getCoordinates(currentPosition: EPosition, previousPosition?: PositionData): Coordinate {
        const randomY = currentPosition === EPosition.bottom
            ? this.yBottomRange.randomIntInRange
            : this.yTopRange.randomIntInRange;
        
        if (!previousPosition){
            return new Coordinate(sideDistanceToNearestEntry, randomY);
        }

        let currentX = previousPosition.coordinate.x + previousPosition.length
        if (previousPosition.emptyStepAfterEntry){
            currentX += previousPosition.emptyStepAfterEntry.length;
        }
        return new Coordinate(currentX, randomY);
    }
}

enum EPosition {
    top,
    bottom
}

enum ESide {
    left,
    right
}

class Coordinate {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

class Range {
    min: number;
    max: number;
    randomIntInRange: number;

    constructor(number1: number, number2: number){
        this.min = number1 < number2 ? number1 : number2;
        this.max = number1 < number2 ? number2 : number1;
        this.randomIntInRange = this.randomInt(this.min, this.max);
    }

    private randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export class TimeLineCreator {
    imageContainer: ElementRef<HTMLDivElement>;
    entries: EntryInformation[];
    private svgNS = 'http://www.w3.org/2000/svg';
    
    constructor(imageContainer: ElementRef<HTMLDivElement>, timeLineEntries: TimeLineEntry[]){
        this.imageContainer = imageContainer;
        const timeEntries: EntryInformation[] = [];
        for (let index = 0; index < timeLineEntries.length; index++){
            if (index === 0) {
                timeEntries.push(new EntryInformation(timeLineEntries[index], index + 1))
                continue;
            }
            const previousPosition = timeEntries[index - 1].position;
            timeEntries.push(new EntryInformation(timeLineEntries[index], index + 1, previousPosition));
        }
        this.entries = this.updateYValueToHaveFullImageSize(timeEntries);
    }

    public drawTimeLine(){
        if (!this.entries.length)
            return;

        const svg = document.createElementNS(this.svgNS, 'svg');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', this.calculateBoundingBox());

        for (let i = 0; i < this.entries.length; i++){
            if (i === 0){
                var side = this.drawSideStroke(ESide.left);
                this.imageContainer.nativeElement.appendChild(side);
            }

            const entry = this.entries[i];
            this.drawEntry(entry, entry);

            if (entry.position.emptyStepAfterEntry){
                var emptyStep = this.drawEmptyStep(this.entries[i]);
                this.imageContainer.nativeElement.appendChild(emptyStep);
            }
            if (i === this.entries.length && this.getMostRightEntry().content.to){
                var side = this.drawSideStroke(ESide.right);
                this.imageContainer.nativeElement.appendChild(side);
            }
        }
        this.imageContainer.nativeElement.appendChild(svg);
    }


    private calculateBoundingBox(): string {
        const topLeftpoint = {
            x: 0,
            y: -160
        };
        const mostRightEntry = this.getMostRightEntry();
        const lastEntryHasEnded = !!mostRightEntry.content.to;
        let xLength = mostRightEntry.position.coordinate.x + mostRightEntry.position.length;
        if (lastEntryHasEnded)
            xLength += sideDistanceToNearestEntry;
        return `${topLeftpoint.x} ${topLeftpoint.y} ${xLength} 320`;
    }

    private getMostLeftEntry(): EntryInformation {
        return this.entries.reduce((max, current) =>
            current.position.coordinate.x > max.position.coordinate.x ? max : current,
            this.entries[0])
    }

    private getMostRightEntry(): EntryInformation {
        return this.entries.reduce((max, current) =>
            current.position.coordinate.x > max.position.coordinate.x ? current : max,
            this.entries[0])
    }

    private updateYValueToHaveFullImageSize(entries: EntryInformation[]): EntryInformation[] {
        const bottoms = entries.filter(e => e.position.position === EPosition.bottom);
        const tops = entries.filter(e => e.position.position === EPosition.top);

        if (bottoms.length) {
            const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
            randomBottom.position.coordinate.y = biggestYDistanceToImageCenter;
        }

        if (tops.length) {
            const randomTop = tops[Math.floor(Math.random() * tops.length)];
            randomTop.position.coordinate.y = -biggestYDistanceToImageCenter;
        }

        return entries;
    }
}