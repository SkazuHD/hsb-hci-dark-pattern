import {inject, Injectable} from '@angular/core';
import {Product} from "./product.service";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";

export interface Nutzer {
  name: string;
  username: string;
  passwort: string;
  email: string;
  adresse: string;
  geschlecht: string;
  Warekorb?: Warenkorb;

}

export interface WarenkorbPosition {
  produkt: Product;
  anzahl: number;
}

export interface Warenkorb {
  positionen: WarenkorbPosition[];
  gesamtPreis: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private nutzerArray: Nutzer[] = [];
  private loggedInUser: Nutzer | undefined;

  onLogin(username: string, passwort: string): boolean {
    let nutzer = (this.nutzerArray.find(nutzer => nutzer.username === username || nutzer.email === username));

    if (nutzer?.passwort === passwort) {
      this.loggedInUser = nutzer;
      return true;
    } else {
      return false;
    }
  }

  onRegister(nutzer: Nutzer) {

    nutzer.Warekorb = nutzer.Warekorb ?? {positionen: [], gesamtPreis: 0};
    this.nutzerArray.push(nutzer);
  }

  onLogout() {
    this.loggedInUser = undefined;
  }

  get loggedIn(): boolean {
    return !!this.loggedInUser;
  }

  addToCart(product: Product, amount: number) {

  }

  removeFromCart(product: Product, amount: number) {

  }

  updateCart(Warenkorb: Warenkorb) {
    if (this.loggedInUser)
      this.loggedInUser.Warekorb = Warenkorb;
  }

  getCart(): Warenkorb {
    if (this.loggedInUser?.Warekorb) {
      this.loggedInUser.Warekorb.gesamtPreis = this.getGesamtPreis();
      return this.loggedInUser.Warekorb;
    }
    return {positionen: [], gesamtPreis: 0}
  }

  getGesamtPreis(): number {
    return this.loggedInUser?.Warekorb?.positionen.reduce((a, b) => a + b.produkt.price * b.anzahl, 0) ?? 0;
  }

  constructor() {
    this.onRegister({
      adresse: 'Teststraße 1',
      email: 'admin@admin',
      geschlecht: 'm',
      name: 'Admin',
      passwort: 'admin',
      username: 'admin',
      Warekorb: {
        positionen: [
          {
            produkt: {
              id: 1,
              title: 'Testprodukt',
              description: 'Testbeschreibung',
              price: 10,
              image: 'https://picsum.photos/200/300',
              rating: {
                rate: 5,
                count: 1
              },
              category: 'Testkategorie'
            },
            anzahl: 1
          },
          {
            produkt: {
              id: 2,
              title: 'Testprodukt2',
              description: 'Testbeschreibung2',
              price: 102,
              image: 'https://picsum.photos/200/250',
              rating: {
                rate: 5,
                count: 12
              },
              category: 'Testkategorie'
            },
            anzahl: 12
          },

          {
            produkt: {
              id: 3,
              title: 'Testprodukt2',
              description: 'Testbeschreibung2',
              price: 1022,
              image: 'https://picsum.photos/250/250',
              rating: {
                rate: 5,
                count: 122
              },
              category: 'Testkategorie'
            },
            anzahl: 122
          }
        ],
        gesamtPreis: 102
      }
    })
    // this.onLogin("admin", "admin")
  }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (route.url.toString() === 'logout') {
    inject(UserService).onLogout();
    inject(Router).navigate(['/login']).then(value => {
      return false;
    });
  }
  if (inject(UserService).loggedIn) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return true;
  }

}
