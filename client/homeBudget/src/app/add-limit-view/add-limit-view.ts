import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';
import { Limit } from '../../models/Limit';
@Component({
  selector: 'app-add-limit-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-limit-view.html',
  styleUrl: './add-limit-view.css',
})
export class AddLimitView {

  categories = input.required<Category[]>();
  limit = input<Limit | null>();
  save = output<any>();
  update = output<any>();
  close = output<void>();
  limitForm: FormGroup = new FormGroup({});

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit() {
    const date = new Date();
    this.limitForm = new FormGroup({
    value: new FormControl(this.limit() ? this.limit()?.value :'', [Validators.required, Validators.min(0.01)]),
    category_id: new FormControl(this.limit() ? this.limit()?.category_id :'', Validators.required),
    month: new FormControl(this.limit() ? this.limit()?.month : date.getMonth(), [Validators.required, Validators.min(0), Validators.max(11)]),
    year: new FormControl(this.limit() ? this.limit()?.year : date.getFullYear(), Validators.required),
  });
  }

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
    if (this.limit()) {
      this.update.emit(this.limitForm.value);
      return;
    }
    this.save.emit(this.limitForm.value);
  }

  onCancel() {
    this.close.emit();
  }


}
