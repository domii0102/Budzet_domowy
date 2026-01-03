import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-add-limit-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-limit-view.html',
  styleUrl: './add-limit-view.css',
})
export class AddLimitView {

  categories = input.required<Category[]>();
  save = output<any>();
  close = output<void>();

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  limitForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    category_id: new FormControl('', Validators.required),
    month: new FormControl(new Date().getMonth(), [Validators.required, Validators.min(0), Validators.max(11)]),
    year: new FormControl(new Date().getFullYear(), Validators.required),
  });

  errorMessages = {
    required: 'This field is required.',
    min: 'Limit value must be greater than 0.',
  };

  getErrorMessage(controlName: string): string | null {
    const control = this.limitForm.get(controlName);

    if (control && control.errors) {
      for (const errorKey in control.errors) {
        if (errorKey === 'required') {
          return this.errorMessages.required;
        }
        if (errorKey === 'min') {
          return this.errorMessages.min;
        }
      }
    }
    return null;
  }

  onSubmit() {
   if (this.limitForm.invalid) {
      for (const controlName in this.limitForm.controls) {
        this.limitForm.get(controlName)?.markAsTouched();
      }
      return;
    }
    this.save.emit(this.limitForm.value);
  }

  onCancel() {
    this.close.emit();
  }


}
