import { Injectable } from '@angular/core';
import {Product} from "./product.service";

export type Ad = Product & {
  id: number;
};
@Injectable({
  providedIn: 'root'
})
export class AdService {
  private ads: Ad[] = [];
  constructor() {
    // Create random ads
    for (let i = 0; i < 10; i++) {
      this.ads.push({
        id: i + 1000,
        title: 'Ad ' + i,
        description: 'This is an ad',
        category: 'Ad',
        image: 'https://via.placeholder.com/150',
        price: 0,
        rating: {
          rate: 0,
          count: 0
        },
        count: 0,
      });
    }
  }
  requestAd(): Ad {
    // Return a random ad
    return this.ads[Math.floor(Math.random() * this.ads.length)];
  }


}
