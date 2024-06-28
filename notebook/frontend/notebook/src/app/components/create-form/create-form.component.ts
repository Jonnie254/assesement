import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotebookService } from '../../services/notebook.service';
import { Notebook } from '../../interface/notebook';
@Component({
  selector: 'app-create-form',
  standalone: true,
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavbarComponent],
})
export class CreateFormComponent {
  createFormError: boolean = false;
  createFormSuccess: boolean = false;
  createFormMessage: string = '';

  constructor(private notebookService: NotebookService) {}

  clearMessages() {
    this.createFormSuccess = false;
    this.createFormError = false;
    this.createFormMessage = '';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newNotebook: Notebook = {
        title: form.value.title,
        description: form.value.description,
        author: form.value.author,
      };

      this.notebookService.createNotebook(newNotebook).subscribe({
        next: (response) => {
          this.createFormSuccess = true;
          this.createFormError = false;
          this.createFormMessage = 'Notebook created successfully';
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
          form.resetForm(); // Correct way to reset the form
        },
        error: (error) => {
          this.createFormError = true;
          this.createFormSuccess = false;
          this.createFormMessage = 'Error creating notebook';
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
