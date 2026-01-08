import { Component, OnInit, ChangeDetectorRef, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetApiService } from '../services/budget-api.service';
import { TransactionView } from '../transaction-view/transaction-view';
import { AddCategoryView } from '../add-category-view/add-category-view';
import { AddTransactionView } from '../add-transaction-view/add-transaction-view';
import { AddLimitView } from '../add-limit-view/add-limit-view';
import { CategoriesView } from '../categories-view/categories-view';
import { LimitsView } from '../limits-view/limits-view';
import { DeleteConfirmation } from '../delete-confirmation/delete-confirmation';
import { Category, newCategory } from '../../models/Category';
import { Transaction, newTransaction } from '../../models/Transaction';
import { Limit, newLimit } from '../../models/Limit';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule, TransactionView, FormsModule, AddCategoryView, AddTransactionView, AddLimitView, CategoriesView, LimitsView, DeleteConfirmation],
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
  isDeleteConfirmationOpen: boolean = false;
  isDeleting: boolean = false;
  editedTransaction: Transaction | null = null;
  editedCategory: Category | null = null;
  editedLimit: Limit | null = null;
  deletedTransaction: Transaction | null = null;
  deletedLimit: Limit | null = null;
  deletedCategory: Category | null = null;

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


  openAddCategory(categoryId?: string): void {
    this.isCategoryModalOpen = true;
    if (categoryId) {
      this.editedCategory = this.categories.find(c => c._id === categoryId) || null;
      console.log('Editing category with ID:', this.editedCategory?._id);
    }
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
      error: (e) => {
        console.error('ADD CATEGORY ERROR:', e);
        alert('An error occurred while adding the category.');
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  handleUpdateCategory(data: Category): void {
    if (this.isSaving) return;
    this.isSaving = true;

    this.api.updateCategory(data).subscribe({
      next: () => {
        this.reload();
        this.isCategoryModalOpen = false;
        this.isSaving = false;
        this.editedCategory = null;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('UPDATE CATEGORY ERROR:', e);
        alert('An error occurred while updating the category.');
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    })
  }

  openAddTransaction(transactionId?: string): void {
    if (this.categories.length === 0) {
      alert('No categories available. Please add a category first.');
      return;
    }
    this.isTransactionModalOpen = true;
    if (transactionId) {
      this.editedTransaction = this.transactions.find(t => t._id === transactionId) || null;
      console.log('Editing transaction with ID:', this.editedTransaction?._id);
    }
  }

  closeAddTransaction(): void {
    if (!this.isSaving) {
      this.isTransactionModalOpen = false;
    }
    this.editedTransaction = null;
    console.log('Closed transaction modal. this.editedTransactionId is now:', this.editedTransaction);
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

  handleUpdateTransaction(data: Transaction): void { 
    if (this.isSaving) return;
    this.isSaving = true;

    this.api.updateTransaction(data).subscribe({
      next: () => {
        this.reload();
        this.isTransactionModalOpen = false;
        this.isSaving = false;
        this.editedTransaction = null;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('UPDATE TRANSACTION ERROR:', e);
        alert('An error occurred while updating the transaction.');
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddLimit(limitId?: string): void {
    if (this.categories.length === 0) {
      alert('No categories available. Please add a category first.');
      return;
    }
    this.isLimitModalOpen = true;
    if (limitId) {
      this.editedLimit = this.limits.find(l => l._id === limitId) || null;
      console.log('Editing limit with ID:', this.editedLimit?._id);
    }
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
    const payload = { ...data };

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

  handleUpdateLimit(data: Limit): void { 
    if (this.isSaving) return;
    this.isSaving = true;

    this.api.updateLimit(data).subscribe({
      next: () => {
        this.reload();
        this.isLimitModalOpen = false;
        this.isSaving = false;
        this.editedLimit = null;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('UPDATE LIMIT ERROR:', e);
        alert('An error occurred while updating the limit.');
        this.isSaving = false;
        this.cdr.detectChanges();
      }
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

  openDeleteTransaction(transactionId: string): void {
    this.deletedTransaction = this.transactions.find(t => t._id === transactionId) || null;
    this.isDeleteConfirmationOpen = true;
  }

  openDeleteLimit(limitId: string): void {
    this.deletedLimit = this.limits.find(l => l._id === limitId) || null;
    this.isDeleteConfirmationOpen = true;
  }

  openDeleteCategory(categoryId: string): void {
    this.deletedCategory = this.categories.find(c => c._id === categoryId) || null;
    this.isDeleteConfirmationOpen = true;
  }

  handleDeleteTransaction(transactionId: string): void { 
    if (this.isDeleting) return;
    this.isDeleting = true;

    this.api.deleteTransaction(transactionId).subscribe({
      next: () => {
        this.reload();
        this.isDeleteConfirmationOpen = false;
        this.isDeleting = false;
        this.deletedTransaction = null;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('DELETE TRANSACTION ERROR:', e);
        alert('An error occurred while deleting the transaction.');
        this.isDeleting = false;
        this.cdr.detectChanges();
      },
    });
  }

  handleDeleteLimit(limitId: string): void {
    if (this.isDeleting) return;
    this.isDeleting = true;

    this.api.deleteLimit(limitId).subscribe({
      next: () => {
        this.reload();
        this.isDeleteConfirmationOpen = false;
        this.isDeleting = false;
        this.deletedLimit = null;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('DELETE LIMIT ERROR:', e);
        alert('An error occurred while deleting the limit.');
        this.isDeleting = false;
        this.cdr.detectChanges();
      },
    });
   }

  handleDeleteCategory(categoryId: string): void {
    if (this.isDeleting) return;
    this.isDeleting = true;

    this.api.deleteCategory(categoryId).subscribe({
      next: () => {
        this.reload();
        this.isDeleteConfirmationOpen = false;
        this.isDeleting = false;
        this.deletedCategory = null;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('DELETE CATEGORY ERROR:', e);
        alert('An error occurred while deleting the category.');
        this.isDeleting = false;
        this.cdr.detectChanges();
      },
    });
  }

  closeDeleteConfirmation(): void {
    if (!this.isDeleting) {
      this.isDeleteConfirmationOpen = false;
    }
  }
}