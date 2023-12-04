export interface Product {
  id: number;
  name: string;
  price: number;
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 20.49 },
    { id: 3, name: 'Product 3', price: 15.99 }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    // Simulate an asynchronous operation with Observable.of
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
}

