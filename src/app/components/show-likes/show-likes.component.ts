import { Component } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { TagModule } from 'primeng/tag';
import { forkJoin } from 'rxjs';
import { TakeHoursComponent } from '../take-hours/take-hours.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-show-likes',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, TakeHoursComponent, ButtonModule, SidebarModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './show-likes.component.html',
  styleUrl: './show-likes.component.scss'
})
export class ShowLikesComponent {
  constructor(private api: DonationService, private apiUser: UserService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  donations: any[] = [];
  allDonations: any[] = [];
  users: any[] = [];
  noResult: boolean = false

  ngOnInit(): void {
    forkJoin([
      this.apiUser.GetAllUsers(),
      this.api.GetAllDonations(),
      this.api.GetYourLikes()
    ]).subscribe(([users, donations, likes]) => {
      this.users = users;
      this.allDonations = donations;
      this.donations = likes;
      this.donations.forEach(d => {
        const updatedDonation = this.getDonationById(d.donationId);
        Object.assign(d, updatedDonation);
      });
      this.noResult = this.donations.length === 0;
    });
  }

  getDonationById(id: number) {
    const donation = this.allDonations.find(d => d.id === id);
    const user = this.users.find(user => user.id == donation.donorId);
    const details = {
      donationCategory: donation.donationCategory,
      hoursAvailable: donation.hoursAvailable,
      name: user.firstName + " " + user.lastName,
      phone: user.phone,
      isActive: donation.isActive
    }
    return details
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

  RemoveLike(donation: any) {
    this.api.AddLike(donation.donationId).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.donations = this.donations.filter(d => d.donationId !== donation.donationId);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Like removed successfully.' });
      },
      error: (error) => {
        console.error('Error:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove like.' });
      }
    });
  }
}