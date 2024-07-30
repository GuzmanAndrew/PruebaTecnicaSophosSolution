import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { createBasicAuthHeader } from "../../utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/task';
  private username = 'admin';
  private password = 'admin';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return createBasicAuthHeader(this.username, this.password);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task, { headers: this.getAuthHeaders() });
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${task.id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
