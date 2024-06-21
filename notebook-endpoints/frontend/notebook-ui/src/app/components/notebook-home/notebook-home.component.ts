import { Component } from '@angular/core';
import { Notebook } from '../../interface/notebook';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../service/notes.service';

@Component({
  selector: 'app-notebook-home',
  standalone: true,
  templateUrl: './notebook-home.component.html',
  styleUrl: './notebook-home.component.css',
  imports: [HeaderComponent, CommonModule, FormsModule],
})
export class NotebookHomeComponent {
  showConfirmDelete: boolean = false;

  notes: Notebook[] = [];
  constructor(private notesService: NotesService) {}
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getAllNotes().subscribe(
      (data) => {
        this.notes = data.notebook;
      },
      (error) => {
        console.error('Error fetching notebooks:', error);
      }
    );
  }

  deleteNoteId: string | null = null;

  confirmDelete(noteId: string) {
    this.showConfirmDelete = true;
    this.deleteNoteId = noteId;
  }

  deleteNote(noteId: string) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
    this.cancelDelete();
  }

  cancelDelete() {
    this.showConfirmDelete = false;
    this.deleteNoteId = null;
  }
}
