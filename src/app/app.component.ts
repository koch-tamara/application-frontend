import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { ETabId, PageLayout, Tab } from '../../projects/page-layout/src/public-api';
import { tabLabelMapping } from './utils/tabLabelMapping';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    PageLayout,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  public readonly title = 'application-frontend';

  tabs = routes
    .filter(route =>
      typeof route.path === 'string' &&
      route.path !== '**' &&
      route.path !== '')
    .map(route => {
      const tabId = route.path as ETabId;
      return new Tab(tabId, tabLabelMapping.get(tabId))
    });
}
