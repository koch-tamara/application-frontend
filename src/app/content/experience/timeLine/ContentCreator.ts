import { Coordinates } from "./classes/Coordinates";
import { TimeLineEntry } from "./classes/TimeLineEntry";
import { EImagePosition } from "./enums/EImagePosition";
import { Content } from "./interfaces/Content";
import { ContentHeight, EntryMinLength, PaddingToLines, StrokeDefaultColor, StrokeHighlightColor } from "./TimeLineDefaults";
import { TimeLineHelper } from "./TimeLineHelper";

export class ContentCreator {
    private helper = new TimeLineHelper();

    drawContent(entries: TimeLineEntry[], i: number, svg: Element) {
        const entry = entries[i];
        // ToDo: clean up code
        var entryElement = svg.querySelector(`#entry-${i + 1}`) as SVGGraphicsElement;
        if (!entryElement)
            return;

        const isLastEntryAndNotFinished = i + 1 === entries.length && !entry.content.to;
        var contentElement = this.createContentElement(entry, entryElement.getBBox(), isLastEntryAndNotFinished);
        entryElement.appendChild(contentElement);
    }

    private createContentElement(entry: TimeLineEntry, bbox: DOMRect, isLastEntryAndNotFinished: boolean): Element {
        const width = isLastEntryAndNotFinished
            ? entry.data.length
            : entry.data.length + EntryMinLength;
        const centerCoordinates = this.getTopLeftCoordinates(entry.data.position, bbox, width, entry.data.length);

        // ToDo: calculate maximum height of content
        var foreignElement = this.helper.createForeignObject(centerCoordinates, width, ContentHeight);
        this.addContent(foreignElement, entry.content, entry.data.position);
        return foreignElement;
    }

    private getTopLeftCoordinates(position: EImagePosition, bbox: DOMRect, width: number, entryLength: number): Coordinates {
        const x = bbox.x + entryLength / 2 - width / 2
        const y = position === EImagePosition.bottom
            ? bbox.y + bbox.height + PaddingToLines
            : bbox.y - ContentHeight - PaddingToLines;

        return new Coordinates(x, y);
    }

    private addContent(foreignElement: Element, content: Content, position: EImagePosition) {
        const XHTML_NS = "http://www.w3.org/1999/xhtml";

        const container = document.createElementNS(XHTML_NS, "div");
        container.setAttribute("xmlns", XHTML_NS);

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
            const label = document.createElementNS(XHTML_NS, "div");
            label.textContent = content.label;
            // Todo: add line break
            label.style.fontWeight = "bold";
            label.style.textAlign = "center";
            label.style.color = StrokeHighlightColor;
            container.appendChild(label);
        }

        const where = document.createElementNS(XHTML_NS, "div");
        where.innerHTML = `
            <strong style="font-size:7pt">${content.where.name}</strong><br/>
            <span style="color:gray; font-size:7pt">${content.where.address}</span>
        `;
        where.style.textAlign = "center";
        container.appendChild(where);

        if (content.completion) {
            const completion = document.createElementNS(XHTML_NS, "div");
            completion.textContent = content.completion;
            completion.style.fontStyle = "italic";
            completion.style.color = StrokeHighlightColor;
            completion.style.fontSize = "9pt";
            completion.style.textAlign = "center";
            completion.style.marginTop = "0.25rem";
            container.appendChild(completion);
        }

        const date = document.createElementNS(XHTML_NS, "div");
        date.textContent = this.getDisplayedTimeRange(content.from, content.to);
        date.style.position = "relative";
        date.style.height = "1.25rem";
        date.style.color = StrokeHighlightColor;
        date.style.fontWeight = "bold";
        date.style.display = "flex";
        date.style.alignItems = "center";
        date.style.justifyContent = "center";
        if (content.downloads?.length) {
            const button = this.createDownloadButton();
            date.appendChild(button);
        }
        container.appendChild(date);


        foreignElement.appendChild(container);
    }

    private createDownloadButton() {
        const SVG_NS = "http://www.w3.org/2000/svg";
        const svgIcon = document.createElementNS(SVG_NS, "svg");
        svgIcon.setAttribute("viewBox", "0 0 24 24");
        svgIcon.setAttribute("width", "20");
        svgIcon.setAttribute("height", "20");

        svgIcon.style.cursor = "pointer";
        svgIcon.style.position = "absolute";
        svgIcon.style.right = "0.25rem";
        svgIcon.style.bottom = "0";
        svgIcon.style.borderRadius = "8px";

        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", "M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z");
        path.setAttribute("fill", StrokeHighlightColor);
        svgIcon.appendChild(path);

        svgIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            console.log("Download clicked!");
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
            return 'seit ' + this.getMonthYear(from);
        }

        const fromYear = from.getFullYear();
        const toYear = to.getFullYear();

        return fromYear === toYear ? fromYear.toString() : `${fromYear}-${toYear}`;
    }

    private getMonthYear(from: Date): string {
        const month = from.getMonth();
        const year = from.getFullYear();
        return month + '/' + year;
    }
}