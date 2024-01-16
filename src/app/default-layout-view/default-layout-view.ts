import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
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
export class DefaultLayoutView implements OnInit{
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      window.scrollTo(0, 0);
    });
  }

}
