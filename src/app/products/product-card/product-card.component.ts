import {Component, inject, Input} from '@angular/core';
import {Product} from "../../product.service";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {CurrencyPipe, NgIf} from "@angular/common";
import {UserService} from "../../user.service";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        StarRatingComponent,
        NgIf,
        CurrencyPipe,
    ],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
    @Input({required: true}) product: Product;
    private router: Router = inject(Router);
    private userSerivce: UserService = inject(UserService);

    get discountedPrice(): string {
        return this.product.price.toFixed(2);
    }


    get unDiscountedPrice(): string {
        return (this.product.price * 2.5).toFixed(2);
    }

    navigateToProductDetails(productId: number) {
        // Use the Router service to navigate to the product details page
        this.router.navigate(['/product', productId]).then(
        );
    }

    addToCart() {
        this.userSerivce.addToCart(this.product, 1);
    }
}
