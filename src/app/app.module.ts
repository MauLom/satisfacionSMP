import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccessAdminComponent } from './access-admin/access-admin.component';
import { AccessSurveysComponent } from './access-surveys/access-surveys.component';
import { SurveysMainComponent } from './access-surveys/surveys-main/surveys-main.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './footer/footer.component';
import { SurveysQuestionsComponent } from './access-surveys/surveys-questions/surveys-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AccessAdminComponent,
    AccessSurveysComponent,
    SurveysMainComponent,
    SurveysQuestionsComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
