import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(
    private questionService: QuestionService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router
  ) { }

  id: string = ''
  // tạo form câu hỏi question
  question = this.fb.group({
    text: [''],
    correct: [''],
    answers: this.fb.array([])
  })

  // lấy giá trị mảng câu hỏi trong question
  get answers(){
    return this.question.get('answers') as FormArray
  }

  ngOnInit(): void {
    // lấy giá trị id từ urlurl
    this.router.params.subscribe(res => this.id = res['id'])
  }

  removeAnswer(index: number){
    // xóa đáp án
    this.answers.removeAt(index)
  }

  addAnswer(){
    // thêm đáp án
    this.answers.push(this.fb.group({
      id: (new Date()).getTime(),
      Text: ('')
    }))
  }

  addQuestion(){
    // thêm đáp án
    let newQuestion = {
      Text: this.question.value.text,
      Marks: 1,
      AnswerId: this.question.value.answers[this.question.value.correct].id,
      Answers: this.question.value.answers
    }
    this.questionService.addQuestion(this.id, newQuestion)
      .subscribe(res => {
        this.route.navigate(['/admin/' + this.id + '/cau-hoi'])
      })
  }

}
