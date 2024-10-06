import { Component } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { TagModule } from 'primeng/tag';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-show-likes',
  standalone: true,
  imports: [CommonModule, CardModule,TagModule],
  templateUrl: './show-likes.component.html',
  styleUrl: './show-likes.component.scss'
})
export class ShowLikesComponent {
  donations: any[] = [];
  allDonations: any[] = [];
  users: any[] = [];
  constructor(private api: DonationService, private apiUser: UserService) { }

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
}