import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { ImageInformation, PageLayout } from 'page-layout';
import { Tab } from './data/tab';
import { Subscription } from 'rxjs';
import { DataService } from './services/data.service';
import { ApplicationContent } from './data/data';

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
  tabs = routes
  .filter(route => 
    typeof route.path === 'string' &&
    route.path !== '**' &&
    route.path !== '')
  .map(route => new Tab(route.path!))

  signatureImage: ImageInformation = {
    altText: 'Signature',
    path: 'signature.svg',
  }
}
