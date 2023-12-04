import { Routes } from '@angular/router';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {AppComponent} from "./app.component";
import {ProductGridComponent} from "./product-grid/product-grid.component";

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent  },
  { path: 'product', component: ProductGridComponent},
  { path: 'register', component: AppComponent  },
  { path: 'login', component: AppComponent  },
  { path: 'logout', component: AppComponent  },
  { path: 'cart', component: AppComponent  },
  { path: 'checkout', component: AppComponent  },
  { path: 'shop', component: AppComponent },

];
