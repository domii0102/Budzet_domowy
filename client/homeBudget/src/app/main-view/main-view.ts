import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetApiService } from '../services/budget-api.service';
import { TransactionView } from '../transaction-view/transaction-view';
import { AddCategoryView } from '../add-category-view/add-category-view';
import { AddTransactionView } from '../add-transaction-view/add-transaction-view';
import { Category, newCategory } from '../../models/Category';
import { Transaction, newTransaction } from '../../models/Transaction';
import { Limit, newLimit } from '../../models/Limit';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule, TransactionView, FormsModule, DatePipe, AddCategoryView, AddTransactionView],
  templateUrl: './main-view.html',
  styleUrl: './main-view.css',
})
export class MainView implements OnInit {

  month: number;
  year: number;
  today = new Date();
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: number[] = Array.from(
    { length: 10 },
    (_, i) => this.today.getFullYear() - 5 + i
  );

  categories: Category[] = [];
  transactions: Transaction[] = [];
  limits: Limit[] = [];

  isTransactionModalOpen: boolean = false;
  isCategoryModalOpen: boolean = false;
  isSaving: boolean = false;

  api: BudgetApiService = inject(BudgetApiService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
  }

  ngOnInit(): void {
    this.reload();
  }

  getCategory(id: string): Category | undefined {
    return this.categories.find((c: Category) => c._id === id);
  }

  prevMonth(): void {
    if (this.month > 0) {
      this.month--;
    } else {
      this.month = 11;
      this.year--;
    }
    this.reload();
  }

  nextMonth(): void {
    if (this.month < 11) {
      this.month++;
    } else {
      this.month = 0;
      this.year++;
    }
    this.reload();
  }

  reload(): void {
    this.api.getCategories().subscribe(cats => {
      this.categories = Array.isArray(cats) ? cats : [];
      this.cdr.detectChanges();

      this.api.getTransactions(this.month, this.year).subscribe(tr => {
        this.transactions = Array.isArray(tr) ? tr : [];
        this.cdr.detectChanges();
      });

      this.api.getLimits(this.month, this.year).subscribe(lm => {
        this.limits = Array.isArray(lm) ? lm : [];
        this.cdr.detectChanges();
      });
    });
  }

  openAddCategory(): void {
    this.isCategoryModalOpen = true;
  }

  closeAddCategory(): void {
    if (!this.isSaving) {
      this.isCategoryModalOpen = false;
    }
  }

  handleSaveCategory(data: newCategory): void {
    if (this.isSaving) return;
    this.isSaving = true;

    this.api.addCategory(data).subscribe({
      next: () => {
        this.reload();
        this.isCategoryModalOpen = false;
        this.isSaving = false;
        this.cdr.detectChanges(); 
  },
      error: (e) =>{ console.error('ADD CATEGORY ERROR:', e);
      alert('An error occurred while adding the category.');
      this.isSaving = false;
      this.cdr.detectChanges();
      }
    });
  }

  openAddTransaction(): void {
    if (this.categories.length === 0) {
        alert('No categories available. Please add a category first.');
        return;
    }
    this.isTransactionModalOpen = true;
  }
  closeAddTransaction(): void {
    if (!this.isSaving) {
      this.isTransactionModalOpen = false;
    }
  }

  handleSaveTransaction(data: newTransaction): void {
    if (this.isSaving) return; 
    this.isSaving = true;

    console.log('New transaction data:', data);
    const payload = { ...data, description: data.description || '' };

    this.api.addTransaction(payload).subscribe({
      next: () => {
        this.reload();
        this.isTransactionModalOpen = false;
        this.isSaving = false;
        this.cdr.detectChanges(); 
      },
      error: (e) => {
        console.log('ADD TRANSACTION ERROR:', e?.error);
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }

  openAddLimit(): void {}
    
} 
