import { Component } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddDonationComponent } from '../add-donation/add-donation.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-show-all-donation',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule,SidebarModule,AddDonationComponent,DialogModule],
  templateUrl: './show-all-donation.component.html',
  styleUrls: ['./show-all-donation.component.scss'],
})
export class ShowAllDonationComponent {

  displayAddDonation: boolean = false;

  openAddDonation() {
    this.displayAddDonation = !this.displayAddDonation;
  }

  donations: any[] = [];

  constructor(private api: DonationService) { }

  ngOnInit(): void {
    this.api.GetAllDonations().subscribe((data) => {
      console.log(data);
      this.donations = data;
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
  onDonationAdded() {
    this.displayAddDonation = false;
  }
}
