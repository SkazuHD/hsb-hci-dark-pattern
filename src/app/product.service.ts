import {HttpClient} from "@angular/common/http";

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // Simulate an asynchronous operation with Observable.of
    return this.http.get('https://fakestoreapi.com/products') as Observable<Product[]>;



  }

  getProductById(id: number): Observable<Product | undefined> {
   // const product = this.products.find(p => p.id === id);
    //return of(product);
    return this.http.get('https://fakestoreapi.com/products/' + id) as Observable<Product>;
  }
}

