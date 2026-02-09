import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Quiz, Question, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}/quizzes`;

  constructor(private http: HttpClient) {}

  getQuizzes(courseId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getQuiz(id: string): Observable<{ quiz: Quiz; questions: Question[] }> {
    return this.http.get<{ quiz: Quiz; questions: Question[] }>(`${this.apiUrl}/${id}`);
  }

  submitQuiz(id: string, answers: any[], timeTaken: number): Observable<Result> {
    return this.http.post<Result>(`${this.apiUrl}/${id}/submit`, { answers, timeTaken });
  }

  getResults(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/results`);
  }

  getResult(id: string): Observable<{ result: Result; questions: Question[] }> {
    return this.http.get<{ result: Result; questions: Question[] }>(`${this.apiUrl}/results/${id}`);
  }

  createQuiz(data: Partial<Quiz>): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, data);
  }

  deleteQuiz(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
