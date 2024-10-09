import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-add-users-manager',
  standalone: true,
  imports: [ButtonModule, CommonModule, LoginComponent, DialogModule],
  templateUrl: './add-users-manager.component.html',
  styleUrls: ['./add-users-manager.component.scss']
})
export class AddUsersManagerComponent {
  isClick: boolean = false;
  isAdmin: boolean = false;
  sidebarVisible: boolean = false;

  @Output() userAdded = new EventEmitter<void>();

  addUserOrAdmin(isAdmin: boolean) {
    this.isClick = true;
    this.isAdmin = isAdmin;
    this.sidebarVisible = true;
  }

  onUserAdded() {
    this.sidebarVisible = false;
    this.userAdded.emit(); 
  }
}

