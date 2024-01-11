import {Component, inject, Input, OnInit} from '@angular/core';
import {ProductCardComponent} from "../product-card/product-card.component";
import {Product, ProductService} from "../../product.service";
import {NgForOf, NgIf} from "@angular/common";
import {NewsletterService} from "../../dialogs/newsletter.service";
import {UserService} from '../../user.service';
import {Ad} from "../../ad.service";
import {PopupService} from '../../dialogs/popup.service';

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

    @Input() productsWithAds: (Product | Ad)[];
    private userSerice: UserService = inject(UserService);
    private productService: ProductService = inject(ProductService);
    private newsLetterService: NewsletterService = inject(NewsletterService)
    private popUpService: PopupService = inject(PopupService);

    get genderFromUser(): string {
        let gender = this.userSerice.getGender();
        if (gender == "m") {
            return "Herr"
        } else if (gender == "f") {
            return "Frau"
        } else {
            return ""
        }
    }

    get nameFromUser(): string {
        return this.userSerice.getName();
    }

    ngOnInit() {
        this.newsLetterService.requestDialog();
        if (!this.productsWithAds) {
            this.productService.getProductsAndAds().subscribe(products => {
                this.productsWithAds = products
            });
        }
        this.popUpService.requestDialog();
    }
}
