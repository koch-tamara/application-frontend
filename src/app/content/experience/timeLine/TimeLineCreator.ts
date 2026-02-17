import { ElementRef } from "@angular/core";
import { TimeLineEntry } from "./classes/TimeLineEntry";
import { Content } from "./interfaces/Content";
import { LineCreator } from "./LineCreator";
import { TimeLineHelper } from "./TimeLineHelper";
import { ContentCreator } from "./ContentCreator";


export class TimeLineCreator {
    private imageContainer: ElementRef<HTMLDivElement>;
    private entries: TimeLineEntry[];
    private helper = new TimeLineHelper();
    private lineCreator = new LineCreator();
    private contentCreator = new ContentCreator();

    constructor(imageContainer: ElementRef<HTMLDivElement>, timeLineEntries: Content[]) {
        this.imageContainer = imageContainer;
        this.entries = this.helper.calculateContentPositions(timeLineEntries);
    }

    public drawImage(name?: string) {
        if (!this.entries.length)
            return;

        const svg = this.helper.createSvgElement(this.entries, name);
        
        for (let i = 0; i < this.entries.length; i++) {
            const isLast = i + 1 === this.entries.length;
            this.lineCreator.drawLine(this.entries, i, isLast, svg);
            this.contentCreator.drawContent(this.entries, i, isLast, svg);
        }
        this.imageContainer.nativeElement.appendChild(svg);
    }
}