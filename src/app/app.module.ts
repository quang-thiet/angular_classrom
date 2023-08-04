import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { FinalComponent } from './screens/final/final.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { StudentComponent } from './screens/admin/student/student.component';
import { AddStudentComponent } from './screens/admin/add-student/add-student.component';
import { EditStudentComponent } from './screens/admin/edit-student/edit-student.component';
import { QuestionComponent } from './screens/admin/question/question.component';
import { AddQuestionComponent } from './screens/admin/add-question/add-question.component';
import { EditQuestionComponent } from './screens/admin/edit-question/edit-question.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './screens/admin/subject/subject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    LoginComponent,
    HomeComponent,
    QuizComponent,
    FinalComponent,
    AdminLayoutComponent,
    DashboardComponent,
    StudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    QuestionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.GOOGLE_CLIENT_ID
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
