import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Event } from 'shared-models';
import { TimeLineCreator } from './helper/TimeLineCreator';
import { FileDownloadService } from './services/file-download.service';

@Component({
  selector: 'lib-time-line',
  imports: [],
  standalone: true,
  template: `<div class="time-line-container" #timelineContainer></div>`,
  styles: `

    .time-line-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 100%;
      max-height: 100%;
    }
  `,
})
export class TimeLine {
  @ViewChild('timelineContainer', { static: true }) timelineContainer!: ElementRef<HTMLDivElement>;

  private _content!: Event[];
  @Input({ required: true }) set events(value: Event[]) {
    this._content = value;
    new TimeLineCreator(
      this.timelineContainer,
      this.events,
      this.fileDownloadService).drawImage();
  };
  get events() {
    return this._content;
  }
  private fileDownloadService = inject(FileDownloadService);

}
