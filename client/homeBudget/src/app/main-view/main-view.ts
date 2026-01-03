import { Component, OnInit, ChangeDetectorRef, inject, input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetApiService } from '../services/budget-api.service';
import { TransactionView } from '../transaction-view/transaction-view';
import { AddCategoryView } from '../add-category-view/add-category-view';
import { AddTransactionView } from '../add-transaction-view/add-transaction-view';
import { AddLimitView } from '../add-limit-view/add-limit-view';
import {CategoriesView} from '../categories-view/categories-view';
import { LimitsView } from '../limits-view/limits-view';
import { Category, newCategory } from '../../models/Category';
import { Transaction, newTransaction } from '../../models/Transaction';
import { Limit, newLimit } from '../../models/Limit';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule, TransactionView, FormsModule, AddCategoryView, AddTransactionView, AddLimitView, CategoriesView, LimitsView],
  templateUrl: './main-view.html',
  styleUrl: './main-view.css',
})
export class MainView implements OnInit {

  month = input.required<number>();
  year = input.required<number>();
  
  categories: Category[] = [];
  transactions: Transaction[] = [];
  limits: Limit[] = [];

  isTransactionModalOpen: boolean = false;
  isCategoryModalOpen: boolean = false;
  isLimitModalOpen: boolean = false;
  isSaving: boolean = false;

  sideContent: string = 'limits';
  limitsButtonIsDisabled: boolean = true;
  categoriesButtonIsDisabled: boolean = false;

  api: BudgetApiService = inject(BudgetApiService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  
  ngOnInit(): void {
    this.reload();
  }

  ngOnChanges(): void {
    this.reload();
  }

  getCategory(id: string): Category | undefined {
    return this.categories.find((c: Category) => c._id === id);
  }
  

  reload(): void {
    this.api.getCategories().subscribe(cats => {
      this.categories = Array.isArray(cats) ? cats : [];
      this.cdr.detectChanges();

      this.api.getTransactions(this.month(), this.year()).subscribe(tr => {
        this.transactions = Array.isArray(tr) ? tr : [];
        this.cdr.detectChanges();
      });

      this.api.getLimits(this.month(), this.year()).subscribe(lm => {
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

  openAddLimit(): void {
    if (this.categories.length === 0) {
        alert('No categories available. Please add a category first.');
        return;
    }
    this.isLimitModalOpen = true;
  }
  closeAddLimit(): void {
    if (!this.isSaving) {
      this.isLimitModalOpen = false;
    }
  }

  handleSaveLimit(data: newLimit): void {
    if (this.isSaving) return; 
    this.isSaving = true;

    console.log('New limit data:', data);
    const payload = { ...data};

    this.api.addLimit(payload).subscribe({
      next: () => {
        this.reload();
        this.isLimitModalOpen = false;
        this.isSaving = false;
        this.cdr.detectChanges(); 
      },
      error: (e) => {
        console.log('ADD LIMIT ERROR:', e?.error);
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }
  

  changeSideContent(): void {
    if (this.sideContent === 'limits') {
      this.sideContent = 'categories';
      this.limitsButtonIsDisabled = false;
      this.categoriesButtonIsDisabled = true;
    } else {
      this.sideContent = 'limits';
      this.limitsButtonIsDisabled = true;
      this.categoriesButtonIsDisabled = false;
    }
  }
}