import { Component, OnInit } from '@angular/core';

class loginUser {
  email: string = '';
  password: string = '';
  remember: boolean= false;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: loginUser = new loginUser();
  constructor() { }

  ngOnInit(): void {
  }

}
