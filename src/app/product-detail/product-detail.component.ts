import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, ProductService} from '../product.service';
import {CurrencyPipe, NgIf} from "@angular/common";
import {filter} from "rxjs";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {UserService} from "../user.service";


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    StarRatingComponent,
    CurrencyPipe,


  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  productId: number;
  product: Product; // Assuming you have a Product model

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
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.getProduct();
    });
  }

  navigateToWarenkorb(productId: number) {
    this.userSerivce.addToCart(this.product, 1);
    this.router.navigate(['/cart']);
  }

  addToCart() {
    this.userSerivce.addToCart(this.product, 1);
  }

  private getProduct() {
    this.productService.getProductById(this.productId)
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
}
