import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DonationService } from '../../services/donation.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AddDonationComponent } from "../add-donation/add-donation.component";
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { SliderModule } from 'primeng/slider';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ShowYourDonationsComponent } from '../show-your-donations/show-your-donations.component';
import { TakeHoursComponent } from '../take-hours/take-hours.component';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, DialogModule, AddDonationComponent, SidebarModule, FormsModule, TreeSelectModule, SliderModule,
    InputIconModule, IconFieldModule, InputTextModule, DropdownModule, InputNumberModule, ConfirmPopupModule, ToastModule, ShowYourDonationsComponent,TakeHoursComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  constructor(public api: DonationService,private apiAuth: AuthService) { }
  @Output() filterChange = new EventEmitter<any>(); 
  selectedCity: any[] = [];
  selectedCategory: any[] = [];
  rangeHours: number = 0;
  searchText: string = '';
  
  
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

  CityArr: { label: string, value: string }[] = [
    { label: 'Jerusalem', value: 'Jerusalem' },
    { label: 'Tel Aviv', value: 'Tel Aviv' },
    { label: 'Haifa', value: 'Haifa' },
    { label: 'Rishon LeZion', value: 'Rishon LeZion' },
    { label: 'Petah Tikva', value: 'Petah Tikva' },
    { label: 'Ashdod', value: 'Ashdod' },
    { label: 'Netanya', value: 'Netanya' },
    { label: 'Beersheba', value: 'Beersheba' },
    { label: 'Holon', value: 'Holon' },
    { label: 'Bnei Brak', value: 'Bnei Brak' },
    { label: 'Ramat Gan', value: 'Ramat Gan' },
    { label: 'Ashkelon', value: 'Ashkelon' },
    { label: 'Rehovot', value: 'Rehovot' },
    { label: 'Bat Yam', value: 'Bat Yam' },
    { label: 'Kfar Saba', value: 'Kfar Saba' },
    { label: 'Herzliya', value: 'Herzliya' },
    { label: 'Ra\'anana', value: 'Ra\'anana' },
    { label: 'Hadera', value: 'Hadera' },
    { label: 'Lod', value: 'Lod' },
    { label: 'Nazareth', value: 'Nazareth' },
    { label: 'Modiin', value: 'Modiin' },
    { label: 'Acre', value: 'Acre' },
    { label: 'Nahariya', value: 'Nahariya' },
    { label: 'Eilat', value: 'Eilat' },
    { label: 'Tiberias', value: 'Tiberias' },
    { label: 'Kiryat Gat', value: 'Kiryat Gat' },
    { label: 'Rosh HaAyin', value: 'Rosh HaAyin' },
    { label: 'Afula', value: 'Afula' },
    { label: 'Sderot', value: 'Sderot' },
    { label: 'Yavne', value: 'Yavne' },
    { label: 'Dimona', value: 'Dimona' },
    { label: 'Safed', value: 'Safed' },
    { label: 'Karmiel', value: 'Karmiel' },
    { label: 'Beit Shemesh', value: 'Beit Shemesh' }
  ];

  onFilterChange() {
    this.filterChange.emit({
      category: this.selectedCategory,
      city: this.selectedCity,
      rangeHours: this.rangeHours,
      searchText:this.searchText
    });
  }

  resetFilters() {
    this.selectedCategory = [];
    this.selectedCity = [];
    this.searchText = '';
    this.rangeHours = 0;
    this.onFilterChange(); 
}
}
