import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {CookiesService} from "./dialogs/cookies.service";
import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {TopNavigationComponent} from "./standalone-components/top-navigation/top-navigation.component";
import {BottomFooterComponent} from "./standalone-components/bottom-footer/bottom-footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopNavigationComponent, BottomFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({position: 'relative'}),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({right: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({right: '100%'}))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Shop';
  private CookiesService: CookiesService = inject(CookiesService);

  ngOnInit(): void {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
    this.CookiesService.requestDialog();

  }
}
