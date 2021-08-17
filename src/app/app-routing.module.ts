import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessAdminComponent } from './access-admin/access-admin.component';
import { AdminGenerateSurveyComponent } from './access-admin/admin-generate-survey/admin-generate-survey.component';
import { AdminMainComponent } from './access-admin/admin-main/admin-main.component';
import { AccessSurveysComponent } from './access-surveys/access-surveys.component';
import { SurveysEndComponent } from './access-surveys/surveys-end/surveys-end.component';
import { SurveysMainComponent } from './access-surveys/surveys-main/surveys-main.component';
import { SurveysQuestionsComponent } from './access-surveys/surveys-questions/surveys-questions.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'admin', component: AccessAdminComponent},
  { path: 'client', component: AccessSurveysComponent},
  { path: 'surveysMain', component: SurveysMainComponent },
  { path: 'surveysEnd', component: SurveysEndComponent },
  { path: 'questions', component: SurveysQuestionsComponent },
  { path: 'adminMain', component: AdminMainComponent },
  { path: 'admingsurvey', component: AdminGenerateSurveyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
