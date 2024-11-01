import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FiltersComponent } from '../filters/filters.component';
import { ShowAllDonationComponent } from '../show-all-donation/show-all-donation.component';

@Component({
  selector: 'app-get-filtered-donations',
  standalone: true,
  imports: [FiltersComponent, ShowAllDonationComponent],
  templateUrl: './get-filtered-donations.component.html',
  styleUrls: ['./get-filtered-donations.component.scss']
})
export class GetFilteredDonationsComponent implements OnInit {
  allDonations: any[] = [];
  filteredDonations: any[] = [];
  selectedCategory: any[] = [];
  selectedCity: any[] = [];
  rangeHours: number = 0;
  searchText: string = '';

  constructor(
    public api: DonationService,
    private apiUser: UserService,
    private apiAuth: AuthService
  ) { }

  ngOnInit(): void {
    this.api.GetAllDonations().subscribe(
      (data) => {
        this.allDonations = data || [];
        this.filteredDonations = [...this.allDonations];
      },
      (error) => {
        console.error('Error fetching donations:', error);
      }
    );
  }

  onFilterUpdate(filters: any) {
    this.selectedCategory = filters.category || [];
    this.selectedCity = filters.city || [];
    this.rangeHours = filters.rangeHours || 0;
    this.searchText = filters.searchText || '';
    this.filterDonations();
  }

  filterDonations() {
    const searchTerms = this.searchText.trim().toLowerCase().split(/\s+/);
    this.filteredDonations = this.allDonations.filter(donation => {
      const matchesCategory = this.selectedCategory.length === 0 ||
        this.selectedCategory.some(category => category.value === donation.donationCategory);

      const matchesCity = this.selectedCity.length === 0 ||
        this.selectedCity.some(city => city.value === donation.city);

      const matchesHours = donation.hoursAvailable >= this.rangeHours;

      const matchesSearch = searchTerms.every(term =>
        (donation.firstName && donation.firstName.toLowerCase().includes(term)) ||
        (donation.lastName && donation.lastName.toLowerCase().includes(term)) ||
        (donation.description && donation.description.toLowerCase().includes(term))
      );

      return matchesCategory && matchesCity && matchesHours && matchesSearch;
    });
  }
}
