import { Component, computed, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoutingService } from './service/routing.service';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ETabId, Tab } from '../public-api';
import { imageRoutingMapping } from './data/image';
import { SizeService } from 'shared-models';

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
  image = computed(() => {
    const tab = this.tabs.find(tab => tab.id == this.displayedTab());
    return imageRoutingMapping[tab?.id ?? ETabId.introduction];
  });
  isMobile = toSignal(this.sizeService.isMobile$);

  signature = { path: 'signature.svg', alt: 'signature' };
  tabId = ETabId;

  goHome() {
    this.routingService.navitateHome();
  }
}
