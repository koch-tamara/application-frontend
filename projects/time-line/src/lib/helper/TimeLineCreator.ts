import { ElementRef } from "@angular/core";
import { LineCreator } from "./LineCreator";
import { TimeLineHelper } from "./TimeLineHelper";
import { ContentCreator } from "./ContentCreator";
import { FileDownloadService } from "../services/file-download.service";
import { Content } from "../classes/Content";
import { TimeLineEntry } from "../classes/TimeLineEntry";


export class TimeLineCreator {
    private imageContainer: ElementRef<HTMLDivElement>;
    private entries: TimeLineEntry[];
    private helper = new TimeLineHelper();
    private readonly fileDownloadService;
    private lineCreator = new LineCreator();
    private contentCreator;

    constructor(imageContainer: ElementRef<HTMLDivElement>, timeLineEntries: Content[], fileDownloadService: FileDownloadService) {
        this.imageContainer = imageContainer;
        this.entries = this.helper.calculateContentPositions(timeLineEntries);
        this.fileDownloadService = fileDownloadService;
        this.contentCreator = new ContentCreator(this.fileDownloadService);
    }

    drawImage(name?: string) {
        if (!this.entries.length)
            return;

        const svg = this.helper.createSvgElement(this.entries, name);
        this.drawLines(svg);
        this.drawContent(svg);
    }

    private drawLines(svg: Element) {
        for (let i = 0; i < this.entries.length; i++) {
            const isLast = i + 1 === this.entries.length;
            this.lineCreator.drawLine(this.entries, i, isLast, svg);
        }
        this.imageContainer.nativeElement.appendChild(svg);
    }

    private drawContent(svg: Element) {
        for (let i = 0; i < this.entries.length; i++) {
            this.contentCreator.drawContent(this.entries, i, svg);
        }
    }
}