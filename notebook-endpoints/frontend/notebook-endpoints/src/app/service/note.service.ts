import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../interface/notes';
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [];
  private notes$ = new BehaviorSubject<Note[]>(this.notes);

  constructor() {}

  getNotes(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  getNoteById(id: number): Observable<Note | undefined> {
    const note = this.notes.find((n) => n.id === id);
    return note
      ? new BehaviorSubject<Note>(note).asObservable()
      : new BehaviorSubject<Note | undefined>(undefined).asObservable();
  }

  createNote(note: Note): void {
    note.id = this.notes.length + 1;
    this.notes.push(note);
    this.notes$.next(this.notes);
  }

  updateNote(id: number, updatedNote: Note): void {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notes[index] = {
        ...updatedNote,
        id,
        createdAt: this.notes[index].createdAt,
      };
      this.notes$.next(this.notes);
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.notes$.next(this.notes);
  }
}
