import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryView } from './add-category-view';

describe('AddCategoryView', () => {
  let component: AddCategoryView;
  let fixture: ComponentFixture<AddCategoryView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
