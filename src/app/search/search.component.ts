import {Component, inject} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        RouterLink
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {subscriptSizing: 'dynamic'}}]

})
export class SearchComponent {
    value: string = '';
    private router: Router = inject(Router);

    onSearch() {
        this.router.navigate(["/search"], {queryParams: {query: this.value}});
    }
}
