import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYourDetailsComponent } from './edit-your-details.component';

describe('EditYourDetailsComponent', () => {
  let component: EditYourDetailsComponent;
  let fixture: ComponentFixture<EditYourDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditYourDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditYourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
