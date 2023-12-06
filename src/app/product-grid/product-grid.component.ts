import {Component, inject, OnInit} from '@angular/core';
import {ProductCardComponent} from "../product-card/product-card.component";
import {Product, ProductService} from "../product.service";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgForOf,
  ],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent implements OnInit{


  private productService: ProductService = inject(ProductService);
  products: Product[];

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
