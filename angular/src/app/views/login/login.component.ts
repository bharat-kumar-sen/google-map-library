import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalService, JwtService, UsersService } from '../../shared-ui';


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
  currentUser: any;

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private usersService: UsersService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    let rememberMeCookie = this.jwtService.getCookie(environment.cookieToken);
    if (rememberMeCookie) {
      this.login = rememberMeCookie;
    }

  }
   //login with Api
   doLogin() {
    let loginPostData = this.login;
    if(loginPostData.remember) {
      this.jwtService.setCookie(environment.cookieToken,loginPostData);
    } else {
      this.jwtService.deleteCookie(environment.cookieToken);
    }
   }




}
