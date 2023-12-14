import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {ProductService} from "./product.service";
import {provideHttpClient} from "@angular/common/http";
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), ProductService, provideHttpClient(), {provide: LocationStrategy, useClass: PathLocationStrategy}],
};
