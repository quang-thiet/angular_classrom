import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('login_user') || "{}"));
  constructor(private http: HttpClient,
            private router: Router          
    ) { }

  login(email: String, googleId: String): Observable<any>{
    return this.http.get<any>(`${environment.user_api}?email=${email}&googleId=${googleId}`)
      .pipe(
        map((item) => {
          if(item.length > 0){
            localStorage.setItem('login_user', JSON.stringify(item[0]));
            this.loggedInUser.next(item[0])
            return item[0];
          }
          return null;
        })
      )
  }

  getLoggedInUser(){
    return this.loggedInUser.value;
  }

  isLoggedIn(): boolean{
    const loggedInUser = JSON.parse(localStorage.getItem('login_user') || "{}");
    if(loggedInUser.email == undefined || loggedInUser.email == ""
      || loggedInUser.googleId == undefined || loggedInUser.googleId == ""){
        return false;
      }
    return true;
  }

  logout(): void{
    localStorage.removeItem('login_user');
    this.router.navigate(['/login']);
  }
}
