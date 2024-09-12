import { Component,CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DonationService } from '../../services/donation.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-add-donation',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule, ButtonModule, SelectButtonModule,DialogModule,DropdownModule,CommonModule],
  templateUrl: './add-donation.component.html',
  styleUrl: './add-donation.component.scss'
})
export class AddDonationComponent {
  DonationCategory: object | undefined;
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
  DonationCategoryValue: string | undefined;
  isDonationAdded: boolean = false;
  @Output() donationAdded = new EventEmitter<void>();

  constructor(private api: DonationService) { }

  addDonation(): void {
    if (this.DonationCategory && 'value' in this.DonationCategory) {
      this.DonationCategoryValue = (this.DonationCategory as { value: string }).value;
    }
    const donationData = {
      donorId:214901134,
      donationCategory: this.DonationCategoryValue,
      hoursAvailable: this.HoursAvailable,
      description: this.description
    };

    this.api.AddDonation(donationData).subscribe(
      (response) => {
        console.log('Donation added successfully', response);
        this.isDonationAdded = true;
        setTimeout(() => {
          this.isDonationAdded = false;
          this.donationAdded.emit();
          this.description=undefined;
          this.HoursAvailable=undefined;
          this.DonationCategory=undefined;

        }, 2000);
      },
      (error) => {
        console.error('Error adding donation', error);
      }
    );
  }
}
