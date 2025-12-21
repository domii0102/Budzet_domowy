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
  errorMessage: string | null = null;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  limitForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    category_id: new FormControl('', Validators.required),
    month: new FormControl(new Date().getMonth(), [Validators.required, Validators.min(0), Validators.max(11)]),
    year: new FormControl(new Date().getFullYear(), [Validators.required, Validators.min(2000)]),
  })

  onSubmit() {
   if (this.limitForm.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.save.emit(this.limitForm.value);
  }

  onCancel() {
    this.close.emit();
  }


}
