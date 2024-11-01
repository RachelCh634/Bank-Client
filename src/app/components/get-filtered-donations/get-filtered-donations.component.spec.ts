import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFilteredDonationsComponent } from './get-filtered-donations.component';

describe('GetFilteredDonationsComponent', () => {
  let component: GetFilteredDonationsComponent;
  let fixture: ComponentFixture<GetFilteredDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetFilteredDonationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFilteredDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
