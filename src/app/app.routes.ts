import { Routes } from '@angular/router';
import { IntroductionComponent } from './content/introduction/introduction.component';
import { ExperienceComponent } from './content/experience/experience.component';
import { EducationComponent } from './content/education/education.component';
import { SkillsComponent } from './content/skills/skills.component';
import { DocumentsComponent } from './content/documents/documents.component';
import { AboutMeComponent } from './content/about-me/about-me.component';
import { ContactComponent } from './content/contact/contact.component';
import { ETabId } from './data/tabs';

export const routes: Routes = [
    {
        path: ETabId.introduction,
        component: IntroductionComponent,
    },
    {
        path: ETabId.experience,
        component: ExperienceComponent
    },
    {
        path: ETabId.education,
        component: EducationComponent
    },
    {
        path: ETabId.skills,
        component: SkillsComponent
    },
    {
        path: ETabId.documents,
        component: DocumentsComponent
    },
    {
        path: ETabId.aboutMe,
        component: AboutMeComponent
    },
    {
        path: ETabId.contact,
        component: ContactComponent
    },
    {
        path: '**',
        redirectTo: ETabId.introduction,
    },
];