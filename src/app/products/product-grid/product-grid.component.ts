import {Component, inject, OnInit} from '@angular/core';
import {ProductCardComponent} from "../product-card/product-card.component";
import {Product, ProductService} from "../../product.service";
import {NgForOf, NgIf} from "@angular/common";
import {NewsletterService} from "../../dialogs/newsletter.service";
import { UserService } from '../../user.service';
import {Ad} from "../../ad.service";
import { PopupService } from '../../dialogs/popup.service';

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


  private userSerice: UserService = inject(UserService);
  productsWithAds: (Product | Ad)[] = [];
  private productService: ProductService = inject(ProductService);
  private newsLetterService: NewsletterService = inject(NewsletterService)
  private popUpService : PopupService = inject(PopupService);

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
    this.newsLetterService.requestDialog();
    this.productService.getProductsAndAds().subscribe(products =>
    {this.productsWithAds = products
    console.log(products)});
    this.popUpService.requestDialog();
  }

  get genderFromUser(): string {
    let gender = this.userSerice.getGender();
    if (gender == "m"){
      return "Herr"
    } else if(gender =="f"){
      return "Frau"
    }else{
      return ""
    }
  }

  get nameFromUser(): string {
    return this.userSerice.getName();
  }
}
