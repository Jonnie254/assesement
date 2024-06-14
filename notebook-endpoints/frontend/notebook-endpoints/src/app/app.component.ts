import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteListComponent } from './component/notes/note-list/note-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoteListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'notebook-endpoints';
}
