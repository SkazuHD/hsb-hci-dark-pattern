import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import { UserService } from '../user.service';
import { Product, ProductService } from '../product.service';
import { filter } from 'rxjs';
import { StarRatingComponent } from '../products/star-rating/star-rating.component';
import {CurrencyPipe, NgIf} from "@angular/common";
import { LoadingSpinnerComponent } from "../standalone-components/loading-spinner/loading-spinner.component";


@Component({
    selector: 'app-purchase',
    standalone: true,
    templateUrl: './purchase.component.html',
    styleUrl: './purchase.component.css',
    imports: [RouterLink, NgIf, CurrencyPipe, MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, StarRatingComponent, LoadingSpinnerComponent]
})
export class PurchaseComponent {


  productId: number;
  product: Product; // Assuming you have a Product model
  furtherProducts: Product[];

  public showLoading: boolean = false;
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private userSerivce: UserService = inject(UserService);

  adresse = new FormControl('');


  get discountedPrice(): string {
    return this.product.price.toFixed(2);
  }

  get unDiscountedPrice(): string {
    return (this.product.price * 2.5).toFixed(2);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.getProduct();
      this.productService.getProductByCategory(this.product.category).subscribe(products => {
        this.furtherProducts = products.filter(product => product.id != this.productId);
      });
    });
  }


  navigateToProductDetails(productId: number) {
    // Use the Router service to navigate to the product details page
    this.router.navigate(['/product', productId]);
  }

    private getProduct() {
      this.productService.getProductById(1)
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


    buy(){
      this.loadingTimer()
    }

    addToCart() {
      this.userSerivce.addToCart(this.product, 1);
      this.loadingTimer();
    }

    loadingTimer(){
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;
      }, 500);
    }

}
