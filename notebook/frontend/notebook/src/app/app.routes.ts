import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateFormComponent },
  { path: 'update/:id', component: UpdateFormComponent },
];
