import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'; 
import { InputTextModule } from 'primeng/inputtext';  
import { FloatLabelModule } from 'primeng/floatlabel';  
import { ShowAllDonationComponent } from './components/show-all-donation/show-all-donation.component';
import { ShowAllUsersComponent } from './components/show-all-users/show-all-users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    FontAwesomeModule,
    TopNavComponent,
    ShowAllDonationComponent,
    MenubarModule,
    ButtonModule, 
    InputTextModule, 
    FloatLabelModule,
    ShowAllUsersComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-angular';
}
