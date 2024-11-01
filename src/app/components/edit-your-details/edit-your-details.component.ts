import { Component, EventEmitter, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-edit-your-details',
  standalone: true,
  imports: [CardModule, CommonModule, FormsModule, ButtonModule, InputTextModule, FloatLabelModule, DropdownModule],
  templateUrl: './edit-your-details.component.html',
  styleUrl: './edit-your-details.component.scss'
})
export class EditYourDetailsComponent {
  constructor(private authService: AuthService, private userService: UserService) { }
  id: string | undefined
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  selectedCity: string | undefined;
  originalUser: any | undefined;
  update: boolean = false;
  notUpdate: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();

  cities: string[] = [
    "Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva", "Eilat",
    "Ashdod", "Ashkelon", "Rishon LeZion", "Petah Tikva", "Netanya",
    "Holon", "Bnei Brak", "Herzliya", "Ramat Gan", "Kfar Saba",
    "Bat Yam", "Rehovot", "Hadera", "Raanana", "Lod", "Modi'in",
    "Modi'in Illit"
  ];

  toggleCloseDialog() {
    this.closeDialog.emit();
  }

  ngOnInit() {
    this.userService.GetCurrentUser().subscribe(
      response => {
        if (response) {
          this.originalUser = { ...response };
          this.id = response.id
          this.firstname = response.firstName;
          this.lastname = response.lastName;
          this.email = response.email;
          this.phone = response.phone;
          this.selectedCity = response.city;
        } else {
          console.log('No user found.');
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  updateUser() {
    const change = this.firstname !== this.originalUser?.firstName ||
      this.lastname !== this.originalUser?.lastName || 
      this.email !== this.originalUser?.email ||
      this.phone !== this.originalUser?.phone ||
      this.selectedCity !== this.originalUser?.city;

    if (change) {
      const updatedUser = {
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        city: this.selectedCity,
      };
      this.userService.UpdateUser(updatedUser).subscribe(
        response => {
          console.log('User updated successfully:', response);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
      this.notUpdate = false
      this.update = true
      setTimeout(() => {
        this.toggleCloseDialog();
      }, 2000);
    }
    else {
      this.notUpdate = true
    }
  }
}
