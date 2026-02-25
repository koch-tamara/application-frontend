import { BezierData } from "../classes/BezierData";
import { Coordinates } from "../classes/Coordinates";
import { Position } from "../classes/Position";
import { TimeLineEntry } from "../classes/TimeLineEntry";
import { EBezierDirection } from "../enums/EBezierDirection";
import { ELineDrawingDirection } from "../enums/EDrawingDirection";
import { EImagePosition } from "../enums/EImagePosition";
import { BezierRadius, SideDistanceToNearestEntry, StrokeDefaultColor, StrokeHighlightColor } from "./TimeLineDefaults";
import { TimeLineHelper } from "./TimeLineHelper";

export class LineCreator {
    private svgNS = 'http://www.w3.org/2000/svg';
    private helper = new TimeLineHelper();

    public drawLine(entries: TimeLineEntry[], i: number, isLast: boolean, svg: Element): void {
        if (i === 0)
            this.drawSideLine(svg, entries, false);

        this.drawEntryLine(svg, entries[i], i > 0 ? entries[i - 1].GetMostRightCoordinate() : new Coordinates(SideDistanceToNearestEntry, 0), isLast, i);

        if (i !== 0 && isLast && this.helper.getMostRightEntry(entries).content.to)
            this.drawSideLine(svg, entries, true);
    }

    private drawEntryLine(svg: Element, entry: TimeLineEntry, startCoordinates: Coordinates, isLast: boolean, i: number): void {
        const { coordinates: coordinate } = entry.data;

        var groupElement = this.helper.createSvgGroupElement(`entry-${i+1}`);
        this.addLeftVerticalLine(entry, startCoordinates, groupElement);
        this.addHorizontalLine(entry, isLast, coordinate, groupElement);

        if (isLast && !entry.content.to) {
            svg.appendChild(groupElement);
            return;
        }

        this.addRightVerticalLine(entry, new Coordinates(coordinate.x + entry.data.length, coordinate.y), groupElement);
        this.addEmptyStepIfAny(entry, groupElement);
        svg.appendChild(groupElement);
    }

    private addLeftVerticalLine(entry: TimeLineEntry, coordinates: Coordinates, groupElement: Element): void {
        var drawingDirection = entry.data.position === EImagePosition.top
            ? ELineDrawingDirection.BottomToTop
            : ELineDrawingDirection.TopToBottom;
        let length = Math.abs(coordinates.y - entry.data.coordinates.y);
        var leftVerticalLine = this.createLineElement(new Position(coordinates, length), drawingDirection);
        groupElement.appendChild(leftVerticalLine);
    }
    
    private addHorizontalLine(entry: TimeLineEntry, isLast: boolean, coordinate: Coordinates, groupElement: Element) {
        const bezierInformation = this.helper.getBezierEntryInformation(entry, isLast, !!entry.content.to);
        var horizontalLine = this.createLineElement(
            new Position(coordinate, entry.data.length),
            ELineDrawingDirection.LeftToRight,
            false,
            bezierInformation);
        groupElement.appendChild(horizontalLine);
    }
    
    private addRightVerticalLine(entry: TimeLineEntry, coordinates: Coordinates, groupElement: Element) {
        const length = !!entry.data.emptyStepAfterEntry
            ? Math.abs(coordinates.y - entry.data.emptyStepAfterEntry.coordinates.y)
            : Math.abs(coordinates.y);
        const drawingDirection = entry.data.position === EImagePosition.bottom 
            ? ELineDrawingDirection.BottomToTop 
            : ELineDrawingDirection.TopToBottom;
        const rightVerticalLine = this.createLineElement(new Position(coordinates, length), drawingDirection);
        groupElement.appendChild(rightVerticalLine);
    }
    
    private addEmptyStepIfAny(entry: TimeLineEntry, groupElement: Element) {
        if (!entry.data.emptyStepAfterEntry)
            return;

        var position = entry.data.emptyStepAfterEntry;
        var bezierStepInformation = this.helper.getBezierStepInformation(entry.data.position);
        var emptyStepLine = this.createLineElement(position, ELineDrawingDirection.LeftToRight, true, bezierStepInformation);
        groupElement.appendChild(emptyStepLine);
    }

    private drawSideLine(svg: Element, entries: TimeLineEntry[], atEnd: boolean): void {
        let coordinates = new Coordinates(0, 0);
        let length: number = SideDistanceToNearestEntry;
        
        if (atEnd) {
            const mostRightEntry = this.helper.getMostRightEntry(entries);
            coordinates.x = mostRightEntry.GetMostRightCoordinate().x;
        }
        
        const bezierInfo = this.helper.getBezierSideInformation(entries, atEnd);
        var line = this.createLineElement(new Position(coordinates, length), ELineDrawingDirection.LeftToRight, true, bezierInfo);
        svg.appendChild(line);
    }
        
    private createLineElement(position: Position, direction: ELineDrawingDirection, isEmptyStep?: boolean, bezierInfo?: BezierData): Element {
        const line = document.createElementNS(this.svgNS, 'path');
        line.setAttribute('d', this.createLinePath(position, direction, bezierInfo));
        line.setAttribute('stroke', direction === ELineDrawingDirection.LeftToRight && !isEmptyStep ? StrokeHighlightColor : StrokeDefaultColor);
        line.setAttribute('stroke-width', '2');
        line.setAttribute('fill', 'none');
        return line;
    }

    private createLinePath(position: Position, drawingDirection: ELineDrawingDirection, bezierInfo?: BezierData): string {
        const { coordinates, length } = position;
        const { x, y } = coordinates;
        const yRadius = BezierRadius;
        
        if (drawingDirection === ELineDrawingDirection.BottomToTop) {
            return `M ${x} ${y - yRadius} L ${x} ${y - length + yRadius}`;
        }
        
        if (drawingDirection === ELineDrawingDirection.TopToBottom) {
            return `M ${x} ${y + yRadius} L ${x} ${y + length - yRadius}`;
        }
        
        const xRadius = Math.min(BezierRadius, length / 2);
        const { left: leftBezier, right: rightBezier } = bezierInfo ?? {};
        const path: string[] = [];
        
        if (leftBezier !== undefined){
            const bezierY = leftBezier === EBezierDirection.upwards
                ? y - yRadius
                : y + yRadius;
            path.push(`M ${x} ${bezierY} Q ${x} ${y} ,${x + xRadius} ${y}`); 
        } else {
            path.push(`M ${x} ${y}`);
        }

        if (rightBezier !== undefined) {
            const bezierY = rightBezier === EBezierDirection.upwards
                ? y - yRadius
                : y + yRadius;
            path.push(`L ${x + length - xRadius} ${y} Q ${x + length} ${y}, ${x + length} ${bezierY}`);
        } else {
            path.push(`L ${x + length} ${y}`);
        }

        return path.join(' ');
    }

}