import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Notebook } from '../../interface/notebook';
import { NotesService } from '../../service/notes.service';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent {
  success: boolean = false;
  error: boolean = false;

  constructor(private notesService: NotesService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newNote: Notebook = {
        title: form.value.title,
        content: form.value.content,
      };

      this.notesService.createPost(newNote).subscribe(
        (response) => {
          if (response.message) {
            this.success = true;
            this.error = false;
            form.resetForm();
          } else if (response.error) {
            this.error = true;
            this.success = false;
          }
        },
        (error) => {
          this.error = true;
          this.success = false;
          console.error('Error occurred while creating the note:', error);
        }
      );
    }
  }
}
