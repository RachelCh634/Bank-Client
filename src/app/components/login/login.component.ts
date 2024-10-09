import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FloatLabelModule, InputTextModule, ButtonModule, CommonModule, DropdownModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  header: string | undefined;
  selectedCity: string | undefined;
  isUserAdded: boolean = false;
  isUserLoggedIn: boolean = false;
  massage: string = 'The User was added successfully!'
  @Output() userLoggedIn = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<void>();
  @Input() isAdmin: boolean = false;
  @Input() parent: string | undefined

  cities: string[] = [
    "Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva", "Eilat",
    "Ashdod", "Ashkelon", "Rishon LeZion", "Petah Tikva", "Netanya",
    "Holon", "Bnei Brak", "Herzliya", "Ramat Gan", "Kfar Saba",
    "Bat Yam", "Rehovot", "Hadera", "Raanana", "Lod", "Modi'in",
    "Modi'in Illit"
  ];

  constructor(private api: UserService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.header = this.editHeader();
  }
  private resetFields(): void {
    this.id = undefined;
    this.firstname = undefined;
    this.lastname = undefined;
    this.email = undefined;
    this.phone = undefined;
    this.selectedCity = undefined;
  }

  login(): void {
    const loginData = {
      mail: this.email,
      id: this.id
    };

    this.api.login(loginData).subscribe(
      (response) => this.handleLoginSuccess(response),
      (error) => console.error('Error logging in', error)
    );
  }

  private handleLoginSuccess(response: any): void {
    const token = response.token;
    console.log(token);
    this.authService.setToken(token);
    this.isUserLoggedIn = true;

    setTimeout(() => {
      this.isUserLoggedIn = false;
      this.userLoggedIn.emit();
      this.resetFields();
    }, 1000);
  }

  editHeader(): string {
    console.log('isAdmin:', this.isAdmin);
    if (this.parent === 'addUserOrAdmin') {
      return 'Add user / Admin';
    }
    return 'Sign Up';
  }

  addUser(): void {
    const userData = {
      id: this.id,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone,
      city: this.selectedCity,
    };
    if (this.isAdmin) {
      this.api.AddAdmin(userData).subscribe(
        response => {
          console.log('User added successfully', response);
          this.handleUserAddedSuccess(response);
        },
        error => console.error('Error adding user', error)
      );
      this.massage = 'The Admin was added successfully!'
    }
    else {
      this.api.AddUser(userData).subscribe(
        response => {
          console.log('User added successfully', response);
          this.handleUserAddedSuccess(response);
          if (this.parent != 'addUserOrAdmin') {
            this.userService.login({ id: this.id, mail: this.email }).subscribe(
              loginResponse => {
                const token = loginResponse.token;
                console.log(token);
                this.authService.setToken(token);
                this.isUserLoggedIn = true;
              },
              error => console.error('Error logging in', error)
            );
          }
        },
        error => console.error('Error adding user', error)
      );
    }
  }

  private handleUserAddedSuccess(response: any): void {
    this.isUserAdded = true;
    setTimeout(() => {
      this.isUserAdded = false;
      this.userAdded.emit();
      this.resetFields();
    }, 1000);
  }
}
