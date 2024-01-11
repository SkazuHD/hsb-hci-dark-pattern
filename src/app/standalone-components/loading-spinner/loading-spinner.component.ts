import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [
        NgClass,
        MatProgressSpinnerModule
    ],
    templateUrl: './loading-spinner.component.html',
    styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
    @Input({required: true}) showLoading: boolean = false;
    @Input() text: string = "";
}
