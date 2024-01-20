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
export type PromoCode = {
  code: string;
  discount: number;
}


@Injectable({
    providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private promoCodes: PromoCode[] = [
    {code: 'DISCOUNT20', discount: 0.2},
  ];
  private adService: AdService = inject(AdService)
  private promoCodeTimer: any;

  constructor(private http: HttpClient) {
    // Comment out to not use the API
    this.promoCodeTimer = 5 * 60;
    setInterval(() => {
      this.promoCodeTimer--;
      if (this.promoCodeTimer <= 0) {
        this.promoCodes = this.promoCodes.filter(promoCode => promoCode.code !== 'DISCOUNT20');
        console.debug('Removed promo code')
      }
    }, 1000);

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
      let numberOfAds = Math.floor(products.length / 4) + 1;
      let ads: Ad[] = [];
      for (let i = 0; i < numberOfAds; i++) {
        ads.push(this.adService.requestAd());
      }
      ads = ads.sort(() => Math.random() - 0.5);
      const productsWithAds: (Product | Ad)[] = [];
      products.forEach((product, index) => {
        if (Math.random() > 0.5) {
          productsWithAds.push(product);
          if (index % 4 === 0 && ads.length > 0) {
            let ad = ads.pop();
            if (ad) {
              productsWithAds.push(ad);
            }
          }
        } else {
          if (index % 4 === 0 && ads.length > 0) {
            let ad = ads.pop();
            if (ad) {
              productsWithAds.push(ad);
            }
          }
          productsWithAds.push(product);
        }
      });
      console.debug('unused ads', ads)
      //Shuffle
      return productsWithAds
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

  isPromoCodeValid(code: string): boolean {
    return !!this.promoCodes.find(promoCode => promoCode.code === code);
  }
  getPromoCode(code: string): PromoCode | undefined {
    return this.promoCodes.find(promoCode => promoCode.code === code);
  }
  getPromoCodeTimer(): number {
    return this.promoCodeTimer;
  }

  generatePromoCode(email: string): PromoCode {
    const newPromoCode: PromoCode = {
      code: email.split('@')[0].toUpperCase() + Math.floor(Math.random() * 1000),
      discount: 0.3
    };
    this.promoCodes.push(newPromoCode);
    console.debug('Generated new promo code', newPromoCode)
    return newPromoCode;
  }
}
