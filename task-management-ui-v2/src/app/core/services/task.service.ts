import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../../models/task';
import { CreateTaskRequest } from '../../models/create-task-request';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/tasks';

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

  getAllTasks(): Observable<Task[]> {

    return this.http.get<Task[]>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );

  }

  getTaskById(id: number): Observable<Task> {

    return this.http.get<Task>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

  createTask(task: CreateTaskRequest): Observable<Task> {

    return this.http.post<Task>(
      this.apiUrl,
      task,
      {
        headers: this.getHeaders()
      }
    );

  }

  updateTask(id: number, task: CreateTaskRequest): Observable<Task> {

    return this.http.put<Task>(
      `${this.apiUrl}/${id}`,
      task,
      {
        headers: this.getHeaders()
      }
    );

  }

  deleteTask(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

}