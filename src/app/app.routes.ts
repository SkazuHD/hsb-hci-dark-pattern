import { Routes } from '@angular/router';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent  },
  { path: 'register', component: AppComponent  },
  { path: 'login', component: AppComponent  },
  { path: 'logout', component: AppComponent  },
  { path: 'cart', component: AppComponent  },
  { path: 'checkout', component: AppComponent  },
  { path: 'shop', component: AppComponent },

];
