import {Component, inject, OnInit} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../user.service";
import {NgIf} from "@angular/common";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login-screen',
    standalone: true,
    imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, RouterLink, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'

})
export class LoginComponent implements OnInit {
    router: Router = inject(Router);
    emailFormControl = new FormControl('', [Validators.required]);
    passwordFormControl = new FormControl('', [Validators.required])
    matcher = new MyErrorStateMatcher();
    hide = true
    private userService: UserService = inject(UserService);
    private loginForm: FormGroup = new FormGroup({});

    ngOnInit(): void {
        this.loginForm.addControl('email', this.emailFormControl)
        this.loginForm.addControl('passwort', this.passwordFormControl)
    }

    onLogin() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.valid) {
            if (this.userService.onLogin(this.emailFormControl.value ?? '', this.passwordFormControl.value ?? '')) {
                this.router.navigate(['/home'])
            } else {

            }
        }
    }


}
