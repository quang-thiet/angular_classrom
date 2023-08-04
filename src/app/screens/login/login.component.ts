import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any = {
    name:'',
    pass:''
  }
  
  constructor(
    private socialService: SocialAuthService,
    private authService: AuthService,
    private use:UserService,
    private router:Router
  ) { 
    
  }

  ngOnInit(): void {

  }

  googleLogin(){
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(resp => {
      console.log(resp)
      this.authService.login(resp.email, resp.id)
        .subscribe(data => {
          console.log("LoginComponent", data);
        this.router.navigate(['/'])
        })
    })
  }
  Login(){
    this.use.list().subscribe(data=>{
      if(data.name == this.user.name){
        localStorage.setItem('user',data.id)
        this.router.navigate(['/'])
      }
    })
  }

}
