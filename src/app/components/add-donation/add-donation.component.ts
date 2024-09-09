import { Component,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-add-donation',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule, ButtonModule, SelectButtonModule,DialogModule,DropdownModule],
  templateUrl: './add-donation.component.html',
  styleUrl: './add-donation.component.scss'
})
export class AddDonationComponent {
  DonationCategory: string | undefined;
  DonationCategoryArr: { label: string, value: string }[] = [
    { label: 'MakeUp', value: 'MakeUp' },
    { label: 'Photography', value: 'Photography' },
    { label: 'Music', value: 'Music' },
    { label: 'Hair styling', value: 'Hair styling' },
    { label: 'Babysitter', value: 'Babysitter' },
    { label: 'Baking & Cooking', value: 'Baking & Cooking' },
    { label: 'Maintenance', value: 'Maintenance' },
    { label: 'Household', value: 'Household' },
    { label: 'Transportation', value: 'Transportation' }
  ];
  HoursAvailable: number | undefined;
  description: string | undefined;

  constructor(private api: DonationService) { }

  ngOnInit(): void {
  }

  addDonation(): void {
    const donationData = {
      donorId:214901134,
      donationCategory: "Music",
      hoursAvailable: this.HoursAvailable,
      description: this.description
    };

    this.api.AddDonation(donationData).subscribe(
      (response) => {
        console.log('Donation added successfully', response);
      },
      (error) => {
        console.error('Error adding donation', error);
      }
    );
  }
}
