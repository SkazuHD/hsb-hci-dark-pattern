import {Injectable} from '@angular/core';
import {Product} from "./product.service";
import {HttpClient} from "@angular/common/http";

export type Ad = Product & {
    id: number;
};

@Injectable({
    providedIn: 'root'
})
export class AdService {
    private adCounter: number = 0;
    private ads: Ad[] = [];

    constructor(private http: HttpClient) {
        this.http.get<Ad[]>('/assets/ads.json').subscribe(ads => {
            this.ads = ads
            this.adCounter = Math.floor(Math.random() * this.ads.length) + 1;
        });

    }

    requestAd(): Ad {
        // Return a random ad
        return this.ads[this.adCounter++ % this.ads.length];
    }


}
