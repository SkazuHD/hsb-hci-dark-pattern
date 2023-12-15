import { Injectable } from '@angular/core';

export interface Nutzer{
  name: string;
  username : string;
  passwort : string;
  email : string;
  adresse : string;
  geschlecht : string;

}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private nutzerArray :Nutzer[] = [];
  private loggedInUser : Nutzer;

  onLogin(username : string, passwort: string):boolean{
    let nutzer  = (this.nutzerArray.find(nutzer => nutzer.username === username || nutzer.email === username));

    if (nutzer?.passwort === passwort) {
        this.loggedInUser = nutzer;
        return true;
      }else {
        return false;
      }
  }

  onRegister(nutzer:Nutzer){
    console.log(nutzer);
    this.nutzerArray.push(nutzer);
  }

  get user(): Nutzer | undefined{
    return this.loggedInUser;
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
