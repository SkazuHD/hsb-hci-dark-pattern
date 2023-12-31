import {Component, inject} from '@angular/core';
import {
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

  public onSubmit() {
    if (this.email.value && this.email.valid) {
      //TODO : Save to User Profile
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
