import { inject, Injectable } from '@angular/core';
import { ApplicationContent } from '../data/data';
import { Experiance } from '../data/experience';
import { Education } from '../data/ecucation';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Introduction } from '../data/introduction';
import { Skills } from '../data/skills';
import { Basics } from '../data/basic';

@Injectable({ providedIn: 'root' })
export class LocalConfigService {

  private http = inject(HttpClient);

  private readonly rootUrl = 'configurations';

  private readonly educationFile = 'education';
  private readonly experienceFile = 'experience';
  private readonly introductionFile = 'introduction';
  private readonly skillsFile = 'skills';
  private readonly basicFile = 'basic';

  public readConfigurations(): Observable<ApplicationContent> {
    return forkJoin({
      education: this.http.get<Education[]>(this.buildConfigurationUrl(this.educationFile)),
      experience: this.http.get<Experiance[]>(this.buildConfigurationUrl(this.experienceFile)),
      introduction: this.http.get<Introduction>(this.buildConfigurationUrl(this.introductionFile)),
      skills: this.http.get<Skills>(this.buildConfigurationUrl(this.skillsFile)),
      basic: this.http.get<Basics>(this.buildConfigurationUrl(this.basicFile)),
    }).pipe(
      map(result =>
        new ApplicationContent(
          result.experience,
          result.education,
          result.introduction,
          result.skills,
          result.basic
        )));
  }

  buildConfigurationUrl(fileName: string): string {
    return `${this.rootUrl}/${fileName}.json`
  }
}

