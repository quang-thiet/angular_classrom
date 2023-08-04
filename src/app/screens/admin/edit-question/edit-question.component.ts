import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private questionService: QuestionService,
    private route: Router
  ) { }

  monhoc: string = ''
  id: number = 0

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.monhoc = res['monhoc'] // lấy mã môn học từ url
      this.id = Number(res['id']) // lấy id câu hỏi
    })
    this.questionService.questionDetail(this.monhoc, this.id)
      .subscribe(res => {
        // gán câu hỏi được lấylấy
        this.question.patchValue({
          id: res.id,
          text: res.Text,
          correct: res.Answers.findIndex((item: any) => item.id == res.AnswerId)
        })
        res.Answers.forEach((a:any) => {
          this.answers.push(this.fb.group({
            id: a.id,
            Text: a.Text
          }))
        })
      })
  }

  // tạo đối tượng câu hỏi
  question = this.fb.group({
    id: [],
    text: [''],
    correct: [''],
    answers: this.fb.array([])
  })

  // lấy câu trả lời
  get answers(){
    return this.question.get('answers') as FormArray
  }

  // xóa đáp án
  removeAnswer(index: number){
    this.answers.removeAt(index)
  }

  // thêm đáp án
  addAnswer(){
    this.answers.push(this.fb.group({
      id: (new Date()).getTime(),
      Text: ('')
    }))
  }

  // lưu câu hỏi
  saveQuestion(){
    let question = {
      id: this.question.value.id,
      Text: this.question.value.text,
      Marks: 1,
      AnswerId: this.question.value.answers[this.question.value.correct].id,
      Answers: this.question.value.answers
    }
    this.questionService.updateQuestion(this.monhoc, this.id, question)
      .subscribe(res => {
        this.route.navigate(['/admin/' + this.monhoc + '/cau-hoi'])
      })
  }

}
