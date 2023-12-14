import { Routes } from '@angular/router';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {AppComponent} from "./app.component";
import {ProductGridComponent} from "./product-grid/product-grid.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {RegisterScreenComponent} from "./register-screen/register-screen.component";

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent  },
  { path: 'product', component: ProductGridComponent},
  { path: 'register', component: RegisterScreenComponent  },
  { path: 'login', component: LoginScreenComponent  },
  { path: 'logout', component: AppComponent  },
  { path: 'cart', component: AppComponent  },
  { path: 'checkout', component: AppComponent  },
  { path: 'shop', component: AppComponent },
  { path: 'privacy', component: AppComponent },
];
