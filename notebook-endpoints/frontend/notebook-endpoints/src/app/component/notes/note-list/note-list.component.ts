import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../../service/note.service';
import { NoteCreateComponent } from '../note-create/note-create.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
  imports: [CommonModule, NoteCreateComponent],
})
export class NoteListComponent {
  note: any;
  showCreateForm: boolean = true;

  constructor() {}

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }
}
