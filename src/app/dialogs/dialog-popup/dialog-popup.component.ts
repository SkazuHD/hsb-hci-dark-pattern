import {Component, inject, OnInit} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe, NgIf} from "@angular/common";
import {LoadingSpinnerComponent} from "../../standalone-components/loading-spinner/loading-spinner.component";
import {StarRatingComponent} from '../../products/star-rating/star-rating.component';
import {Product, ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {filter} from 'rxjs';

@Component({
    selector: 'app-dialog-popup',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgIf,
        LoadingSpinnerComponent,
        MatButtonModule,
        StarRatingComponent,
        MatIconModule,
        CurrencyPipe
    ],
    templateUrl: './dialog-popup.component.html',
    styleUrl: './dialog-popup.component.css'
})
export class DialogPopupComponent implements OnInit {
    productId: number;
    display: any;
    product: Product; // Assuming you have a Product model
    furtherProducts: Product[];

    loading: boolean = false;
    productsArray: Product[];
    private dialogRef: MatDialogRef<DialogPopupComponent, String> = inject(MatDialogRef);
    private productService: ProductService = inject(ProductService);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private userSerivce: UserService = inject(UserService);

    get discountedPrice(): string {
        return this.product.price.toFixed(2);
    }

    get unDiscountedPrice(): string {
        return (this.product.price * 2.5).toFixed(2);
    }

    ngOnInit() {
        this.timer(Math.floor(Math.random() * 50) + 10);
        this.route.params.subscribe(params => {
            this.productId = +params['id'];
            this.getProduct();
            this.productService.getProductByCategory(this.product.category).subscribe(products => {
                this.furtherProducts = products.filter(product => product.id != this.productId);
            });
        });
    }

    addToCart() {
        this.userSerivce.addToCart(this.product, 1);
        this.dialogRef.close();
    }

    onClose() {
        this.loading = true;
        setTimeout(() => {
            this.dialogRef.close();
            this.loading = false;
        }, 3000);
    }

    timer(minute: number) {
        // let minute = 1;
        let seconds: number = minute;
        let textSec: any = "0";
        let statSec: number = minute;

        const prefix = minute < 10 ? "0" : "";

        const timer = setInterval(() => {
            seconds--;
            if (statSec != 0) statSec--;
            else statSec = 59;

            if (statSec < 10) {
                textSec = "0" + statSec;
            } else textSec = statSec;

            this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

            if (seconds == 0) {
                this.dialogRef.close();
                clearInterval(timer);
            }
        }, 1000);
    }

    private getProduct() {
        this.productService.getProductById(this.randomId())
            .pipe(
                filter((obj): obj is Product => obj !== undefined)
            )
            .subscribe(
                (product) => {
                    this.product = product;
                    if (!this.product) {
                        this.router.navigate(['/product']);
                    }
                },
            );

    }

    private randomId(): number {
        return Math.floor(Math.random() * this.productService.productsAmount()) + 1;
    }
}
