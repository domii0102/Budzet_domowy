import { Component, input } from '@angular/core';
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

  getCategory(id: string): Category | undefined {
    return this.categories().find((c: Category) => c._id === id);
  }

}
