import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notebook } from '../interface/notebook';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}
  createPost(note: Notebook) {
    return this.http.post<{ message?: string; error?: string }>(
      ' http://localhost:4201/notService/addNotebook',
      note
    );
  }
  //get all notes
  getAllNotes(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(
      'http://localhost:4201/notservice/getNoteBooks'
    );
  }
}
