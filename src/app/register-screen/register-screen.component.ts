import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.css'
})

export class RegisterScreenComponent {
  firstFormGroup = this._formBuilder.group({
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
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
