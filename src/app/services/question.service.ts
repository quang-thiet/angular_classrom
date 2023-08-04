import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  list(subject_code: string):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/${subject_code}`);
  }

  addQuestion(subject_code: string, question: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${subject_code}`, {...question})
  }

  questionDetail(subject_code: string, id: number){
    return this.http.get<any>(`${environment.apiUrl}/${subject_code}/${id}`)
  }

  updateQuestion(subject_code: string, id:number, question: any): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/${subject_code}/${id}`, {...question})
  }

  deleteQuestion(subject_code: string, id: number): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/${subject_code}/${id}`)
  }

}