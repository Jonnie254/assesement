import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotebookService } from '../../services/notebook.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Notebook } from '../../interface/notebook';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-form',
  standalone: true,
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css',
  imports: [CommonModule, NavbarComponent, FormsModule],
})
export class UpdateFormComponent {
  notebook: Notebook = {
    title: '',
    description: '',
    author: '',
  };
  createFormError: boolean = false;
  createFormSuccess: boolean = false;
  createFormMessage: string = '';

  constructor(
    private notebookService: NotebookService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      const noteId = params['id'];
      if (noteId) {
        this.fetchNotebook(noteId);
      }
    });
  }

  clearMessages() {
    this.createFormSuccess = false;
    this.createFormError = false;
    this.createFormMessage = '';
  }

  fetchNotebook(noteId: string): void {
    this.notebookService.getNotebookById(noteId).subscribe({
      next: (notebook: Notebook) => {
        this.notebook = notebook;
      },
      error: (error) => {
        console.error('Error fetching notebook:', error);
      },
    });
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const updateNotebook: Notebook = {
        id: this.notebook.id,
        title: form.value.title,
        description: form.value.description,
        author: form.value.author,
      };

      this.notebookService.updateNotebook(updateNotebook).subscribe({
        next: (response) => {
          this.createFormSuccess = true;
          this.createFormError = false;
          this.createFormMessage = 'Notebook updated successfully';
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
          form.resetForm();
        },
        error: (error) => {
          this.createFormError = true;
          this.createFormSuccess = false;
          this.createFormMessage = 'Error updating notebook';
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
        },
      });
    } else {
      this.createFormError = true;
      this.createFormSuccess = false;
      this.createFormMessage =
        'Please fix the errors in the form before submitting.';
      setTimeout(() => {
        this.clearMessages();
      }, 3000);
    }
  }
}
