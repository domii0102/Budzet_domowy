import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetApiService } from '../services/budget-api.service';
import { TransactionView } from '../transaction-view/transaction-view';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule, TransactionView, FormsModule, DatePipe],
  templateUrl: './main-view.html',
  styleUrl: './main-view.css',
})
export class MainView implements OnInit {

  month: number;
  year: number;
  today = new Date();

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
    const name = prompt('Nazwa kategorii:');
    if (!name) return;

    // dozwolone kolory z backendu (Zod)
    const allowedColors = ['#fe6f6f', '#6fd0fe'];

    const color = prompt(
      'Kolor (wklej jeden z dozwolonych):\n' + allowedColors.join(', '),
      allowedColors[0]
    );
    if (!color) return;

    this.api.addCategory({ name, color }).subscribe({
      next: () => this.reload(),
      error: (e) =>
        console.log('ADD CATEGORY ERROR:', e?.error?.error?.fieldErrors),
    });
  }

  openAddTransaction(): void {
    const categoryId = this.categories?.[0]?._id;
    if (!categoryId) {
      alert('Nie ma kategorii w bazie. Dodaj kategorię najpierw.');
      return;
    }

    const name = prompt('Nazwa transakcji:');
    if (!name) return;

    const valueStr = prompt('Kwota:');
    const value = Number(valueStr);
    if (Number.isNaN(value)) {
      alert('Niepoprawna kwota');
      return;
    }

    const defaultDate = new Date().toISOString().slice(0, 10);
    const dateStr = prompt('Data (YYYY-MM-DD):', defaultDate);
    if (!dateStr) return;

    const dt = new Date(dateStr);
    if (isNaN(dt.getTime())) {
      alert('Niepoprawna data');
      return;
    }

    this.api.addTransaction({
      name,
      value,
      date: dt.toISOString(),
      category_id: categoryId,
      description: '',
    }).subscribe({
      next: () => this.reload(),
      error: (e) => console.log('ADD TRANSACTION ERROR:', e?.error),
    });
  }

  openAddLimit(): void {}
}
