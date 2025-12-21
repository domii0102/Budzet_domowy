import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLimitView } from './add-limit-view';

describe('AddLimitView', () => {
  let component: AddLimitView;
  let fixture: ComponentFixture<AddLimitView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLimitView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLimitView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
