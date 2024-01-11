import {Component, inject, Input} from '@angular/core';
import {Ad} from "../ad.service";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {StarRatingComponent} from "../products/star-rating/star-rating.component";
import {LoadingSpinnerComponent} from "../standalone-components/loading-spinner/loading-spinner.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogAdComponent} from "../dialog-ad/dialog-ad.component";

@Component({
    selector: 'app-product-ad',
    standalone: true,
    imports: [
        CurrencyPipe,
        MatButtonModule,
        MatIconModule,
        NgIf,
        StarRatingComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './product-ad.component.html',
    styleUrl: './product-ad.component.css'
})
export class ProductAdComponent {
    @Input({required: true}) ad: Ad;
    showLoading: boolean = false;
    loadingText: string = "Sie werden weitergeleitet...";
    protected readonly alert = alert;
    protected readonly window = window;
    private dialog = inject(MatDialog);

    get discountedPrice(): string {
        return this.ad.price.toFixed(2);
    }

    get unDiscountedPrice(): string {
        return (this.ad.price * 2.5).toFixed(2);
    }

    onClick() {
        this.showLoading = true;
        setTimeout(() => {
            this.showLoading = false;
            //Open Dialog
            this.dialog.open(DialogAdComponent, {
                width: 'min(640px,100%)',
                autoFocus: true,
                closeOnNavigation: true,
                disableClose: false,
                data: this.ad
            })
        }, 5000);
    }
}
