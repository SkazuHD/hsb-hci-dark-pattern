import { Injectable } from '@angular/core';
import {Product} from "./product.service";

export interface Nutzer{
  name: string;
  username : string;
  passwort : string;
  email : string;
  adresse : string;
  geschlecht : string;
  Warekorb? : Warenkorb;

}
export interface WarenkorbPosition{
    produkt : Product;
    anzahl : number;
}

export interface Warenkorb{
    positionen : WarenkorbPosition[];
    gesamtPreis : number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private nutzerArray :Nutzer[] = [];
  private loggedInUser : Nutzer | undefined;

  onLogin(username : string, passwort: string):boolean{
    let nutzer  = (this.nutzerArray.find(nutzer => nutzer.username === username || nutzer.email === username));

    if (nutzer?.passwort === passwort) {
        this.loggedInUser = nutzer;
        this.loggedInUser.Warekorb = {
            positionen: [],
            gesamtPreis: 0
        }
        console.log(this.loggedInUser);
        return true;
      }else {
        return false;
      }
  }

  onRegister(nutzer:Nutzer){
    console.log(nutzer);
    this.nutzerArray.push(nutzer);
  }

    onLogout(){
        this.loggedInUser = undefined;
    }

    addToCart(product: Product, amount: number) {

    }
    removeFromCart(product: Product, amount: number) {

    }
    getCart():Warenkorb{
      return this.loggedInUser?.Warekorb ?? {positionen: [], gesamtPreis: 0}
    }

  constructor() {
    this.nutzerArray.push({
        adresse: 'Teststraße 1',
        email: 'admin@admin',
        geschlecht: 'm',
        name: 'Admin',
        passwort: 'admin',
        username: 'admin'
    })
  }
}
