import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadeDonationsComponent } from './made-donations.component';

describe('MadeDonationsComponent', () => {
  let component: MadeDonationsComponent;
  let fixture: ComponentFixture<MadeDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MadeDonationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadeDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
