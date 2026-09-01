import { Component, computed, inject, Input, OnDestroy, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from './data/tab';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ETabId } from './data/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SizeService } from './service/size.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { imageRoutingMapping } from './data/image';
import { RoutingService } from './service/routing.service';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@Component({
  selector: 'lib-page-layout',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    RouterLinkWithHref,
    LanguageSwitcherComponent
  ],
  templateUrl: "./page-layout.html",
  styleUrl: "./page-layout.scss",
  encapsulation: ViewEncapsulation.None,
})
export class PageLayout {
  @Input({ required: true }) tabs: Tab[] = [];

  private readonly sizeService = inject(SizeService);
  private readonly routingService = inject(RoutingService);

  displayedTab = toSignal(this.routingService.activeTab$, { initialValue: ETabId.introduction });
  image = computed(() => imageRoutingMapping[this.displayedTab()]);
  isMobile = toSignal(this.sizeService.isMobile$);

  signature = { path: 'signature.svg', alt: 'signature' };
  tabIds = Object.values(ETabId);
  tabId = ETabId;

  goHome() {
    this.routingService.navitateHome();
  }
}
