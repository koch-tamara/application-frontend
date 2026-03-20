import { Injectable } from "@angular/core";
import { FileDownloadService } from "../services/file-download.service";
import { EntryMinLength, StrokeDefaultColor, StrokeHighlightColor, ImageHeight } from "./TimeLineDefaults";
import { TimeLineHelper } from "./TimeLineHelper";
import { TimeLineEntry } from "../classes/TimeLineEntry";
import { Content } from "../classes/Content";
import { Coordinates } from "../classes/Coordinates";
import { MetaData } from "../classes/MetaData";
import { EImagePosition } from "../enums/EImagePosition";
import { EHtmlTag } from "../enums/EHtmlElement";
import { DownloadInformation } from "../classes/DownloadInformation";

@Injectable()
export class ContentCreator {
    private helper = new TimeLineHelper();
    constructor(private fileDownloadService: FileDownloadService) { }

    drawContent(entries: TimeLineEntry[], i: number, svg: Element) {
        const entry = entries[i];
        // ToDo: clean up code
        var entryElement = svg.querySelector(`#entry-${i + 1}`) as SVGGraphicsElement;
        if (!entryElement)
            return;

        const isLastEntryAndNotFinished = i + 1 === entries.length && !entry.content.to;
        var contentElement = this.createContentElement(entry, isLastEntryAndNotFinished);

        entry.data.position === EImagePosition.bottom
            ? entryElement.appendChild(contentElement)
            : entryElement.prepend(contentElement);
    }

    private createContentElement(entry: TimeLineEntry, isLastEntryAndNotFinished: boolean): Element {
        const width = isLastEntryAndNotFinished
            ? entry.data.length
            : entry.data.length + EntryMinLength;
        const centerCoordinates = this.getTopLeftCoordinates(width, entry.data);
        const height = this.getContentHeight(entry.data.coordinates.y);

        var foreignElement = this.helper.createSvgForeignObject(centerCoordinates, width, height);
        this.addContent(foreignElement, entry.content, entry.data.position);
        return foreignElement;
    }

    private getContentHeight(y: number): number {
        return Math.abs(ImageHeight / 2 - Math.abs(y));
    }

    private getTopLeftCoordinates(width: number, data: MetaData): Coordinates {
        const x = data.coordinates.x + data.length / 2 - width / 2
        const y = data.position === EImagePosition.bottom
            ? data.coordinates.y
            : - ImageHeight / 2;

        return new Coordinates(x, y);
    }

    private addContent(foreignElement: Element, content: Content, position: EImagePosition) {

        const container = this.helper.createHtmlElement(EHtmlTag.div);

        container.style.fontFamily = "myFont";
        container.style.fontSize = "10px";
        container.style.color = StrokeDefaultColor;
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = position === EImagePosition.bottom
            ? "flex-start"
            : "flex-end";

        container.style.position = "relative";

        if (content.label) {
            const label = this.helper.createHtmlElement(EHtmlTag.span);
            label.textContent = content.label;
            label.style.marginTop = '0.5rem';
            label.style.wordBreak = "break-word";
            label.style.overflowWrap = "break-word";
            label.style.hyphens = "auto";
            label.style.fontWeight = "bold";
            label.style.textAlign = "center";
            label.style.color = StrokeHighlightColor;
            container.appendChild(label);
        }

        const where = this.helper.createHtmlElement(EHtmlTag.div);
        where.innerHTML = `
            <strong style="font-size:7pt">${content.where.name}</strong><br/>
            <span style="color:gray; font-size:7pt; word-break: break-word">${content.where.address}</span>
        `;
        where.style.textAlign = "center";
        if (!content.label) {
            where.style.marginTop = "0.5rem";
        }
        container.appendChild(where);

        if (content.completion) {
            const completion = this.helper.createHtmlElement(EHtmlTag.span);
            completion.textContent = content.completion;
            completion.style.fontStyle = "italic";
            completion.style.color = StrokeHighlightColor;
            completion.style.fontSize = "9pt";
            completion.style.wordBreak = "break-word";
            completion.style.overflowWrap = "break-word";
            completion.style.hyphens = "auto";
            completion.style.textAlign = "center";
            completion.style.marginTop = "0.25rem";
            container.appendChild(completion);
        }

        const date = this.helper.createHtmlElement(EHtmlTag.span);
        date.textContent = this.getDisplayedTimeRange(content.from, content.to);
        date.style.position = "relative";
        date.style.height = "1.25rem";
        date.style.color = StrokeHighlightColor;
        date.style.fontWeight = "bold";
        date.style.display = "flex";
        date.style.alignItems = "center";
        date.style.justifyContent = "center";
        date.style.marginBottom = "0.25rem";
        if (content.downloads?.length) {
            const button = this.createDownloadButton(content.downloads);
            date.appendChild(button);
        }
        container.appendChild(date);
        foreignElement.appendChild(container);
    }

    private createDownloadButton(downloads: DownloadInformation[]) {
        const svgIcon = this.helper.createSvgElement() as HTMLElement;
        svgIcon.setAttribute("viewBox", "0 0 24 24");
        svgIcon.setAttribute("width", "20");
        svgIcon.setAttribute("height", "20");

        svgIcon.style.cursor = "pointer";
        svgIcon.style.position = "absolute";
        svgIcon.style.right = "0.25rem";
        svgIcon.style.bottom = "0";
        svgIcon.style.borderRadius = "8px";

        const d = "M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z";
        const path = this.helper.createSvgPathElement(d);
        path.setAttribute("fill", StrokeHighlightColor);
        svgIcon.appendChild(path);

        if (downloads.length > 1) {
            // ToDo: add Number of downloads to download icon
        }

        svgIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            this.fileDownloadService.downloadFiles(downloads);
        });

        svgIcon.addEventListener("mouseenter", () => {
            svgIcon.style.backgroundColor = StrokeHighlightColor + '30';
        });
        svgIcon.addEventListener("mouseleave", () => {
            svgIcon.style.backgroundColor = "transparent";
        });

        return svgIcon;
    }

    private getDisplayedTimeRange(from: Date, to?: Date): string {
        if (!to) {
            // ToDo: add translation
            const isPast = from < new Date();
            const prefix = isPast
                ? `seit`
                : `ab`;

            return `${prefix} ${this.getMonthYear(from)}`;
        }

        const fromYear = from.getFullYear();
        const toYear = to.getFullYear();

        return fromYear === toYear ? fromYear.toString() : `${fromYear} - ${toYear}`;
    }

    private getMonthYear(from: Date): string {
        const month = from.getMonth() + 1;
        const year = from.getFullYear();
        return month + '/' + year;
    }
}