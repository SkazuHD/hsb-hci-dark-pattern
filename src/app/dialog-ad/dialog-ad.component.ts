import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CurrencyPipe, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Ad} from "../ad.service";

@Component({
    selector: 'app-dialog-ad',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
        MatDialogClose,
        CurrencyPipe
    ],
    templateUrl: './dialog-ad.component.html',
    styleUrl: './dialog-ad.component.css'
})
export class DialogAdComponent {
    dialogRef: MatDialogRef<DialogAdComponent> = inject(MatDialogRef);
    data = inject(MAT_DIALOG_DATA) as Ad

    get discountedPrice(): string {
        return this.data.price.toFixed(2);
    }

    get unDiscountedPrice(): string {
        return (this.data.price * 2.5).toFixed(2);
    }
}
