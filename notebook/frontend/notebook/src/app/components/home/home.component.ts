import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotebookComponent } from '../notebook/notebook.component';
import { Notebook } from '../../interface/notebook';
import { NotebookService } from '../../services/notebook.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UpdateFormComponent } from '../update-form/update-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    NavbarComponent,
    NotebookComponent,
    CommonModule,
    RouterLink,
    UpdateFormComponent,
  ],
})
export class HomeComponent {
  showConfirmDelete: boolean = false;

  notes: Notebook[] = [];
  constructor(private notesService: NotebookService) {
    this.getNotes();
  }
  getNotes() {
    this.notesService.getAllNotebooks().subscribe(
      (notebook: Notebook[]) => {
        this.notes = notebook;
      },
      (error) => {
        console.error('Failed to fetch tours:', error);
      }
    );
  }

  updateNotebook(notebook: Notebook) {
    this.notesService.updateNotebook(notebook).subscribe(
      (response) => {
        console.log('Notebook updated successfully:', response);
      }, // You can optionally update the UI or handle success feedback here
      (error) => {
        console.error('Error updating notebook:', error);
        // Handle error feedback
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
