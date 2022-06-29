import { Component, OnInit } from '@angular/core';
import { signupUser } from './modules/signup.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  /**signup: signupUser = new signupUser(); **/
  signupForm: any = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userFormValidation();
  }

  userFormValidation() {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required,
                       Validators.minLength(5),
                       Validators.pattern('^[a-zA-Z]+$'),

      ]],
      lastname: ['', [Validators.required,
                      Validators.minLength(5),
                      Validators.pattern('^[a-zA-Z]+$'),
      ]],
      email: ['', [Validators.required,
                   Validators.email,
                   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]],
      phonenumber: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(10),
                         Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),

      ]],
      password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[^A-Za-z0-9])(?=.*?[0-9]).{8,}$')
      ]],
      confirmpassword: ['', [Validators.required,
                            Validators.minLength(8)
      ]],
      gender: 'male',
    },
    {
      Validator : this.configPassword,
    }
    );
  }
  configPassword(a: any) {
    if(a.get('password').value != a.get('confirmpassword').value) {
      return {invalid: true };
    } else {
      return true;
    }
  }

  get formError() {
    return this.signupForm.controls;
  }
}
