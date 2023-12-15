import { Component } from '@angular/core';
import {inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {Nutzer, UserService} from "../user.service";
import {Router, RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.css'
})

export class RegisterScreenComponent {
  private UserService: UserService = inject(UserService);
  private nutzer: Nutzer;
  router: Router = inject(Router);
  nameGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  usernameGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  password1Group = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  password2Group = this._formBuilder.group({
    forthCtrl: ['', Validators.required],
  });
  email1Group = this._formBuilder.group({
    fifthCtrl: ['', [Validators.required, Validators.email]],
  });
  email2Group = this._formBuilder.group({
    sixthCtrl: ['', [Validators.required, Validators.email]],
  });
  addresseGroup = this._formBuilder.group({
    seventhCtrl: ['', Validators.required],

  });
  isLinear = true;
  hide = true;

  onRegister(){
    //Checj if all forms are valid
    if(this.nameGroup.valid && this.usernameGroup.valid && this.password1Group.valid && this.password2Group.valid && this.email1Group.valid && this.email2Group.valid && this.addresseGroup.valid){
      if(this.password1Group.value.thirdCtrl == this.password2Group.value.forthCtrl && this.email1Group.value.fifthCtrl == this.email2Group.value.sixthCtrl){
        this.nutzer = {
            name: this.nameGroup.value.firstCtrl ?? '',
            username: this.usernameGroup.value.secondCtrl ?? '',
            passwort: this.password1Group.value.thirdCtrl ?? '',
            email: this.email1Group.value.fifthCtrl ?? '',
            adresse: this.addresseGroup.value.seventhCtrl ?? '',
            geschlecht: '',
        }
        this.UserService.onRegister(this.nutzer);
        this.router.navigate(['/login'])
      }
    }

  }

  constructor(private _formBuilder: FormBuilder) {}
}
