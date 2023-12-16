import {Component, inject, OnInit} from '@angular/core';
import {ProductCardComponent} from "../product-card/product-card.component";
import {Product, ProductService} from "../product.service";
import {NgForOf, NgIf} from "@angular/common";
import {NewsletterService} from "../newsletter.service";

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgForOf,
    NgIf,
  ],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent implements OnInit {


  products: Product[];
  private productService: ProductService = inject(ProductService);
  private newsLetterService: NewsletterService = inject(NewsletterService);

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
    this.newsLetterService.requestDialog();
  }
}
