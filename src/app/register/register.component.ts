import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  }
}

function validateAge(c: AbstractControl) {
  const v = c.value;
  return (v >= 18) ? null : {
    agelessthan18: true
  };
}

function validatePhone(c: AbstractControl) {
  const v = c.value;
  const regex = /^\+84\d{9,10}$/g;
  return (v.match(regex) !== null) ? null : {
    phonenotvalid: true
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSubmitted = false;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwGroup: this.fb.group({
        password: '',
        confirmPassword: ''
      }, {validator: comparePassword}),
      country: ['', Validators.required],
      age: ['', [validateAge, Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [validatePhone, Validators.required]]
    });
  }

  changeCountry(event) {
    this.country.setValue(event.target.value);
  }

  get country() {
    return this.registerForm.get('country');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  changeGender(event) {
    this.country.setValue(event.target.value);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registerForm.valid)
      return false;
    else
      alert("Thanh Cong");
  }
}
