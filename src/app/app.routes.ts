import { Routes } from '@angular/router';
import { ShowAllUsersComponent } from './components/show-all-users/show-all-users.component';
import { ShowAllDonationComponent } from './components/show-all-donation/show-all-donation.component';
import { HomeComponent } from './components/home/home.component';
import { ShowYourDonationsComponent } from './components/show-your-donations/show-your-donations.component';
import { MadeDonationsComponent } from './components/made-donations/made-donations.component';

export const routes: Routes = [
    { path: 'AllUsers', component: ShowAllUsersComponent },
    { path: 'AllDonations', component: ShowAllDonationComponent },
    { path: 'ShowYourDonations', component: ShowYourDonationsComponent },
    { path: 'YourMadeDonations', component: MadeDonationsComponent },
    { path: '', component: HomeComponent },
];