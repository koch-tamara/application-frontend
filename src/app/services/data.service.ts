import { computed, inject, Injectable } from '@angular/core';
import { LocalConfigService } from './local-config.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DownloadInformation, Localized } from 'shared-models';

@Injectable({ providedIn: 'root' })
export class DataService {

  private readonly localConfigService = inject(LocalConfigService);

  private fetchConfiguration = toSignal(this.localConfigService.readConfigurations());

  public education = computed(() => this.fetchConfiguration()?.education);
  public experience = computed(() => this.fetchConfiguration()?.experience);
  public introduction = computed(() => this.fetchConfiguration()?.introduction);
  public skills = computed(() => this.fetchConfiguration()?.skills);
  public basics = computed(() => this.fetchConfiguration()?.basics);

  public documents = computed(() => {
    return ({
      experience: this.extractDownloads(this.experience() ?? []),
      education: this.extractDownloads(this.education() ?? []),
    })
  });

  private extractDownloads<T extends { downloads: DownloadInformation[] }>(data: T[]): { label: Localized<string>, path: string }[] {
    return data
      .filter(e => e.downloads && e.downloads.length > 0)
      .flatMap(e => e.downloads.map(download => ({
        label: download.label,
        path: download.path
      }))
      );
  }
}
