import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';
import { futureDateValidator } from '../date-validator';
import { Transaction } from '../../models/Transaction';


@Component({
  selector: 'app-add-transaction-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-transaction-view.html',
  styleUrl: './add-transaction-view.css',
})
export class AddTransactionView {
  categories = input.required<Category[]>();
  transaction = input<Transaction | null>();
  save = output<any>();
  update = output<any>();
  close = output<void>();
  transactionForm: FormGroup = new FormGroup({});


  ngOnInit() {
  const date = this.transaction() ? new Date(this.transaction()!.date) : new Date();

  this.transactionForm = new FormGroup({
    _id: new FormControl(this.transaction() ? this.transaction()?._id : ''),
    name: new FormControl(this.transaction() ? this.transaction()?.name : '', Validators.required),
    value: new FormControl(this.transaction() ? this.transaction()?.value.toString() : '', [Validators.required, Validators.min(0.01)]),
    date: new FormControl(this.transaction() ? date.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10), [Validators.required, futureDateValidator()]),
    category_id: new FormControl(this.transaction() ? this.transaction()?.category_id : '', Validators.required),
    description: new FormControl(this.transaction() ? this.transaction()?.description : ''),
  });
}

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
    if (this.transaction()) {
      this.update.emit(this.transactionForm.value);
      return;
    }
    this.save.emit(this.transactionForm.value);
  }
  onCancel() {
    this.close.emit();
  }


}
