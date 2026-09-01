import { inject, Service } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { ETabId } from '../data/tabs';

@Service()
export class RoutingService {

    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly tabIds = Object.values(ETabId);

    activeTab$ = this.router.events
        .pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            map(event => this.getTabId(event.url))
        );

    navitateHome() {
        this.router.navigate(['..', ETabId.introduction],
            { relativeTo: this.activatedRoute });
    }

    switchLanguage(language: string) {
        const currentPath = this.router.url;
        window.location.href = `/${language}${currentPath}`;
    }

    private getTabId(url: string): ETabId {

        for (const value of this.tabIds) {
            if (url.includes(value)) {
                return value;
            }
        }

        return ETabId.introduction;
    }
}
