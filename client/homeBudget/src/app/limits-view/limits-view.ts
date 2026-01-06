import { Component, input, output } from '@angular/core';
import { Limit } from '../../models/Limit';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-limits-view',
  imports: [],
  templateUrl: './limits-view.html',
  styleUrl: './limits-view.css',
})
export class LimitsView {
  limits = input.required<Limit[]>();
  categories = input.required<Category[]>();
  update = output<string>();
  delete = output<string>();
  options: number = 0;

  getCategory(id: string): Category | undefined {
    return this.categories().find((c: Category) => c._id === id);
  }

  onUpdate(limitId: string) {
    this.update.emit(limitId);
  }

  onDelete(limitId: string) {
    this.delete.emit(limitId);
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
