import { Component, Input, SimpleChanges } from '@angular/core';
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
import { ShowYourDonationsComponent } from '../show-your-donations/show-your-donations.component';
import { TakeHoursComponent } from '../take-hours/take-hours.component';
import { RatingModule } from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-show-all-donation',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, DialogModule, AddDonationComponent, SidebarModule, FormsModule, TreeSelectModule, SliderModule,
    InputIconModule, IconFieldModule, InputTextModule, DropdownModule, InputNumberModule, ConfirmPopupModule, ToastModule, ShowYourDonationsComponent, TakeHoursComponent, RatingModule, ConfirmDialogModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './show-all-donation.component.html',
  styleUrls: ['./show-all-donation.component.scss'],
})

export class ShowAllDonationComponent {

  constructor(public api: DonationService, private apiUser: UserService, private apiAuth: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  @Input() filteredDonations: any[] = [];
  sidebarVisible: boolean = false;
  selectedDonation: any = null;
  disableBtn: boolean = false
  dontAvailable: boolean = false
  isAdmin: boolean = false;
  likedDonations: { id: number, isLiked: boolean }[] = [];
  displayAddDonation: boolean = false;
  dontConnect: boolean = false
  currentUserId: string | null = null;
  noResult: boolean = false;
  showConfirmDialog: boolean = false

  ngOnInit(): void {
    this.disableBtn = this.apiAuth.isLoggedIn()
    this.apiUser.IsAdmin().subscribe((result) => {
      setTimeout(() => {
        this.isAdmin = result;
      });
    });
    
    this.apiUser.CurrentUserId().subscribe((id) => {
      this.currentUserId = id;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filteredDonations'] && changes['filteredDonations'].currentValue) {
      this.processFilteredDonations();
    }
  }

  processFilteredDonations(): void {
    this.filteredDonations.forEach(donation => {
      if (donation.isActive) {
        this.apiUser.GetUserById(donation.donorId).subscribe(user => {
          donation.firstName = user.firstName;
          donation.lastName = user.lastName;
          donation.city = user.city;
          donation.phone = user.phone;
        });
        this.checkIfLiked(donation.id);
      }
    });
  }
  getFilteredDonations() {
    const filtered = this.filteredDonations.filter(
      donation => donation.isActive == true && donation.donorId != this.currentUserId
    );

    this.noResult = filtered.length === 0;
    return filtered;
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

  openAddDonation() {
    if (this.apiAuth.isLoggedIn()) {
      this.displayAddDonation = !this.displayAddDonation
    }
    else {
      this.dontConnect = true
    }
  }

  addLike(Id: number) {
    this.api.AddLike(Id).subscribe({
      next: (response) => {
        console.log('Success:', response);
        const index = this.likedDonations.findIndex(donation => donation.id === Id);
        if (index > -1) {
          this.likedDonations[index].isLiked = !this.likedDonations[index].isLiked;
        } else {
          this.likedDonations.push({ id: Id, isLiked: true });
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  checkIfLiked(donationId: number) {
    this.api.IsLiked(donationId).subscribe(isLiked => {
      this.likedDonations.push({ id: donationId, isLiked: isLiked });
    });
  }

  isLiked(donationId: number): boolean {
    const likedProduct = this.likedDonations.find(donation => donation.id === donationId);
    return likedProduct ? likedProduct.isLiked : false;
  }

  deleteDonation(id: number) {
    this.api.DeleteDonation(id).subscribe((result) => {
      console.log(result)
    });
  }

  openTakeDonation(donation: any) {
    this.sidebarVisible = true
    this.selectedDonation = donation
  }

  toggleTakeHours() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this donation?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.deleteDonation(id);
        this.filteredDonations = this.filteredDonations.filter(d => d.id != id);
      },
      reject: () => {
      }
    });
  }
}
