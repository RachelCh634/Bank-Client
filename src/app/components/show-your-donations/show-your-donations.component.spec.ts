import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowYourDonationsComponent } from './show-your-donations.component';

describe('ShowYourDonationsComponent', () => {
  let component: ShowYourDonationsComponent;
  let fixture: ComponentFixture<ShowYourDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowYourDonationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowYourDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
