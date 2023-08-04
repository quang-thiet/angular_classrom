import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  update(user: any):Observable<any>{
    localStorage.setItem('login_user', JSON.stringify(user))
    return this.http.put<any>(`${environment.user_api}/${user.id}`, {...user});
  }

  list(): Observable<any>{
    return this.http.get<any>(`${environment.user_api}`)
  }

}