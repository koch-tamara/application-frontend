import { Routes } from '@angular/router';
import { IntroductionComponent } from './content/introduction/introduction.component';
import { ExperienceComponent } from './content/experience/experience.component';
import { EducationComponent } from './content/education/education.component';
import { SkillsComponent } from './content/skills/skills.component';
import { DocumentsComponent } from './content/documents/documents.component';
import { AboutMeComponent } from './content/about-me/about-me.component';
import { ContactComponent } from './content/contact/contact.component';

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