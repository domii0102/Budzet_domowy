import { Component, input, output, ElementRef, HostListener } from '@angular/core';
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
  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.options === 1) {
        console.log('Clicked outside - closing options');
        this.options = 0;
      }
    }
  }
  onUpdate(categoryId: string) {
    this.update.emit(categoryId);
    this.options = 0;
  }

  onDelete(categoryId: string) {
    this.delete.emit(categoryId);
    this.options = 0;
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
