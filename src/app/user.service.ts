import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
