import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { LocalConfigService } from './local-config.service';
import { ApplicationContent } from '../data/data';
import { Education } from '../data/ecucation';
import { Experiance } from '../data/experience';
import { Introduction } from '../data/introduction';
import { Skills } from '../data/skills';
import { AllDownloads } from '../data/downloads';
import { AboutMe } from '../data/about-me';

@Injectable({ providedIn: 'root' })
export class DataService {

  private localConfigService = inject(LocalConfigService);

  private fetchConfigurations(): Observable<ApplicationContent> {
    // ToDo: switch later to fetch data from backend in development mode
    return this.localConfigService.readLocalConfigurations();
  }

  public getEducationData(): Observable<Education[]> {
    return this.fetchConfigurations().pipe(map((data) => data.education));
  }

  public getExperienceData(): Observable<Experiance[]> {
    return this.fetchConfigurations().pipe(map((data) => data.experience));
  }

  public getIntroductionData(): Observable<Introduction> {
    return this.fetchConfigurations().pipe(map((data) => data.introduction));
  }

  public getSkillsData(): Observable<Skills> {
    return this.fetchConfigurations().pipe(map((data) => data.skills));
  }

  public getAllDocuments(): Observable<AllDownloads> {
    return combineLatest([this.getExperienceData(), this.getEducationData()])
      .pipe(
        map(([experience, education]) => {
          const experienceDownloads = experience
            .filter(e => e.downloads && e.downloads.length > 0)
            .flatMap(e =>
              e.downloads.map(download => ({
                label: download.label,
                path: download.path
              }))
            );
          const educationDownloads = education
            .filter(e => e.downloads && e.downloads.length > 0)
            .flatMap(e =>
              e.downloads.map(download => ({
                label: download.label,
                path: download.path
              }))
            );
          return ({
            experience: experienceDownloads,
            education: educationDownloads,
          })
        })
      );
  }

  public getPersonalInformation(): Observable<AboutMe> {
    return this.fetchConfigurations().pipe(map((data) => data.aboutMe))
  }

}
