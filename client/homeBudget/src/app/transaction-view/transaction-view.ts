import { Component, input, output } from '@angular/core';
import {Transaction} from '../../models/Transaction';
import { Category } from '../../models/Category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-view',
  imports: [DatePipe],
  templateUrl: './transaction-view.html',
  styleUrl: './transaction-view.css',
})
export class TransactionView {
  transaction = input.required<Transaction>();
  category = input<Category>();
  update = output<string>();
  delete = output<string>();
  options: number = 0;

  onUpdate() {
    this.update.emit(this.transaction()._id);
  };
  
  onDelete() {
    this.delete.emit(this.transaction()._id);
  };

  changeOptionsVisibility() {
    if (this.options === 0) {
      console.log('changing options visibility to 1');
      this.options = 1;
    } else {
      console.log('changing options visibility to 0');
      this.options = 0;
    }
  }


}
