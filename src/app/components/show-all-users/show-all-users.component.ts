import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-show-all-users',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule,SidebarModule],
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.scss'],
})

export class ShowAllUsersComponent {

  users: any[] = [];

  constructor(private api: UserService) { }

  ngOnInit(): void {
    this.api.GetAllUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }
}

