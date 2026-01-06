import { Component, output, input } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { Category } from '../../models/Category';
import { Limit } from '../../models/Limit';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  imports: [DatePipe],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.css',
})
export class DeleteConfirmation {

  categories = input.required<Category[]>();
  category = input<Category | null>();
  transaction = input<Transaction | null>();
  limit = input<Limit | null>();
  close = output<void>();
  deleteTransaction = output<string>();
  deleteCategory = output<string>();
  deleteLimit = output<string>();

  isTransaction(): boolean {
    return this.transaction() !== null;
  }

  isCategory(): boolean {
    return this.category() !== null;
  }

  isLimit(): boolean {
    return this.limit() !== null;
  }

  getCategory(id?: string): Category | null {
    return this.categories().find((c: Category) => c._id === id) || null;
  }

  onDelete() {
    if (this.isTransaction()) {
      this.deleteTransaction.emit(this.transaction()!._id);
    } else if (this.isCategory()) {
      this.deleteCategory.emit(this.category()!._id);
    } else if (this.isLimit()) {
      this.deleteLimit.emit(this.limit()!._id);
    }
  }
  
  onCancel() {
    this.close.emit();
  }


}
