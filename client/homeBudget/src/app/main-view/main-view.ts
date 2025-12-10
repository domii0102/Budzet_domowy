import { Component } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { Category, Color } from '../../models/Category';
import { TransactionView } from '../transaction-view/transaction-view';
import {Limit} from '../../models/Limit';

@Component({
  selector: 'app-main-view',
  imports: [TransactionView],
  templateUrl: './main-view.html',
  styleUrl: './main-view.css',
})
export class MainView {

  month: number;
  year: number;
  today = new Date();

  categories: Category[] = [new Category("aaa", "Jedzenie", Color.Green),
  new Category("bbb", "Ubrania", Color.Blue)]
  transactions: Transaction[] = [new Transaction("111", "Zakupy Lidl", 23.45, new Date('2025-12-10'), "aaa"),
  new Transaction("222","Nowa sukienka", 100, new Date('2025-12-08'), "bbb"),
  new Transaction("333", "Nowa sukienka 2", 150, new Date('2025-11-08'), "bbb")
  ]
  limits: Limit[] = [new Limit("444", 400, "bbb", 11, 2025)]

  constructor() {
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
  }

  getCategory(id: string): Category {
    return  this.categories.find(c => c.id === id)!;
  }

  
 
}
