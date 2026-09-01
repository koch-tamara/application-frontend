import { Component, Input } from '@angular/core';
import { Event } from 'shared-models';

@Component({
  imports: [],
  selector: 'lib-default-time-line',
  styleUrl: './default-time-line.scss',
  templateUrl: './default-time-line.html',
})
export class DefaultTimeLine {
  @Input({ required: true }) events: Event[] = [];
}
