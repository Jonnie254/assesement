import { Routes } from '@angular/router';
import { NoteListComponent } from './component/notes/note-list/note-list.component';
import { NoteCreateComponent } from './component/notes/note-create/note-create.component';
import { NoteUpdateComponent } from './component/notes/note-update/note-update.component';
import { NoteViewComponent } from './component/notes/note-view/note-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/create', component: NoteCreateComponent },
  { path: 'notes/update/:id', component: NoteUpdateComponent },
  { path: 'notes/:id', component: NoteViewComponent },
];
