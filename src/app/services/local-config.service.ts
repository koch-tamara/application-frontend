import { inject, Injectable } from '@angular/core';
import { ApplicationContent, Customer } from '../data/data';
import { Experiance } from '../data/experience';
import { Education } from '../data/ecucation';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Introduction } from '../data/introduction';

@Injectable({ providedIn: 'root' })
export class LocalConfigService {

  private http = inject(HttpClient);
  
  private readonly customerUrl = 'configurations/customer.json';
  private readonly educationUrl = 'configurations/education.json';
  private readonly experienceUrl = 'configurations/experience.json';
  private readonly introductionUrl = 'configurations/introduction.json';
  
  public readLocalConfigurations(): Observable<ApplicationContent> {
    return forkJoin({
      customer: this.http.get<Customer>(this.customerUrl),
      education: this.http.get<Education[]>(this.educationUrl),
      experience: this.http.get<Experiance[]>(this.experienceUrl),
      introduction: this.http.get<Introduction>(this.introductionUrl)
    }).pipe(
      map(result =>
        new ApplicationContent(
          result.customer,
          result.experience,
          result.education,
          result.introduction
        )));
  }
}

