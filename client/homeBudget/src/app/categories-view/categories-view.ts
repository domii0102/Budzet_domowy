import { Component, input } from '@angular/core';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-categories-view',
  imports: [],
  templateUrl: './categories-view.html',
  styleUrl: './categories-view.css',
})
export class CategoriesView {
  categories = input<Category[]>();

}
