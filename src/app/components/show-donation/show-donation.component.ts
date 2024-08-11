import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { IDonation } from '../../models/donation.interface';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-show-donation',
  standalone: true,
  templateUrl: './show-donation.component.html',
  styleUrl: './show-donation.component.scss',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule,CommonModule,FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowDonationComponent {
  @Input() Donation?: IDonation;
  isLiked = false; 
  fasHeart = fasHeart;
  farHeart = farHeart;
  faShoppingCart = faShoppingCart;
  toggleLike() {
    this.isLiked = !this.isLiked;
  }
}
