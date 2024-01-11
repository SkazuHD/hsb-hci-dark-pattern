import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import {MatBadgeModule} from "@angular/material/badge";
import {UserService} from "../../user.service";
import {SearchComponent} from "../../search/search.component";


@Component({
    selector: 'app-top-navigation',
    standalone: true,
    imports: [
        MatButtonModule, MatIconModule, MatTooltipModule, RouterLink, MatBadgeModule, SearchComponent
    ],
    templateUrl: './top-navigation.component.html',
    styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent {
    private userSerice: UserService = inject(UserService);
    private router: Router = inject(Router);

    get productCountInCart(): number {
        let cart = this.userSerice.getCart();
        if (!cart) {
            return 0;
        }
        return cart.positionen.reduce((acc, curr) => acc + curr.anzahl, 0);
    }


    navigateToHome() {
        this.router.navigate(['/home']);
    }
}
