import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AddDonationComponent } from '../add-donation/add-donation.component';
import { ShowAllUsersComponent } from '../show-all-users/show-all-users.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [MenubarModule, SidebarModule, LoginComponent, AddDonationComponent, ShowAllUsersComponent, DialogModule, FormsModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopNavComponent implements OnInit {
  items: MenuItem[] = [];
  sidebarVisible: boolean = false;
  id: string | undefined;
  isUserIdValid: boolean = false;
  visible: boolean = false;
  users: any[] = [];
  showMessage: boolean = false;
  isLoggedIn: boolean = false;
  userName: string | undefined
  userRole: string | undefined
  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('authToken')) {
      this.updateName();
      this.isLoggedIn = true
    }
    this.updateMenuItems();
    this.userService.GetAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  private updateMenuItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Our Partners',
            icon: 'pi pi-users',
            command: () => this.router.navigate(['AllUsers'])
          },
          {
            label: 'Home Page',
            icon: 'pi pi-align-center',
            command: () => this.router.navigate(['']),
          },
        ]
      },
      {
        label: 'All Donations',
        icon: 'pi pi-list',
        command: () => this.router.navigate(['AllDonations'])
      },
      this.isLoggedIn ?
        {
          label: this.userRole === 'Admin'? this.userName + ' Admin' : this.userName,
          icon: 'pi pi-user',
          items: [
            {
              label: 'Edit Your Profile',
              icon: 'pi pi-user-edit'
            },
            {
              label: 'Like',
              icon: 'pi pi-heart',
              command: () => this.router.navigate(['ShowYourLikes'])
            },
            {
              label: 'My Donations',
              icon: 'pi pi-bars',
              command: () => this.router.navigate(['ShowYourDonations'])
            },
            {
              label: 'Made Donations',
              icon: 'pi pi-list-check',
              command: () => this.router.navigate(['YourMadeDonations'])
            },
            {
              label: 'LogOut',
              icon: 'pi pi-sign-out',
              command: () => {
                this.handleLogout();
                this.router.navigate(['']);
              }
            },
            ...(this.userRole === 'Admin' ? [
              {
                label: 'Management',
                icon: 'pi pi-cog',
                items: [
                  {
                    label: 'Delete Users',
                    icon: 'pi pi-user-minus',
                    command: () => this.router.navigate(['DeleteUsers'])
                  },
                  {
                    label: 'Delete Donations',
                    icon: 'pi pi-trash',
                    command: () => this.router.navigate(['DeleteDonations'])
                  }
                ]
              }
            ] : [])
          ]
        } :
        {
          label: 'Sign In',
          icon: 'pi pi-sign-in',
          command: () => this.showDialog()
        },
    ];
  }

  handleLogout() {
    this.authService.logout();
    this.userName = undefined;
    this.isLoggedIn = false
    this.updateMenuItems();
  }

  checkUserId() {
    const user = this.validateUserId(this.id);
    if (user) {
      this.userService.login({ id: this.id, mail: user.email }).subscribe(
        response => {
          this.authService.setToken(response.token);
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
            this.visible = false;
          }, 2000);
          this.updateName();
          this.isLoggedIn = true;
        },
        error => {
          console.error('Error logging in', error);
        }
      );
    } else {
      this.isUserIdValid = false;
      this.sidebarVisible = true;
      this.visible = false;
      this.id = undefined;
    }
  }

  validateUserId(id: string | undefined): any {
    if (!id) return false;
    return this.users.find(user => user.id == id);
  }

  showDialog() {
    this.visible = true;
    this.isUserIdValid = true;
    this.sidebarVisible = false;
    this.id = undefined;
  }

  signUp() {
    this.visible = false;
    this.isUserIdValid = false;
    this.sidebarVisible = true;
    this.id = undefined;
  }

  onUserAdded() {
    this.sidebarVisible = false;
    this.isLoggedIn = true;
    this.updateMenuItems();
    this.updateName();
  }

  updateName() {
    this.userService.GetUserDetails().subscribe(
      (userDetails: { fullName: string, role: string , email:string }) => {
        if (userDetails != undefined) {
          this.userName = userDetails.fullName;
          this.userRole = userDetails.role;
          console.log(this.userRole)
        }
        this.updateMenuItems();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}


