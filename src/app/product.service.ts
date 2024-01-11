import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {map, Observable, of, tap} from 'rxjs';
import {Ad, AdService} from "./ad.service";

export type Product = {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    title: string;
    count?: number;
    rating: {
        rate: number;
        count: number;
    };
}


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private products: Product[] = [];
    private adService: AdService = inject(AdService)

    constructor(private http: HttpClient) {
        // Comment out to not use the API
        /*this.products =[{
          title: 'Debug Product',
          description: 'This is a debug product',
          category: 'Debug',
          id: 0,
          image: 'https://via.placeholder.com/150',
          price: 0,
          rating: {
            rate: 0,
            count: 0
          },
          count: 0,
        }as Product];
        */
    }

    getProducts(): Observable<Product[]> {
        if (this.products.length > 0) {
            console.debug('Returning all cached products')
            return of(this.products);
        }
        return this.http.get<Product[]>('/assets/products.json').pipe(
            tap(products => this.products = products), map(products => products.map(product => {
                product.count = Math.round(Math.random() * 15) + 1;
                return product;
            }))
        );
    }

    getProductsAndAds(): Observable<(Product | Ad)[]> {
        return this.getProducts().pipe(map(products => {
            const productsWithAds: (Product | Ad)[] = [];
            products.forEach((product, index) => {
                productsWithAds.push(product);
                if (index % 5 === 0) {
                    productsWithAds.push(this.adService.requestAd());
                }
            });
            //Shuffle
            return productsWithAds.sort(() => Math.random() - 0.5);
        }));
    }

    getProductById(id: number): Observable<Product | undefined> {
        if (this.products.length > 0) {
            console.debug('Returning cached product by id')
            return of(this.products.find(product => product.id === id));
        } else {
            return this.getProducts().pipe(map(products => products.find(product => product.id === id)));
        }

    }

    getProductByCategory(category: string): Observable<Product[]> {
        if (this.products.length > 0) {
            return of(this.products.filter(product => product.category === category));
        } else {
            return this.getProducts().pipe(map(products => products.filter(product => product.category === category)));
        }
    }

    searchProducts(searchTerm: string): Observable<Product[]> {
        let result: Product[] = [];
        this.products.forEach(product => {
            if (product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
                result.push(product);
            }
        });
        console.debug(result)
        return of(result);
    }

    productsAmount(): number {
        return this.products.length;
    }
}

