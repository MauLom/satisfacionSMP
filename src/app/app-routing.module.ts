import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessAdminComponent } from './access-admin/access-admin.component';
import { AccessSurveysComponent } from './access-surveys/access-surveys.component';
import { SurveysMainComponent } from './access-surveys/surveys-main/surveys-main.component';
import { SurveysQuestionsComponent } from './access-surveys/surveys-questions/surveys-questions.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'admin', component: AccessAdminComponent},
  { path: 'client', component: AccessSurveysComponent},
  { path: 'surveysMain', component: SurveysMainComponent },
  { path: 'questions', component: SurveysQuestionsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
