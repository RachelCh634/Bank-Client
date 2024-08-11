import { Component } from '@angular/core';
import { IDonation } from '../../models/donation.interface';
import { CommonModule } from '@angular/common';
import { ShowDonationComponent } from '../show-donation/show-donation.component';

@Component({
  selector: 'app-show-all-donation',
  standalone: true,
  imports: [CommonModule,ShowDonationComponent],
  templateUrl: './show-all-donation.component.html',
  styleUrl: './show-all-donation.component.scss'
})
export class ShowAllDonationComponent {
  public donations:IDonation[]=[
    {
      Id: 1,
      DonorId: 214901134,
      DonationCategory: 'MakeUp',
      HoursAvailable: 15,
      Rating: 0
    },
    {
      Id: 2,
      DonorId: 145268569,
      DonationCategory: 'Learning',
      HoursAvailable: 10,
      Rating: 0
    },
    {
      Id: 3,
      DonorId: 585326458,
      DonationCategory: 'Playing',
      HoursAvailable: 5,
      Rating: 0
    },
    {
      Id: 4,
      DonorId: 332563256,
      DonationCategory: 'Hairstyles',
      HoursAvailable: 4,
      Rating: 0
    },
    {
      Id: 5,
      DonorId: 327847382,
      DonationCategory: 'Corrections',
      HoursAvailable: 5,
      Rating: 0
    },
    {
      Id: 5,
      DonorId: 327847382,
      DonationCategory: 'Corrections',
      HoursAvailable: 5,
      Rating: 0
    },
    {
      Id: 5,
      DonorId: 327847382,
      DonationCategory: 'Corrections',
      HoursAvailable: 5,
      Rating: 0
    },
    {
      Id: 5,
      DonorId: 327847382,
      DonationCategory: 'Corrections',
      HoursAvailable: 5,
      Rating: 0
    }
  ]
}
