import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(
    private subjectService: SubjectService
  ) { }

  listSubjects: Array<any> = []

  ngOnInit(): void {
    this.subjectService.list()
      .subscribe(res => this.listSubjects = res)
  }

}
