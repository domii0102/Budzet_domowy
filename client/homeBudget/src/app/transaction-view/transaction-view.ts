import { Component, input } from '@angular/core';
import {Transaction} from '../../models/Transaction';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-transaction-view',
  imports: [],
  templateUrl: './transaction-view.html',
  styleUrl: './transaction-view.css',
})
export class TransactionView {
  transaction = input<Transaction>();
  category = input<Category>();
  

}
