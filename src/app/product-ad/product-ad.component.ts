import {Component, Input} from '@angular/core';
import {Ad} from "../ad.service";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {StarRatingComponent} from "../products/star-rating/star-rating.component";

@Component({
    selector: 'app-product-ad',
    standalone: true,
    imports: [
        CurrencyPipe,
        MatButtonModule,
        MatIconModule,
        NgIf,
        StarRatingComponent
    ],
    templateUrl: './product-ad.component.html',
    styleUrl: './product-ad.component.css'
})
export class ProductAdComponent {
    @Input({required: true}) ad: Ad;
    protected readonly alert = alert;
    protected readonly window = window;

    get discountedPrice(): string {
        return this.ad.price.toFixed(2);
    }

    get unDiscountedPrice(): string {
        return (this.ad.price * 2.5).toFixed(2);
    }
}
