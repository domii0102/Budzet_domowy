import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsView } from './limits-view';

describe('LimitsView', () => {
  let component: LimitsView;
  let fixture: ComponentFixture<LimitsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
