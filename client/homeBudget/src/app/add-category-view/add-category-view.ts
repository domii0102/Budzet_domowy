import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-add-category-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category-view.html',
  styleUrl: './add-category-view.css',
})
export class AddCategoryView {
  save = output<{ name: string; color: string }>();
  close = output<void>();

  allowedColors = [
  '#fe6f6f', 
  '#6fd0fe', 
  '#736ffe', 
  '#fe6fc2', 
  '#4adb42', 
  '#feaa6f'
  ]
  formData = {
    name: '',
    color: this.allowedColors[0],
  };
  selectColor(color: string) {
    this.formData.color = color;
  }
  onSubmit() {
    if(!this.formData.name) {
      alert('Category name is required');
      return;
    }
    this.save.emit(this.formData);
  }
  onCancel() {
    this.close.emit();
  }
}
