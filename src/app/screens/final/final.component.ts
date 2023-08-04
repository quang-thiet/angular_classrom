import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private router: ActivatedRoute,
    private authService: AuthService
  ) { }
  id: string = ''
  subject: any = {}
  score: any = {}
  ngOnInit(): void {
    this.router.params.subscribe(res => this.id = res['id']) // lấy id môn học
    let user = this.authService.getLoggedInUser() // lấy thông tin người dùng hiện tại
    this.score = user.marks.find((s:any) => s.subject == this.id) // lấy điểm người dùng
    this.subjectService.list()
      .subscribe(res => {
        this.subject = res.find((subject:any) => subject.Code == this.id) // lấy thông tin môn học
      })
  }

}
