import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserService,
    private authService: AuthService,
    private route: Router
    ) { }
  user_select_answers: Array<any> = [];
  id: string = "";
  lstQuestions: Array<any> = [];
  ngOnInit(): void {
    this.router.params.subscribe(par => {
      this.id = par['id']; // lấy code môn học
      this.getQuestions();
    })
  }

  getQuestions(){ // hàm lấy danh sách câu hỏi
    this.questionService.list(this.id)
    .subscribe(data => {
      let randomArr = this.getDistinctNumberArr(10, data.length); // tạo mảng random
      this.lstQuestions = randomArr.map((ind) => data[ind]); // lấy các câu hỏi có chỉ số index là mảng random
    })
  }

  private getDistinctNumberArr(amount = 10, max = 80){ // tạo hàm random
    let arr: Array<number> = [];
    while(arr.length < amount){
      const rand = Math.floor(Math.random() * max);
      if(!arr.includes(rand)){
        arr.push(rand);
      }
    }
    return arr;
  }

  selectAnswer(qId:number, aId: number){ // chọn câu hỏi
    let indx = -1;
    this.user_select_answers.forEach((el, index)=>{
      if(el.qId == qId){
        indx = index;
        return;
      }
    });
    if(indx == -1){
      this.user_select_answers.push({
        qId, aId
      });
    }else{
      this.user_select_answers[indx].aId = aId;
    }
    // console.log(this.user_select_answers)
    console.log(this.authService.loggedInUser.value)
  }

  submitExcercise(){
    let correctAns = 0;
    // tìm đáp án câu hỏi, nếu đúng => cộng điểm
    this.user_select_answers.forEach((el) => {
      let q = this.lstQuestions.find(item => item.id == el.qId);
      if(q.AnswerId == el.aId){
        correctAns++;
      }
    })
    const score = (correctAns*10/this.lstQuestions.length).toFixed(2);  // tính điểm
    let user = this.authService.loggedInUser.value; // lấy thông thôngtin người dùng
    // user.marks
    let indx = -1;
    user.marks.forEach((m:any, i: number) => {
      if(m.subject == this.id){
        indx = i;
        return;
      }
    })
    if(indx == -1){
      user.marks.push({
        subject: this.id,
        score: Number(score)
      });
    }else{
      user.marks[indx].score = score;
    }
    this.userService.update(user)
      .subscribe(u => {
        this.route.navigate(['/quiz/' + this.id + '/ket-qua'])
      })    
  }

}