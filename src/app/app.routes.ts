import {Routes} from '@angular/router';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {AppComponent} from "./app.component";
import {ProductGridComponent} from "./product-grid/product-grid.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {RegisterScreenComponent} from "./register-screen/register-screen.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ShopViewComponent} from "./shop-view/shop-view.component";
import { PurchaseComponent } from './purchase/purchase.component';
import {authGuard} from "./user.service";

export const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {path: 'register', component: RegisterScreenComponent},
      {path: 'login', component: LoginScreenComponent},
      {path: 'logout', component: AppComponent, canActivate: [authGuard]},
      {
        path: '', component: ShopViewComponent, canActivate: [authGuard], canActivateChild: [authGuard], children: [
          {path: 'product/:id', component: ProductDetailComponent},
          {path: 'product', component: ProductGridComponent},
          {path: 'cart', component: ShoppingCartComponent},
          {path: 'purchase', component: PurchaseComponent},
          {path: 'checkout', component: AppComponent},
          {path: 'privacy', component: AppComponent},
        ]
      },
    ]
  },

];
