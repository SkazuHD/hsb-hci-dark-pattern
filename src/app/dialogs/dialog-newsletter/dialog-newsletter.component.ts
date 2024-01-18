import {Component, inject} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoadingSpinnerComponent} from "../../standalone-components/loading-spinner/loading-spinner.component";
import {ProductService, PromoCode} from "../../product.service";
import {DialogPromocodeComponent} from "../../dialog-promocode/dialog-promocode.component";

@Component({
  selector: 'app-dialog-newsletter',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    LoadingSpinnerComponent
  ],
  templateUrl: './dialog-newsletter.component.html',
  styleUrl: './dialog-newsletter.component.css'
})
export class DialogNewsletterComponent {
  email = new FormControl('', [Validators.email, Validators.required]);
  loading: boolean = false;
  private dialogRef: MatDialogRef<DialogNewsletterComponent, String> = inject(MatDialogRef);
// ...
  private productService: ProductService = inject(ProductService);
  private dialogService: MatDialog = inject(MatDialog);
  promoCode: PromoCode | undefined;

  public onSubmit() {
    if (this.email.value && this.email.valid) {
      this.promoCode = this.productService.generatePromoCode(this.email.value);
      this.dialogService.open(DialogPromocodeComponent, {
        data: this.promoCode,
        disableClose: true,
      });
      this.dialogRef.close(this.email.value);
    } else {
      this.email.markAsTouched();
    }
  }


  onClose() {
    this.loading = true;
    setTimeout(() => {
      this.dialogRef.close();
      this.loading = false;
    }, 3000);
  }
}
