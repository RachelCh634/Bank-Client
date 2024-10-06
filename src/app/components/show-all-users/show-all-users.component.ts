import { Component, NgModule, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { UserService } from '../../services/user.service';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-show-all-users',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, SidebarModule, AvatarModule, PanelModule, LoginComponent],
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.scss'],
})
export class ShowAllUsersComponent implements OnInit {

  users: any[] = [];
  isAdmin: boolean = false;
  constructor(private api: UserService) { }

  ngOnInit(): void {
    this.api.IsAdmin().subscribe((result) => {
      this.isAdmin = result;
    });

    this.api.GetAllUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  sendEmail(email: string) {
    window.location.href = `mailto:${email}`;
  }

  callPhone(phone: string) {
    window.location.href = `tel:${phone}`;
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.api.DeleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
    }
  }
}

