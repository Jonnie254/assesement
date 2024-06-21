import { Routes } from '@angular/router';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { NotebookHomeComponent } from './components/notebook-home/notebook-home.component';

export const routes: Routes = [
  { path: '', component: NotebookHomeComponent },
  { path: 'create', component: CreateFormComponent },
];
