import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {ProductGridComponent} from "../products/product-grid/product-grid.component";
import {Product, ProductService} from "../product.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-search-result',
    standalone: true,
    imports: [
        ProductGridComponent,
        NgIf
    ],
    templateUrl: './search-result.component.html',
    styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {
    products: Product[] = [];
    query: string = '';
    private productService: ProductService = inject(ProductService);
    private route: ActivatedRoute = inject(ActivatedRoute);

    get Results(): Product[] {
        return this.products;
    }

    ngOnInit(): void {
        this.route.queryParamMap
            .pipe(
                map(params => {
                        return params.get('query')
                    }
                ),
            )
            .subscribe((myQueryParam) => {
                    if (myQueryParam) {
                        this.query = myQueryParam;
                        this.productService.searchProducts(myQueryParam).subscribe(products => {
                            this.products = products;
                        });
                    }
                }
            );
    }

}
