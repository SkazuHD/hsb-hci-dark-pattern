import {Component, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {Nutzer, UserService} from "../../user.service";
import {Router, RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Component({
  selector: 'app-register-screen',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  imports: [RouterLink, MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  @ViewChild('stepper') stepper: MatStepper;

  router: Router = inject(Router);
  passwordErrorMessage = "Passwörter stimmen nicht überein";

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
  genderGroup = this._formBuilder.group({
    eighthCtrl:['', Validators.required]
  });

  isLinear = true;
  hide = true;
  private UserService: UserService = inject(UserService);
  private nutzer: Nutzer;

  constructor(private _formBuilder: FormBuilder) {
  }

  onRegister() {
    //Checj if all forms are valid
    if (this.nameGroup.valid && this.usernameGroup.valid && this.password1Group.valid && this.password2Group.valid && this.email1Group.valid && this.email2Group.valid && this.addresseGroup.valid && this.genderGroup.valid) {
      if (this.password1Group.value.thirdCtrl !== this.password2Group.value.forthCtrl) {
        this.stepper.selectedIndex = 3;

      }else if(this.email1Group.value.fifthCtrl !== this.email2Group.value.sixthCtrl){
        this.stepper.selectedIndex = 5;
        //Set error message
        this.email2Group.setErrors({notSame: true});
      }else {
        this.nutzer = {
          name: this.nameGroup.value.firstCtrl ?? '',
          username: this.usernameGroup.value.secondCtrl ?? '',
          passwort: this.password1Group.value.thirdCtrl ?? '',
          email: this.email1Group.value.fifthCtrl ?? '',
          adresse: this.addresseGroup.value.seventhCtrl ?? '',
          geschlecht: this.genderGroup.value.eighthCtrl ?? '',
        }
        this.UserService.onRegister(this.nutzer);
        this.router.navigate(['/login'])
      }
    }

  }
}
