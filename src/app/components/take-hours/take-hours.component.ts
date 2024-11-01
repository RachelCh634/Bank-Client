import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-take-hours',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputNumberModule, CommonModule, ToastModule, ConfirmPopupModule,DialogModule],
  templateUrl: './take-hours.component.html',
  styleUrl: './take-hours.component.scss'
})
export class TakeHoursComponent {

  constructor(public api: DonationService, private apiUser: UserService, private apiAuth: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  @Input() selectedDonation: any;
  selectedHours: number = 1;
  dontAvailable: boolean = false
  @Output() closeDialog = new EventEmitter<void>();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDonation'] && changes['selectedDonation'].currentValue) {
      this.apiUser.GetUserById(this.selectedDonation.donorId).subscribe(user => {
        this.selectedDonation.firstName = user.firstName;
        this.selectedDonation.lastName = user.lastName;
        this.selectedDonation.city = user.city;
        this.selectedDonation.phone = user.phone;
      });
    }
  }

  reduceHours() {
    const donationId = this.selectedDonation.id;
    this.api.DeductAvailableHours(this.selectedHours, donationId).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.selectedDonation.hoursAvailable -= this.selectedHours;
        this.selectedHours = 1
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  checkHoursAvailable(event: Event) {
    this.apiUser.CountOfHoursAvailable().subscribe({
      next: (hoursAvailable) => {
        if (hoursAvailable < this.selectedHours) {
          this.dontAvailable = true
          setTimeout(() => {
            this.dontAvailable = false;
            this.closeDialog.emit();
          }, 2000);
        } else {
          this.confirm(event);
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'We recommend contacting the donor before confirming the hours.',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.reduceHours();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'The hours were taken successfully', life: 2000 });
        setTimeout(() => {
          this.closeDialog.emit();
        }, 2000);
      },
      reject: () => { 
        setTimeout(() => {
          this.closeDialog.emit();
        }, 500);
      }
    });
  }

  getImage(category: string): string {
    switch (category) {
      case 'MakeUp':
        return '/assets/images/makeup.png';
      case 'Photography':
        return '/assets/images/camera.png';
      case 'Music':
        return '/assets/images/music.png';
      case 'Hair styling':
        return '/assets/images/Hair styling.png';
      case 'Babysitter':
        return '/assets/images/Babysitter.png';
      case 'Baking & Cooking':
        return '/assets/images/Baking cooking.png';
      case 'Maintenance':
        return '/assets/images/maintenance.png';
      case 'Household':
        return '/assets/images/household.png';
      case 'Transportation':
        return '/assets/images/Transportation.png';
      default:
        return '/assets/images/music.png';
    }
  }
}
