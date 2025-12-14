import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/Transaction';
import { FormsModule } from '@angular/forms';
import { Category, Color } from '../../models/Category';
import { TransactionView } from '../transaction-view/transaction-view';
import {Limit} from '../../models/Limit';

@Component({
  selector: 'app-main-view',
  imports: [TransactionView, FormsModule, CommonModule],
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
    return  this.categories.find(c => c.id === id)!;
  }
  
  getMonthName(monthIndex: number): string {
    const date = new Date(this.year, monthIndex);
    return date.toLocaleString('en-US', { month: 'long' }); 
  }
  previousMonth() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
  }

  nextMonth() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
  
  }
}
