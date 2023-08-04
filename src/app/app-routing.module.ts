import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { FinalComponent } from './screens/final/final.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { StudentComponent } from './screens/admin/student/student.component';
import { AddStudentComponent } from './screens/admin/add-student/add-student.component';
import { EditStudentComponent } from './screens/admin/edit-student/edit-student.component';
import { QuestionComponent } from './screens/admin/question/question.component';
import { AddQuestionComponent } from './screens/admin/add-question/add-question.component';
import { EditQuestionComponent } from './screens/admin/edit-question/edit-question.component';
import { SubjectComponent as AdminSubjectComponent } from './screens/admin/subject/subject.component'
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'quiz/:id',
        component: QuizComponent
      },
      {
        path: 'quiz/:id/ket-qua',
        component: FinalComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'sinh-vien',
        component: StudentComponent
      },
      {
        path: 'sinh-vien/add',
        component: AddStudentComponent
      },
      {
        path: 'sinh-vien/edit/:id',
        component: EditStudentComponent
      },
      {
        path: 'mon-hoc',
        component: AdminSubjectComponent
      },
      {
        path: ':id/cau-hoi',
        component: QuestionComponent
      },
      {
        path: ':id/cau-hoi/add',
        component: AddQuestionComponent
      },
      {
        path: ':monhoc/cau-hoi/edit/:id',
        component: EditQuestionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
