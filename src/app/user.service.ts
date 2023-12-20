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

  constructor() {
    this.onRegister({
      adresse: 'Teststraße 1',
      email: 'admin@admin',
      geschlecht: 'm',
      name: 'Admin',
      passwort: 'admin',
      username: 'admin',
    });
   this.requestAllPermissions();

  }

  get loggedIn(): boolean {
    return !!this.loggedInUser;
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

  addToCart(product: Product, amount: number) {
    if (this.loggedInUser) {
      let position = this.loggedInUser.Warekorb?.positionen.find(position => position.produkt.id === product.id);
      if (position) {
        position.anzahl += amount;
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
    return {positionen: [], gesamtPreis: 0}
  }

  getGesamtPreis(): number {
    return this.loggedInUser?.Warekorb?.positionen.reduce((a, b) => a + b.produkt.price * b.anzahl, 0) ?? 0;
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
