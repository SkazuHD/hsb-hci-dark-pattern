import { Routes } from '@angular/router';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {AppComponent} from "./app.component";
import {ProductGridComponent} from "./product-grid/product-grid.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {RegisterScreenComponent} from "./register-screen/register-screen.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ShopViewComponent} from "./shop-view/shop-view.component";

export const routes: Routes = [
  {path: '', component: ShopViewComponent, children: [
      { path: 'product/:id', component: ProductDetailComponent  },
      { path: 'product', component: ProductGridComponent},
      { path: 'logout', component: AppComponent  },
      { path: 'cart', component: ShoppingCartComponent  },
      { path: 'checkout', component: AppComponent  },
      { path: 'shop', component: AppComponent },
      { path: 'privacy', component: AppComponent },
  ]},
  { path: 'register', component: RegisterScreenComponent  },
  { path: 'login', component: LoginScreenComponent },
];
