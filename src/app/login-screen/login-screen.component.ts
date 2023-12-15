import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../user.service";
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
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'

})
export class LoginScreenComponent implements OnInit{
  private userService : UserService =  inject(UserService);
  router : Router = inject(Router);
  private loginForm: FormGroup = new FormGroup({});
  emailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required])
  matcher = new MyErrorStateMatcher();
  hide = true


  ngOnInit(): void {
    this.loginForm.addControl('email', this.emailFormControl)
    this.loginForm.addControl('passwort', this.passwordFormControl)
  }
  onLogin(){
    if(this.loginForm.valid){
      if(this.userService.onLogin(this.emailFormControl.value ?? '',this.passwordFormControl.value ?? '')){
        this.router.navigate(['/product'])
      }
    }
  }


}
