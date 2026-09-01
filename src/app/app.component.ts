import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { Tab } from '../../projects/page-layout/src/lib/data/tab';
import { PageLayout } from '../../projects/page-layout/src/public-api';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    PageLayout,
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
    .map(route => new Tab(route.path!));
}
