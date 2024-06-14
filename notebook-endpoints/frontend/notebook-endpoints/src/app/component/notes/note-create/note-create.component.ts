import { Component } from '@angular/core';
import { Note } from '../../../interface/notes';
import { NoteService } from '../../../service/note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.css',
})
export class NoteCreateComponent {
  newNote: Note = {
    id: 0,
    title: '',
    content: '',
  };
  showCreateForm: boolean = false;

  constructor(private noteService: NoteService) {
    this.noteService = noteService;
  }
  //method to create note
  createNote(): void {
    console.log('Creating note:', this.newNote);
    if (
      this.newNote.title.trim() === '' ||
      this.newNote.content.trim() === ''
    ) {
      return;
    }

    this.noteService.createNote(this.newNote);

    // Reset newNote object for next entry
    this.newNote = {
      id: 0,
      title: '',
      content: '',
    };
  }
  toggleHideForm(): void {
    this.showCreateForm = !this.showCreateForm;
    console.log('hide form');
  }
}
