import { Component, Input, signal } from '@angular/core';
import { ImageInformation } from './data';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-page-layout',
  imports: [NgClass],
  templateUrl: "./page-layout.html",
  styleUrl: "./page-layout.scss",
})
export class PageLayout {
  @Input() imageInformation?: ImageInformation;
  @Input() addPadding: boolean = true;
}
