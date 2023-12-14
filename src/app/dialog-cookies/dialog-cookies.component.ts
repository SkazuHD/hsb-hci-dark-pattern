import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContainer,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {CookiesService} from "../cookies.service";

@Component({
  selector: 'app-dialog-cookies',
  standalone: true,
  imports: [
    MatDialogContainer,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './dialog-cookies.component.html',
  styleUrl: './dialog-cookies.component.css'
})
export class DialogCookiesComponent {
   router: Router = inject(Router);
   private cookieService: CookiesService = inject(CookiesService);
   dialogRef: MatDialogRef<DialogCookiesComponent> = inject(MatDialogRef);
   data = inject(MAT_DIALOG_DATA)

    acceptCookies(): void {
      this.router.navigate(['/shop']).then(
        () =>{
          // Set all form values to true
         let form =  this.data.form;
          Object.keys(form.controls).forEach(key => {
            form.controls[key].setValue(true);
          });
          this.dialogRef.close();
        }
      );
    }
    navigateLogin(): void {
      this.router.navigate(['/login']).then(() => {
        this.dialogRef.close();
      });
    }
    navigateCookieSettings(): void {
      this.cookieService.requestSettingDialog();
    }


}
