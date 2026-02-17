import { BezierData } from "./classes/BezierData";
import { TimeLineEntry } from "./classes/TimeLineEntry";
import { EBezierDirection } from "./enums/EBezierDirection";
import { EImagePosition } from "./enums/EImagePosition";
import { Content } from "./interfaces/Content";
import { BiggestYDistanceToImageCenter, imageHeight, SideDistanceToNearestEntry } from "./TimeLineDefaults";

export class TimeLineHelper {
    private svgNS = 'http://www.w3.org/2000/svg';

    createSvgElement(entries: TimeLineEntry[], name?: string) {
        const svg = document.createElementNS(this.svgNS, 'svg');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', this.calculateBoundingBox(entries));

        if (name) {
            svg.setAttribute('id', name);
        }
        return svg;
    }

    createLineContainer(entry: TimeLineEntry) {
        var groupElement = document.createElementNS(this.svgNS, 'g');
        groupElement.setAttribute('id', entry.content.where.name);
        return groupElement;
    }

    getMostLeftEntry(entries: TimeLineEntry[]): TimeLineEntry {
        return entries.reduce((min, current) =>
            current.data.coordinates.x > min.data.coordinates.x ? min : current,
            entries[0])
    }

    getMostRightEntry(entries: TimeLineEntry[]): TimeLineEntry {
        return entries.reduce((max, current) =>
            current.data.coordinates.x > max.data.coordinates.x ? current : max,
            entries[0])
    }

    calculateContentPositions(content: Content[]):TimeLineEntry[] {
        const timeEntries: TimeLineEntry[] = [];
        for (let index = 0; index < content.length; index++) {
            const isLastEntry = index + 1 === content.length;
            if (index === 0) {
                timeEntries.push(new TimeLineEntry(content[index], index + 1, isLastEntry))
                continue;
            }
            const previousPosition = timeEntries[index - 1].data;
            timeEntries.push(new TimeLineEntry(content[index], index + 1, isLastEntry, previousPosition));
        }
        return this.updateCoordinatesToHaveFullImageSize(timeEntries);
    }

    getBezierSideInformation(entries: TimeLineEntry[], atEnd: boolean): BezierData {

        if (atEnd) {
            const position = this.getMostRightEntry(entries).data.position;
            return new BezierData(position === EImagePosition.top ? EBezierDirection.upwards : EBezierDirection.downwards);
        }

        const position = this.getMostLeftEntry(entries).data.position;
        return new BezierData(undefined, position === EImagePosition.top ? EBezierDirection.upwards : EBezierDirection.downwards);
    }

    getBezierEntryInformation(entry: TimeLineEntry, isLast: boolean, hasFinished: boolean): BezierData {

        if (entry.data.position === EImagePosition.bottom){
            return new BezierData(EBezierDirection.upwards, isLast && !hasFinished ? undefined : EBezierDirection.upwards);
        }

        return new BezierData(EBezierDirection.downwards, isLast && !hasFinished ? undefined : EBezierDirection.downwards);
    }

    getBezierStepInformation(imagePostionOfLeftEntry: EImagePosition): BezierData {

        return imagePostionOfLeftEntry === EImagePosition.top
            ? new BezierData(EBezierDirection.upwards, EBezierDirection.downwards)
            : new BezierData(EBezierDirection.downwards, EBezierDirection.upwards);
    }

    private calculateBoundingBox(entries: TimeLineEntry[]): string {
    
        const mostRightEntry = this.getMostRightEntry(entries);
        let xLength = mostRightEntry.data.coordinates.x + mostRightEntry.data.length;
        
        if (mostRightEntry.content.to)
            xLength += SideDistanceToNearestEntry;

        return `0 ${- imageHeight/2} ${xLength} ${imageHeight}`;
    }

    private updateCoordinatesToHaveFullImageSize(entries: TimeLineEntry[]): TimeLineEntry[] {
        const bottoms = entries.filter(e => e.data.position === EImagePosition.bottom);
        const tops = entries.filter(e => e.data.position === EImagePosition.top);

        if (bottoms.length) {
            const randomBottomEntry = bottoms[Math.floor(Math.random() * bottoms.length)];
            randomBottomEntry.data.coordinates.y = BiggestYDistanceToImageCenter;
        }

        if (tops.length) {
            const randomTopEntry = tops[Math.floor(Math.random() * tops.length)];
            randomTopEntry.data.coordinates.y = -BiggestYDistanceToImageCenter;
        }

        return entries;
    }
}