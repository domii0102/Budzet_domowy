import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';
import { futureDateValidator } from '../date-validator';


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

  transactionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    date: new FormControl(new Date().toISOString().slice(0, 10), [Validators.required, futureDateValidator()]),
    category_id: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  errorMessages = {
    required: 'This field is required.',
    min: 'Transaction value must be greater than 0.',
    futureDate: 'Date cannot be in the future.'
  };

  getErrorMessage(controlName: string): string | null {
    const control = this.transactionForm.get(controlName);

    if (control && control.errors) {
      for (const errorKey in control.errors) {
        if (errorKey === 'required') {
          return this.errorMessages.required;
        }
        if (errorKey === 'min') {
          return this.errorMessages.min;
        }
        if (errorKey === 'futureDate') {
          return this.errorMessages.futureDate;
        }
      }
    }
    return null;
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      for (const controlName in this.transactionForm.controls) {
        this.transactionForm.get(controlName)?.markAsTouched();
      }
      return;
    }
    this.save.emit(this.transactionForm.value);
  }
  onCancel() {
    this.close.emit();
  }
}
