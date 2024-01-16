import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.css'
})
export class PromoBannerComponent {

}
