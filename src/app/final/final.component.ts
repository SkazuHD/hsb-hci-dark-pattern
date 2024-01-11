import {Component, inject} from '@angular/core';
import {UserService} from "../user.service";

@Component({
    selector: 'app-final',
    standalone: true,
    templateUrl: './final.component.html',
    styleUrl: './final.component.css'
})
export class FinalComponent {
    private userService: UserService = inject(UserService);

    get name(): string {
        return this.userService.getName();
    }

    get email(): string {
        return this.userService.getMail();
    }

    get adresse(): string {
        return this.userService.getAdresse();
    }

    get WarenKorbGesamtPreis(): number {
        return this.userService.getGesamtPreis();
    }
}
