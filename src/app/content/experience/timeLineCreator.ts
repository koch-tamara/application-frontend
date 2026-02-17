import { ElementRef } from "@angular/core";
import { TimeLineEntry } from "./experience.component";

const biggestYDistanceToImageCenter = 100;
const smallestYDistanceToImageCenter = 40;
const sideDistanceToNearestEntry = 50;

const strokeDefaultColor = '#808080';
const strokeHighlightColor = '#D8754D';

class EntryInformation {
    content: TimeLineEntry;
    position: PositionData;
    id: number;
    constructor(content: TimeLineEntry, id: number, previousPosition?: PositionData){
        this.content = content;
        this.position = new PositionData(previousPosition);
        this.id = id;
    }

    public GetMostRightCoordinate(): Coordinate {
        const position = !!this.position.emptyStepAfterEntry
            ? this.position.emptyStepAfterEntry
            : this.position;
        return new Coordinate(position.coordinate.x + position.length, position.coordinate.y);
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
    private gapLength = new Range(10, 25);
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

enum DrawDirection {
    toTop,
    toBottom,
    toRight
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

    public drawTimeLine(name?: string){
        if (!this.entries.length)
            return;

        const svg = document.createElementNS(this.svgNS, 'svg');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', this.calculateBoundingBox());

        if (name) {
            svg.setAttribute('id', name);
        }

        for (let i = 0; i < this.entries.length; i++){
            const isLast = i + 1 === this.entries.length;
            this.drawTimeLineEntry(i, isLast, svg)
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

    private drawTimeLineEntry(i: number, isLast: boolean, svg: Element): void {
        if (i === 0){
            this.drawSideStroke(svg);
        }

        this.drawEntry(svg, this.entries[i], i > 0 ? this.entries[i - 1].GetMostRightCoordinate() : new Coordinate(sideDistanceToNearestEntry, 0), isLast);

        if (i !== 0 && isLast && this.getMostRightEntry().content.to){
            this.drawSideStroke(svg, this.entries[i-1]);
        }
    }

    private drawEntry(svg: Element, entry: EntryInformation, startCoordinates: Coordinate, isLast: boolean): void {
        var entryContainer = document.createElementNS(this.svgNS, 'g');
        entryContainer.setAttribute('id', entry.content.where.name);

        var drawingDirection = entry.position.position === EPosition.top
            ? DrawDirection.toTop
            : DrawDirection.toBottom;
        let length = Math.abs(startCoordinates.y - entry.position.coordinate.y);
        var toHorizontalLine = this.drawLine(startCoordinates, drawingDirection, length);
        entryContainer.appendChild(toHorizontalLine);

        startCoordinates = new Coordinate(startCoordinates.x, drawingDirection === DrawDirection.toTop
            ? startCoordinates.y - length
            : startCoordinates.y + length
        );
        var highlightLine = this.drawLine(startCoordinates, DrawDirection.toRight, entry.position.length);
        entryContainer.appendChild(highlightLine);

        if (isLast && !entry.content.to){
            svg.appendChild(entryContainer);
            return;
        }

        startCoordinates = new Coordinate(startCoordinates.x + entry.position.length, startCoordinates.y);
        length = !!entry.position.emptyStepAfterEntry
            ? Math.abs(startCoordinates.y - entry.position.emptyStepAfterEntry.coordinate.y)
            : Math.abs(startCoordinates.y);
        drawingDirection = drawingDirection === DrawDirection.toBottom ? DrawDirection.toTop : DrawDirection.toBottom;
        var afterHighlightLine = this.drawLine(startCoordinates, drawingDirection, length);
        entryContainer.appendChild(afterHighlightLine);

        if (entry.position.emptyStepAfterEntry){
            var position = entry.position.emptyStepAfterEntry;
            var emptyStepLine = this.drawLine(position.coordinate, DrawDirection.toRight, position.length, true);
            entryContainer.appendChild(emptyStepLine);
        }
        svg.appendChild(entryContainer);
    }

    private drawLine(start: Coordinate, direction: DrawDirection, length: number, isEmptyStep?: boolean): Element {
        
        const line = document.createElementNS(this.svgNS, 'path');
        line.setAttribute('d', this.createPath(start, length, direction));
        line.setAttribute('stroke', direction === DrawDirection.toRight && !isEmptyStep ? strokeHighlightColor : strokeDefaultColor);
        line.setAttribute('stroke-width', '2');
        line.setAttribute('fill', 'none');
        return line;
    }

    private drawSideStroke(svg: Element, leftEntry?: EntryInformation): void {
        const leftCornerCoordinates = !leftEntry
            ? new Coordinate(0, 0)
            : leftEntry.GetMostRightCoordinate();
        const length: number = !leftEntry
            ? sideDistanceToNearestEntry
            : leftEntry.position.length;
        
        const sideStroke = document.createElementNS(this.svgNS, 'path');
        sideStroke.setAttribute('d', this.createPath(leftCornerCoordinates, length));
        sideStroke.setAttribute('stroke', strokeDefaultColor);
        sideStroke.setAttribute('stroke-width', '2');
        sideStroke.setAttribute('fill', 'none');
        svg.appendChild(sideStroke);
    }

    private createPath(coordinates: Coordinate, length: number, goTo: DrawDirection = DrawDirection.toRight): string {
        
        switch (goTo){
            case DrawDirection.toTop:
                return `M ${coordinates.x} ${coordinates.y} L ${coordinates.x} ${coordinates.y - length}`;
            case DrawDirection.toBottom:
                return `M ${coordinates.x} ${coordinates.y} L ${coordinates.x} ${coordinates.y + length}`;
            default:
               return `M ${coordinates.x} ${coordinates.y} L ${coordinates.x + length} ${coordinates.y}`; 
        }
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