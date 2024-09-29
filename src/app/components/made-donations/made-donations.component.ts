import { Component } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-made-donations',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './made-donations.component.html',
  styleUrl: './made-donations.component.scss'
})

export class MadeDonationsComponent {
  donations: any[] = [];
  allDonations: any[] = [];
  users: any[] = [];
  constructor(private api: DonationService, private apiUser: UserService) { }
  ngOnInit(): void {
    this.api.GetYourTakes().subscribe((data) => {
      this.donations = data;
    });
    this.api.GetAllDonations().subscribe((data) => {
      this.allDonations = data;
    })
    this.apiUser.GetAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  getDetails(donationId: number) {
    const donation = this.allDonations.find(d => d.id == donationId);
    const user = this.users.find(user => user.id == donation.donorId);
    const details = {
      category: donation.donationCategory,
      active:donation.isActive,
      name: user.firstName + " " + user.lastName,
      phone: user.phone
    };
    return details;
  }

  getImage(category: string): string {
    console.log(category)
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
