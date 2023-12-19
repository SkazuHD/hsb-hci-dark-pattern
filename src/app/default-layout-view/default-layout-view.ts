import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BottomFooterComponent} from "../standalone-components/bottom-footer/bottom-footer.component";
import {TopNavigationComponent} from "../standalone-components/top-navigation/top-navigation.component";

@Component({
  selector: 'app-default-view',
  standalone: true,
  imports: [
    RouterOutlet,
    BottomFooterComponent,
    TopNavigationComponent
  ],
  templateUrl: './default-layout-view.html',
  styleUrl: './default-layout-view.css'
})
export class DefaultLayoutView {

}
