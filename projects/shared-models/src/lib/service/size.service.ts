import { Service } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, Observable, startWith } from 'rxjs';

@Service()
export class SizeService {
    private readonly mobileMaxWidth = 768;

    public isMobile$: Observable<boolean> = fromEvent(globalThis, 'resize')
        .pipe(
            map(() => window.innerWidth < this.mobileMaxWidth),
            distinctUntilChanged(),
            startWith(window.innerWidth < this.mobileMaxWidth)
        );
}
