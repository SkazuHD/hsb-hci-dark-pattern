import {Component, inject, OnInit} from '@angular/core';
import {LoadingSpinnerComponent} from "../standalone-components/loading-spinner/loading-spinner.component";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-dialog-promocode',
  standalone: true,
  imports: [
    LoadingSpinnerComponent,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    MatDialogClose,
    MatIconModule
  ],
  templateUrl: './dialog-promocode.component.html',
  styleUrl: './dialog-promocode.component.css'
})
export class DialogPromocodeComponent implements OnInit{
  data = inject(MAT_DIALOG_DATA)

  ngOnInit(): void {
    console.log(this.data)
  }
  get promoCode(): string {
    return this.data.code;
  }

}
