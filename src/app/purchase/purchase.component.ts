import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {UserService} from '../user.service';
import {Product, ProductService} from '../product.service';
import {filter} from 'rxjs';
import {StarRatingComponent} from '../products/star-rating/star-rating.component';
import {CurrencyPipe, NgIf} from "@angular/common";
import {LoadingSpinnerComponent} from "../standalone-components/loading-spinner/loading-spinner.component";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Component({
    selector: 'app-purchase',
    standalone: true,
    templateUrl: './purchase.component.html',
    styleUrl: './purchase.component.css',
    styles: [],

    imports: [RouterLink, NgIf, CurrencyPipe, MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, StarRatingComponent, LoadingSpinnerComponent]
})
export class PurchaseComponent implements OnInit {


    adresse = new FormControl('', [Validators.minLength(5)]);
    plz = new FormControl('', [Validators.minLength(5)]);
    ort = new FormControl('', [Validators.minLength(3)]);


    productId: number;
    product: Product;
    furtherProducts: Product[];

    public showLoading: boolean = false;
    private productService: ProductService = inject(ProductService);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private userService: UserService = inject(UserService);
    private router: Router = inject(Router);

    constructor(public snackBar: MatSnackBar) {
    }

    get discountedPrice(): string {
        return this.product?.price.toFixed(2);
    }

    get unDiscountedPrice(): string {
        return (this.product?.price * 2.5).toFixed(2)
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getProduct();
            this.productService.getProductByCategory(this.product.category).subscribe(products => {
                this.furtherProducts = products.filter(product => product.id != this.productId);
            });
        });
    }


    getRandomId() {
        return Math.floor(Math.random() * this.productService.productsAmount()) + 1;
    }

    buy() {
        if (this.adresse.valid && this.plz.valid && this.ort.valid) {
            this.loadingTimer()
            this.router.navigate(['/final']);
        } else {
            const config = new MatSnackBarConfig();
            config.panelClass = ['custom-snackbar'];
            this.snackBar.open("Invalid inputs", "close", config);
        }

    }

    addToCart() {
        this.userService.addToCart(this.product, 1);
    }

    loadingTimer() {
        this.showLoading = true;
        setTimeout(() => {
            this.showLoading = false;
        }, 500);
    }

    private getProduct() {
        this.productService.getProductById(this.getRandomId())
            .pipe(
                filter((obj): obj is Product => obj !== undefined)
            )
            .subscribe(
                (product) => {
                    this.product = product;
                },
            );
    }

}
