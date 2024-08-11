import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllDonationComponent } from './show-all-donation.component';

describe('ShowAllDonationComponent', () => {
  let component: ShowAllDonationComponent;
  let fixture: ComponentFixture<ShowAllDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
