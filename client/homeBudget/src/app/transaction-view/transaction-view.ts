import { Component, input } from '@angular/core';
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
  transaction = input<Transaction>();
  category = input<Category>();
  

}
