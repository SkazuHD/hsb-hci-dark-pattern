import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product, ProductService} from '../product.service';
import {NgIf} from "@angular/common";
import {filter} from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgIf
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.getProduct();
    });
  }

  private getProduct() {
    this.productService.getProductById(this.productId)
      .pipe(
        filter((obj): obj is Product => obj !== undefined)
      )
      .subscribe(
        (product) => {
          this.product = product;
        },
      );
    if (this.product === undefined) {
      this.router.navigate(['/product']);
    }
  }
}
