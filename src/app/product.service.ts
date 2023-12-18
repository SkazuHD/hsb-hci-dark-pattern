import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {map, Observable, of, tap} from 'rxjs';

export interface Product {
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
    console.debug('Fetching all products from API')
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      tap(products => this.products = products), map(products => products.map(product => {
        product.count = Math.round(Math.random() * 15) + 1;
        return product;
      }))
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    if (this.products.length > 0) {
      console.debug('Returning cached product by id')
      return of(this.products.find(product => product.id === id));
    }
    console.debug('Fetching product from API by id')

    return this.http.get<Product>('https://fakestoreapi.com/products/' + id).pipe(tap(product => {
      product.count = Math.round(Math.random() * 15);
      return product;
    }));
  }

  getAvailableCategories(): Observable<string[]> {
    return this.http.get('https://fakestoreapi.com/products/categories') as Observable<string[]>;
  }

  getProductByCategory(category: string): Observable<Product[]> {
    return this.http.get('https://fakestoreapi.com/products/category/' + category) as Observable<Product[]>;
  }


}

