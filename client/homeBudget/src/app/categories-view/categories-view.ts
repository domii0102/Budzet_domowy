import { Component, input, output } from '@angular/core';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-categories-view',
  imports: [],
  templateUrl: './categories-view.html',
  styleUrl: './categories-view.css',
})
export class CategoriesView {
  categories = input<Category[]>();
  update = output<string>();
  delete = output<string>();
  options: number = 0;

  onUpdate(categoryId: string) {
    this.update.emit(categoryId);
  }

  onDelete(categoryId: string) {
    this.delete.emit(categoryId);
  }

  changeOptionsVisibility() {
    if (this.options === 0) {
      console.log('changing category options visibility to 1');
      this.options = 1;
    } else {
      console.log('changing category options visibility to 0');
      this.options = 0;
    }
  }

}
