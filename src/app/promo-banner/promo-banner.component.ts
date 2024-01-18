import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {ProductService} from "../product.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf
  ],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.css'
})
export class PromoBannerComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  timer: number = 0;
  ngOnInit(): void {
    this.timer = this.productService.getPromoCodeTimer()
    setInterval(() => {
      this.timer = this.productService.getPromoCodeTimer()
    }, 500);
  }

  get timerMinutes(): string
  {
    let minutes = Math.floor(this.timer / 60);
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  }
  get timerSeconds(): string {
    let seconds = this.timer % 60;
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
  }

}
