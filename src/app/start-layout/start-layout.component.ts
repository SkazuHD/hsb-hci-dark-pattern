import {Component, inject} from '@angular/core';
import {ProductGridComponent} from '../products/product-grid/product-grid.component';
import {TopNavigationComponent} from '../standalone-components/top-navigation/top-navigation.component';
import {UserService} from '../user.service';
import {PromoBannerComponent} from "../promo-banner/promo-banner.component";

@Component({
  selector: 'app-start-layout',
  standalone: true,
  imports: [ProductGridComponent, TopNavigationComponent, PromoBannerComponent],
  templateUrl: './start-layout.component.html',
  styleUrl: './start-layout.component.css'
})
export class StartLayoutComponent {

  private userSerice: UserService = inject(UserService);

  get genderFromUser(): string {
    let gender = this.userSerice.getGender();
    if (gender == "m") {
      return "Herr"
    } else if (gender == "f") {
      return "Frau"
    } else {
      return ""
    }
  }

  get nameFromUser(): string {
    return this.userSerice.getName();
  }


}
