import {Component, inject, Input} from '@angular/core';
import {Product} from "../product.service";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";


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
  @Input({ required: true }) product: Product;
  private router: Router = inject(Router);
  navigateToProductDetails(productId: number) {
    // Use the Router service to navigate to the product details page
    this.router.navigate(['/product', productId]);
  }
}
