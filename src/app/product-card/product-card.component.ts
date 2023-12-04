import {Component, Input} from '@angular/core';
import {Product} from "../product.service";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({required: true}) product: Product;
}
