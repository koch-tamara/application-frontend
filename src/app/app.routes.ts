import { Routes } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { DocumentsComponent } from './documents/documents.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
        path: 'introduction',
        component: IntroductionComponent,
    },
    {
        path: 'experience',
        component: ExperienceComponent
    },
    {
        path: 'education',
        component: EducationComponent
    },
    {
        path: 'skills',
        component: SkillsComponent
    },
    {
        path: 'documents',
        component: DocumentsComponent
    },
    {
        path: 'about-me',
        component: AboutMeComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: '**',
        redirectTo: 'introduction',
    },
];