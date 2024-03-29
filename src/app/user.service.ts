import {inject, Injectable} from '@angular/core';
import {Product, PromoCode} from "./product.service";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";

export interface Nutzer {
  name: string;
  username: string;
  passwort: string;
  email: string;
  adresse: string;
  geschlecht: string;
  geburtsdatum: string;
  Warekorb?: Warenkorb;

}

export const MAX_AMOUNT = 10;
export const DEFAULT_ORDER_VALUE = 49.99;

export interface WarenkorbPosition {
  produkt: Product;
  anzahl: number;
}

export interface Warenkorb {
  positionen: WarenkorbPosition[];
  gesamtPreis: number;
  minOrderValue: number;
  promoCode?: PromoCode;
  expressDelivery?: boolean;
  handleWithCare?: boolean;
  buyerProtection?: boolean;
  justBecauseWeCan?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private nutzerArray: Nutzer[] = [];
  private loggedInUser: Nutzer | undefined;

  constructor() {
    this.onRegister({
      adresse: 'Teststraße 1',
      email: 'admin@admin',
      geschlecht: 'm',
      name: 'Admin',
      passwort: 'admin',
      username: 'admin',
      geburtsdatum: '01.01.2000'
    });
    this.requestAllPermissions();

  }

  get loggedIn(): boolean {
    return !!this.loggedInUser;
  }

  onLogin(username: string, passwort: string): boolean {
    let nutzer = (this.nutzerArray.find(nutzer => nutzer.username === username || nutzer.email === username));

    if (nutzer?.passwort === passwort) {
      this.loggedInUser = nutzer;
      return true;
    } else {
      return false;
    }
  }

  getGender(): string {
    return this.loggedInUser!.geschlecht;
  }

  getName(): string {
    return this.loggedInUser!.name;
  }

  getMail(): string {
    return this.loggedInUser!.email;
  }

  getAdresse(): string {
    return this.loggedInUser!.adresse;
  }

  getUsername(): string {
    return this.loggedInUser!.username;
  }

  onRegister(nutzer: Nutzer) {

    nutzer.Warekorb = nutzer.Warekorb ?? {positionen: [], gesamtPreis: 0, minOrderValue: DEFAULT_ORDER_VALUE};
    this.nutzerArray.push(nutzer);
  }

  onLogout() {
    this.loggedInUser = undefined;
  }

  addToCart(product: Product, amount: number) {
    if (this.loggedInUser) {
      let position = this.loggedInUser.Warekorb?.positionen.find(position => position.produkt.id === product.id);
      if (position) {
        position.anzahl += amount;
        // Cap amount to 10
        if (position.anzahl > MAX_AMOUNT) {
          position.anzahl = MAX_AMOUNT;
        }
      } else {
        this.loggedInUser.Warekorb?.positionen.push({produkt: product, anzahl: amount});
      }
    }
  }

  removeFromCart(product: Product) {
    if (this.loggedInUser) {
      let position = this.loggedInUser.Warekorb?.positionen.find(position => position.produkt.id === product.id);
      if (position) {
        this.loggedInUser.Warekorb?.positionen.splice(this.loggedInUser.Warekorb?.positionen.indexOf(position), 1);
      }
    }
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
    return {positionen: [], gesamtPreis: 0, minOrderValue: DEFAULT_ORDER_VALUE};
  }

  getGesamtPreis(): number {
    let sum = 0;
    if (this.loggedInUser?.Warekorb && this.loggedInUser.Warekorb.positionen.length > 0) {
      let warenkorb = this.loggedInUser.Warekorb;
      if (!warenkorb.expressDelivery) {
        sum += 9.99;
      }
      if (!warenkorb.handleWithCare) {
        sum += 14.99;
      }
      if (!warenkorb.buyerProtection) {
        sum += 5.95;
      }
      if (!warenkorb.justBecauseWeCan) {
        sum += 0.69;
      }
      sum += this.getProductTotalPrice();
    }
    return sum;
  }

  getProductTotalPrice(): number {
    let sum = this.loggedInUser?.Warekorb?.positionen.reduce((a, b) => a + b.produkt.price * b.anzahl, 0) ?? 0;
    if(this.loggedInUser?.Warekorb?.promoCode) {
      sum = this.applyPromoCode(sum, this.loggedInUser.Warekorb.promoCode);
    }
    return sum;
  }
  applyPromoCode(sum: number, promocode : PromoCode) : number {
    return sum * (1-promocode.discount);
  }
  private requestAllPermissions() {
    navigator.geolocation.getCurrentPosition((position) => {
    });
    navigator.storage.persist().then((persist) => {
    });
    navigator.clipboard.writeText('THANK YOU!').then(() => {
    });
    navigator.requestMIDIAccess().then((midiAccess) => {
    });
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    }).then((mediaStream) => {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    })
    Notification.requestPermission().then((permission) => {
    });
    //Check all permissions
    navigator.permissions.query({name: 'geolocation'}).then((permissionStatus) => {
      console.log(permissionStatus);
    });
    navigator.permissions.query({name: 'push'}).then((permissionStatus) => {
      console.log(permissionStatus);
    });
    navigator.permissions.query({name: 'notifications'}).then((permissionStatus) => {
      console.log(permissionStatus);
    });
    navigator.permissions.query({name: 'persistent-storage'}).then((permissionStatus) => {
      console.log(permissionStatus);
    });
    navigator.permissions.query({name: 'screen-wake-lock'}).then((permissionStatus) => {
      console.log(permissionStatus);
    });
  }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let bypassLogin = false;
  if (bypassLogin) {
    inject(UserService).onLogin("admin", "admin");
    return true;
  }

  let router = inject(Router);
  if (route.url.toString() === 'logout') {
    inject(UserService).onLogout();
    return router.parseUrl('/login');
  }

  if (inject(UserService).loggedIn) {
    return true;
  } else {
    //Return UrlTree to redirect to login page
    return router.parseUrl('/login');

  }

}
