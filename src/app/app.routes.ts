import {Routes} from '@angular/router';
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {AppComponent} from "./app.component";
import {ProductGridComponent} from "./products/product-grid/product-grid.component";
import {LoginComponent} from "./standalone-components/login/login.component";
import {RegisterComponent} from "./standalone-components/register/register.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {DefaultLayoutView} from "./default-layout-view/default-layout-view";
import {PurchaseComponent} from './purchase/purchase.component';
import {authGuard} from "./user.service";
import {StartLayoutComponent} from './start-layout/start-layout.component';
import {SearchResultComponent} from "./search-result/search-result.component";
import {FinalComponent} from "./final/final.component";

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent},
            {path: 'logout', component: AppComponent, canActivate: [authGuard]},
            {
                path: '',
                canActivate: [authGuard],
                canActivateChild: [authGuard],
                children: [
                    {
                        path: '',
                        component: DefaultLayoutView,
                        children: [
                            {path: 'home', component: StartLayoutComponent},
                            {path: 'search', component: SearchResultComponent},
                            {path: 'product/:id', component: ProductDetailComponent},
                            {path: 'product', component: ProductGridComponent},
                            {path: 'cart', component: ShoppingCartComponent},
                            {path: 'checkout', component: AppComponent},
                            {path: 'privacy', component: AppComponent},
                            {path: 'purchase', component: PurchaseComponent},
                            {path: 'final', component: FinalComponent},
                            {path: '', redirectTo: 'home', pathMatch: 'full'}, // Redirect empty path to 'product'
                        ],
                    },
                ],
            },
        ],
    },
];
