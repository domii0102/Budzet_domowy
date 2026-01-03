import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionView } from './add-transaction-view';

describe('AddTransactionView', () => {
  let component: AddTransactionView;
  let fixture: ComponentFixture<AddTransactionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTransactionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransactionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
