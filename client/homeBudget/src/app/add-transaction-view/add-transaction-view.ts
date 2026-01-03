import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';


@Component({
  selector: 'app-add-transaction-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-transaction-view.html',
  styleUrl: './add-transaction-view.css',
})
export class AddTransactionView {
  categories = input.required<Category[]>();
  save = output<any>();
  close = output<void>();
  errorMessage: string | null = null;

  transactionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    date: new FormControl(new Date().toISOString().slice(0,10), Validators.required),
    category_id: new FormControl('', Validators.required),
  });


  onSubmit() {
   if (this.transactionForm.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.save.emit(this.transactionForm.value);
  }
  onCancel() {
    this.close.emit();
  }
}
