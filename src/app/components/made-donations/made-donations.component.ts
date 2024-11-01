import { Component } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-made-donations',
  standalone: true,
  imports: [CommonModule, CardModule,ButtonModule,RatingModule,FormsModule],
  templateUrl: './made-donations.component.html',
  styleUrl: './made-donations.component.scss'
})

export class MadeDonationsComponent {
  donations: any[] = [];
  noResult:boolean=false
  constructor(private api: DonationService, private apiUser: UserService) { }
  ngOnInit(): void {
    this.api.GetYourTakes().subscribe((data) => {
      this.donations = data;
      this.noResult = this.donations.length === 0;
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
  onRate(donationId: number,rating:number): void {
    this.api.RateDonation(donationId, rating).subscribe({
      next: (result) => console.log('Rating saved:', result),
      error: (err) => console.error('Error saving rating:', err)
    });
  }
}
