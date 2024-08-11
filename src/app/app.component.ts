import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowDonationComponent } from './components/show-donation/show-donation.component';
import { CommonModule } from '@angular/common';
import { ShowAllDonationComponent } from './components/show-all-donation/show-all-donation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ShowDonationComponent, ShowAllDonationComponent,FontAwesomeModule,TopNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-angular';
}
