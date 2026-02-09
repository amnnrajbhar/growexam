import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course, Lesson } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getCourses(params?: { category?: string; search?: string; level?: string }): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, { params: params as any });
  }

  getCourse(id: string): Observable<{ course: Course; lessons: Lesson[] }> {
    return this.http.get<{ course: Course; lessons: Lesson[] }>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  createCourse(data: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, data);
  }

  updateCourse(id: string, data: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, data);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
