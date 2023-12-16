import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatIconModule
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating: number;
  @Input() ratingCount: number;

  get fullStars(): number[] {
    return Array(Math.floor(this.rating));
  }

  get partialStar(): number {
    return Math.round((this.rating % 1) * 10) / 10;
  }

  get emptyStars(): number[] {
    return Array(Math.floor(5 - this.rating));
  }
}
