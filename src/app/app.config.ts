import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';


import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ProductService} from "./product.service";
import {provideHttpClient} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideAnimations(), ProductService, provideHttpClient(), {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }, {
        provide: LOCALE_ID,
        useValue: 'de-DE' // 'de-DE' for Germany, 'fr-FR' for France ...
    },

    ],
};
