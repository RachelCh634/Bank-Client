import { Component, NgModule, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { UserService } from '../../services/user.service';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { LoginComponent } from '../login/login.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { AddUsersManagerComponent } from '../add-users-manager/add-users-manager.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-show-all-users',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, SidebarModule, AvatarModule, PanelModule, LoginComponent, ConfirmDialogModule, ToastModule, ButtonModule, DialogModule, InputTextareaModule, FormsModule, FloatLabelModule, AddUsersManagerComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.scss'],
})
export class ShowAllUsersComponent implements OnInit {
  constructor(private api: UserService, private userService: UserService, private confirmationService: ConfirmationService, private apiAuth: AuthService) { }
  users: any[] = [];
  isAdmin: boolean = false;
  sendMassage: boolean = false;
  message: string = '';
  isWork: boolean = false;
  showIsWork: boolean = false;
  disableBtn: boolean = false
  isWorkMassage: string = ''
  currentUser = {
    email: '',
    name: ''
  };
  userName: string | undefined;
  userEmail: string | undefined;
  currentUserId: string | null = null;


  ngOnInit(): void {
    this.disableBtn = this.apiAuth.isLoggedIn()
    this.api.IsAdmin().subscribe((result) => {
      this.isAdmin = result;
    });
    this.api.GetAllUsers().subscribe((data) => {
      console.log(data)
      this.users = data.sort((a: { role: string; Role: string; }, b: { role: string; Role: string; }) => {
        if (a.role === 'Admin' && b.role !== 'Admin') {
          return -1;
        } else if (a.role !== 'Admin' && b.role === 'Admin') {
          return 1;
        }
        return 0;
      });
    });
    this.api.CurrentUserId().subscribe((id) => {
      this.currentUserId = id;
    });
  }

  funSendMessage(email: string, name: string) {
    this.currentUser.email = email;
    this.currentUser.name = name;
    this.message = '';
    this.toggleSendMessage();
  }

  toggleSendMessage() {
    this.sendMassage = !this.sendMassage;
  }

  callPhone(phone: string) {
    window.location.href = `tel:${phone}`;
  }

  deleteUser(userId: string): void {
    this.api.DeleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
    });
  }

  sendEmail(email: string, name: string): void {
    this.userService.GetUserDetails().subscribe(
      (userDetails: { fullName: string, role: string, email: string }) => {
        if (userDetails != undefined) {
          this.userName = userDetails.fullName;
          this.userEmail = userDetails.email;
        }
        const emailParams = {
          from_email: this.userEmail,
          email_to: email,
          to_name: name,
          from_name: this.userName,
          message: this.message,
        };
        emailjs.send('service_x0yy2bj', 'template_ioe8vqq', emailParams, 'dMAR_TMXDE7_51FVk')
          .then((response: EmailJSResponseStatus) => {
            console.log('Email sent successfully!', response.status, response.text);
            this.isWork = true
            this.isWorkMassage = 'The email was sent successfully'
            this.showIsWork = true
            setTimeout(() => {
              this.toggleSendMessage();
            }, 2000);
          }, (error) => {
            console.error('Error sending email', error);
            this.isWorkMassage = 'Error sending email'
            this.showIsWork = true
            setTimeout(() => {
              this.toggleSendMessage();
            }, 2000);
          });
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  confirm(event: Event, userId: string) {
    let massage = 'Are you sure you want to delete this user account?';
    if (userId == this.currentUserId) {
      massage = 'Are you sure you want to delete your account?';
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: massage,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.deleteUser(userId)
      },
      reject: () => {
      }
    });
  }
}