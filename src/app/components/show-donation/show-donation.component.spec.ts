import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDonationComponent } from './show-donation.component';

describe('ShowDonationComponent', () => {
  let component: ShowDonationComponent;
  let fixture: ComponentFixture<ShowDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
