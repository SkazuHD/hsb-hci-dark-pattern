import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BottomFooterComponent} from "../bottom-footer/bottom-footer.component";
import {TopNavigationComponent} from "../top-navigation/top-navigation.component";

@Component({
  selector: 'app-standalone-view',
  standalone: true,
  imports: [
    RouterOutlet,
    BottomFooterComponent,
    TopNavigationComponent
  ],
  templateUrl: './shop-view.component.html',
  styleUrl: './shop-view.component.css'
})
export class ShopViewComponent {

}
