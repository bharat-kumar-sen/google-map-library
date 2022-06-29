import { Component, OnInit } from '@angular/core';
import { signupUser } from './modules/signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup: signupUser = new signupUser();

  constructor() { }

  ngOnInit(): void {
  }

}
