import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notebook } from '../interface/notebook';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Res } from '../interface/res';

@Injectable({
  providedIn: 'root',
})
export class NotebookService {
  constructor(private http: HttpClient) {}
  createNotebook(notebook: Notebook) {
    return this.http.post('http://localhost:3004/notebook/create', notebook);
  }
  updateNotebook(notebook: Notebook) {
    return this.http.put(
      `http://localhost:3004/notebook/update/${notebook.id}`,
      notebook
    );
  }
  getNotebookById(id: string): Observable<Notebook> {
    return this.http
      .get<{ success: boolean; message: string; data: Notebook }>(
        `http://localhost:3004/notebook/getone/${id}`
      )
      .pipe(
        map((response: { success: any; data: any }) => {
          if (response.success && response.data) {
            return response.data;
          } else {
            return null;
          }
        }),
        catchError((error) => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }
  getAllNotebooks(): Observable<Notebook[]> {
    return this.http
      .get<{ success: boolean; message: string; data: Notebook[] }>(
        'http://localhost:3004/notebook/getall'
      )
      .pipe(
        map((response: { success: any; data: any }) => {
          if (response.success && response.data) {
            return response.data;
          } else {
            return [];
          }
        }),
        catchError((error) => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }
  deleteNotebook(id: string): Observable<Res> {
    return this.http.delete<Res>(`http://localhost:3004/notebook/delete/${id}`);
  }
}
