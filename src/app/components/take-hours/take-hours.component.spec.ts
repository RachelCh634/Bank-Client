import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeHoursComponent } from './take-hours.component';

describe('TakeHoursComponent', () => {
  let component: TakeHoursComponent;
  let fixture: ComponentFixture<TakeHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
