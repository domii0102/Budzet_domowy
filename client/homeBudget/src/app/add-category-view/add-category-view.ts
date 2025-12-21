import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-add-category-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category-view.html',
  styleUrl: './add-category-view.css',
})
export class AddCategoryView {
  save = output<any>();
  close = output<void>();
  errorMessage: string | null = null;

  allowedColors = [
  '#fe6f6f', 
  '#6fd0fe', 
  '#736ffe', 
  '#fe6fc2', 
  '#4adb42', 
  '#feaa6f'
  ]

  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl(this.allowedColors[0]),
  });

  selectColor(color: string) {
    this.categoryForm.get('color')?.setValue(color);
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.save.emit(this.categoryForm.value);
  }

  onCancel() {
    this.close.emit();
  }
}
