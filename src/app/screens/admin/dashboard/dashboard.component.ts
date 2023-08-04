import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private userService: UserService
  ) { }

  listSubjects: Array<any> = []
  listUsers: Array<any> = []

  ngOnInit(): void {
    this.subjectService.list()
      .subscribe(res => this.listSubjects = res)
    this.userService.list()
      .subscribe(res => this.listUsers = res)
  }

}
