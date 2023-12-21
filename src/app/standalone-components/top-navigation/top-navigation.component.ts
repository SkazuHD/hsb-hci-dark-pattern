import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterLink} from "@angular/router";
import {MatBadgeModule} from "@angular/material/badge";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [
    MatButtonModule, MatIconModule, MatTooltipModule, RouterLink, MatBadgeModule
  ],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent {
  private userSerice: UserService = inject(UserService);
  private router: Router = inject(Router);

  get productCountInCart(): number {
    let cart = this.userSerice.getCart();
    if (!cart) {
      return 0;
    }
    return cart.positionen.reduce((acc, curr) => acc + curr.anzahl, 0);
  }

  get genderFromUser(): string {
    let gender = this.userSerice.getGender();
    if (gender == "m"){
      return "Herr"
    } else if(gender =="f"){
      return "Frau"
    }else{
      return ""
    }
  }

  get nameFromUser(): string {
    return this.userSerice.getName();
  }
  navigateToHome(){
    this.router.navigate(['/product']);
  }
}
