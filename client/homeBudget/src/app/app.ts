import { Component, ChangeDetectorRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MainView } from './main-view/main-view';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, MainView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BudgetApp');

    
    today = new Date();
    month: number = this.today.getMonth();
    year: number = this.today.getFullYear();
    months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    years: number[] = Array.from(
      { length: 10 },
      (_, i) => this.today.getFullYear() - 5 + i
    );

    prevMonth(): void {
    if (this.month > 0) {
      this.month = this.month - 1;
    } else {
      this.month = 11;
      this.year = this.year - 1;
    }
  }

  nextMonth(): void {
    if (this.month < 11) {
      this.month = this.month + 1;
    } else {
      this.month = 0;
      this.year = this.year + 1;
    }
  }
}
