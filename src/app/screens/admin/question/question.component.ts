import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(
    private questionService: QuestionService,
    private router: ActivatedRoute
  ) { }
  id: string = ''
  listQuestions: Array<any> = []
  ngOnInit(): void {
    this.router.params.subscribe(res => this.id = res['id'])
    this.getQuestions()
  }

  getQuestions(){
    // lấy câu hỏi để hiển thị ra danh sáchsách
    this.questionService.list(this.id)
      .subscribe(res => this.listQuestions = res)
  }

  deleteQuestion(monhoc: string, id: number){
    // xóa câu hỏi
    this.questionService.deleteQuestion(monhoc, id)
      .subscribe(res => {
        this.getQuestions()
      })
  }

}
