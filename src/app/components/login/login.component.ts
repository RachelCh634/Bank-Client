import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FloatLabelModule, InputTextModule, ButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  address: string | undefined;
  isUserAdded: boolean = false;
  @Output() userAdded = new EventEmitter<void>();

  constructor(private api: UserService) { }

  addUser(): void {
    const userData = {
      id: this.id,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      address: this.address
    };

    this.api.AddUser(userData).subscribe(
      (response) => {
        console.log('User added successfully', response);
        this.isUserAdded = true;

        setTimeout(() => {
          this.isUserAdded = false;
          this.userAdded.emit();
          this.id = undefined;
          this.firstname = undefined;
          this.lastname = undefined;
          this.email = undefined;
          this.address = undefined;
        }, 1000);
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }
}
