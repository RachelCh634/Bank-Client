import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersManagerComponent } from './add-users-manager.component';

describe('AddUsersManagerComponent', () => {
  let component: AddUsersManagerComponent;
  let fixture: ComponentFixture<AddUsersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsersManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
