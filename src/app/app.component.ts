import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { ImageInformation, PageLayout } from 'page-layout';

export class Tab {
  id: string;
  label: string;

  constructor(id: string) {
    this.id = id;
    this.label = this.pathLabelMapping.get(id) ?? '--';
  }

  private pathLabelMapping: Map<string, string> = new Map([
    ['introduction', $localize`:@@tabs.introduction:Vorstellung`],
    ['experience', $localize`:@@tabs.experience:Erfahrung`],
    ['education', $localize`:@@tabs.education:Ausbildung`],
    ['skills', $localize`:@@tabs.skills:Fähigkeiten`],
    ['documents', $localize`:@@tabs.documents:Dokumente`],
    ['about-me', $localize`:@@tabs.about-me:Über mich`],
    ['contact', $localize`:@@tabs.contact:Kontakt`]
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
