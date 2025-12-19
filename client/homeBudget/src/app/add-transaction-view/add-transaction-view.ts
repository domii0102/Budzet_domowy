import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-transaction-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-transaction-view.html',
  styleUrl: './add-transaction-view.css',
})
export class AddTransactionView {
  categories = input.required<any[]>();
  save = output<any>();
  close = output<void>();
  formData = {
    name: '',
    value: null as number | null,
    date: new Date().toISOString().slice(0,10),
    category_id: '',
  };
  onSubmit() {
   if (!this.formData.name || this.formData.value === null || !this.formData.category_id) {
      alert('Please fill all required fields');
      return;
    }
    this.save.emit(this.formData);
  }
  onCancel() {
    this.close.emit();
  }
}
