import { Component, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ImageInformation, PageLayout } from "../../projects/page-layout/src/public-api";
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';

export class Tab {
  id: string;
  label: string;

  constructor(id: string) {
    this.id = id;
    this.label = this.pathLabelMapping.get(id) ?? '--';
  }

  private pathLabelMapping: Map<string, string> = new Map([
    ['introduction', 'Vorstellung'],
    ['experience', 'Erfahrung'],
    ['education', 'Ausbildung'],
    ['skills', 'Fähigkeiten'],
    ['documents', 'Dokumente'],
    ['about-me', 'Über mich'],
    ['contact', 'Kontaktdaten']
  ]);
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    RouterOutlet, 
    PageLayout, 
    RouterLinkWithHref, 
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  title = 'application-frontend';
  tabs = routes
  .filter(route => typeof route.path === 'string' &&
    route.path !== '**' &&
    route.path !== '')
  .map(route => new Tab(route.path!))

  signatureImage: ImageInformation = {
    altText: 'Signature',
    path: 'signature.svg',
  }
}
