import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private subjectService: SubjectService ) { }

  listSubjects: Array<any> = []

  ngOnInit(): void {
    // lấy danh sách môn học
    this.subjectService.list()
      .subscribe(resp => this.listSubjects = resp)
  }

}
