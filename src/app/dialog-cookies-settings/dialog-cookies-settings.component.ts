import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-dialog-cookies-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButtonToggleModule,
    MatIconModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    NgForOf,
    KeyValuePipe,
    MatSelectModule,
    NgIf
  ],
  templateUrl: './dialog-cookies-settings.component.html',
  styleUrl: './dialog-cookies-settings.component.css'
})
export class DialogCookiesSettingsComponent implements OnInit {
  dialogRef: MatDialogRef<DialogCookiesSettingsComponent> = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA)
  cookieForm: FormGroup

  ngOnInit(): void {
    this.cookieForm = this.data.form;
  }

  getFormControlByName(name: string): FormControl {
    return this.cookieForm.get(name) as FormControl;
  }

  onSubmit(): void {
    this.cookieForm.markAllAsTouched();
    if (this.cookieForm.valid) {
      console.log('Formular ist gültig');
      this.dialogRef.close(true);
    } else {
      console.log('Formular ist ungültig');
    }
  }

  onAcceptAll(): void {
    for (const control of Object.values(this.cookieForm.controls)) {
      control.setValue(true);
    }
    this.onSubmit();
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}



