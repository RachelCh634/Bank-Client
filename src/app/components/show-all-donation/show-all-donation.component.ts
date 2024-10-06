import { Component, Input } from '@angular/core';
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
import { UserService } from '../../services/user.service';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-show-all-donation',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, DialogModule, AddDonationComponent, SidebarModule, FormsModule, TreeSelectModule, SliderModule,
    InputIconModule, IconFieldModule, InputTextModule, DropdownModule, InputNumberModule, ConfirmPopupModule, ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './show-all-donation.component.html',
  styleUrls: ['./show-all-donation.component.scss'],
})

export class ShowAllDonationComponent {

  constructor(public api: DonationService, private apiUser: UserService, private apiAuth: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  selectedCity: any[] = [];
  donations: any[] = [];
  filteredDonations: any[] = [];
  displayAddDonation: boolean = false;
  selectedCategory: any[] = [];
  searchText: string = '';
  rangeHours: number = 0;
  sidebarVisible: boolean = false;
  selectedDonation: any = null;
  selectedHours: number = 1;
  dontConnect: boolean = false
  likedDonations: { id: number, isLiked: boolean }[] = [];

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

  ngOnInit(): void {
    this.api.GetAllDonations().subscribe((data) => {
      this.donations = data;
      console.log(this.donations);
      
      this.donations.forEach(donation => {
        this.apiUser.GetUserById(donation.donorId).subscribe(user => {
          donation.firstName = user.firstName;
          donation.lastName = user.lastName;
          donation.city = user.city;
          donation.phone = user.phone;
        });
        this.checkIfLiked(donation.id);
      });
  
      this.filteredDonations = [...this.donations];
    });
  }
  checkIfLiked(donationId: number) {
    this.api.IsLiked(donationId).subscribe(isLiked => {
      console.log("isLiked", isLiked)
      this.likedDonations.push({ id: donationId, isLiked: isLiked });
    });
  }
  openAddDonation() {
    if (this.apiAuth.isLoggedIn()) {
      this.displayAddDonation = !this.displayAddDonation
    }
    else {
      this.dontConnect = true
    }
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

  openTakeDonation(donation: any) {
    this.sidebarVisible = true
    this.selectedDonation = donation
  }

  filterDonations() {
    const searchTerms = this.searchText.trim().toLowerCase().split(/\s+/);

    this.filteredDonations = this.donations.filter(donation => {
      const matchesCategory = this.selectedCategory.length === 0 || this.selectedCategory.some(category => category.value === donation.donationCategory);
      const matchesCity = this.selectedCity.length === 0 || this.selectedCity.some(city => city.value === donation.city);
      const matchesHours = donation.hoursAvailable >= this.rangeHours;
      const matchesSearch = searchTerms.every(term =>
        (donation.firstName && donation.firstName.toLowerCase().includes(term)) ||
        (donation.lastName && donation.lastName.toLowerCase().includes(term)) ||
        (donation.description && donation.description.toLowerCase().includes(term))
      );

      return matchesCategory && matchesCity && matchesHours && matchesSearch;
    });
  }
  getFilteredDonations() {
    return this.filteredDonations.filter(donation => donation.isActive == true);
  }

  reduceHours() {
    const donationId = this.selectedDonation.id;
    this.api.DeductAvailableHours(this.selectedHours, donationId).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.selectedDonation.hoursAvailable -= this.selectedHours;
        this.selectedHours = 1
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'We recommend contacting the donor before confirming the hours.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.reduceHours();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'The hours were taken successfully', life: 2000 });
        setTimeout(() => {
          this.sidebarVisible = false
        }, 2000);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  addLike(Id: number) {
    const index = this.likedDonations.findIndex(product => product.id === Id);
    if (index > -1) {
      this.likedDonations[index].isLiked = !this.likedDonations[index].isLiked;
    } else {
      this.likedDonations.push({ id: Id, isLiked: true });
    }
    this.api.AddLike(Id).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  isLiked(donationId: number): boolean {
    const likedProduct = this.likedDonations.find(donation => donation.id === donationId);
    return likedProduct ? likedProduct.isLiked : false;
  }
}
