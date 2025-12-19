import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetApiService } from '../services/budget-api.service';
import { TransactionView } from '../transaction-view/transaction-view';
import { AddCategoryView } from '../add-category-view/add-category-view';
import { AddTransactionView } from '../add-transaction-view/add-transaction-view';

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
  isSaving = false;  //Flaga blokująca ponowne zapisanie do bazy 
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  years: number[] = Array.from(
    { length: 10 },
    (_, i) => this.today.getFullYear() - 5 + i
  );

  // tylko dane z backendu – zero "na sztywno"
  categories: any[] = [];
  transactions: any[] = [];
  limits: any[] = [];

  isTransactionModalOpen = false;
  isCategoryModalOpen = false;

  constructor(
    private api: BudgetApiService,
    private cdr: ChangeDetectorRef   
  ) {
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
  }

  ngOnInit(): void {
    this.reload(); //  ładowanie danych po wejściu na stronę
  }

  getCategory(id: string): any {
    return this.categories.find((c: any) => c._id === id);
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
      this.cdr.detectChanges(); //  WYMUSZENIE ODŚWIEŻENIA

      this.api.getTransactions(this.month, this.year).subscribe(tr => {
        this.transactions = Array.isArray(tr) ? tr : [];
        this.cdr.detectChanges(); //  WYMUSZENIE ODŚWIEŻENIA
      });

      this.api.getLimits(this.month, this.year).subscribe(lm => {
        this.limits = Array.isArray(lm) ? lm : [];
        this.cdr.detectChanges(); //  WYMUSZENIE ODŚWIEŻENIA
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
  handleSaveCategory(data: any): void {
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

  handleSaveTransaction(data: any): void {
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
