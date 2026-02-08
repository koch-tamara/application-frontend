import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalConfigService } from './local-config.service';
import { ApplicationContent } from '../data/data';
import { Education } from '../data/ecucation';
import { Experiance } from '../data/experience';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private localConfigService = inject(LocalConfigService);

  private fetchConfigurations(): Observable<ApplicationContent>{
    // ToDo: switch later to fetch data from backend in development mode
    return this.localConfigService.readLocalConfigurations();
  }
  
  public getEducationData(): Observable<Education[]>{
    return this.fetchConfigurations().pipe(map((data) => data.education));
  }

  public getExperienceData(): Observable<Experiance[]>{
    return this.fetchConfigurations().pipe(map((data) => data.experience));
  }
}
