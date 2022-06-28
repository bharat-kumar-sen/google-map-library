import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  baseUrl: string = environment.baseUrl;
  users = "users";
  constructor(
    private apiService: ApiService
  ) { }

  public doSignUp(param: object): Observable<any> {
    console.log('user service called*********', param);
    return this.apiService.post(`${this.users}/doSignup`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public doLogin(param: object): any {
    return this.apiService.post(`${this.users}/doSignin`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public forgotPassword(param: object): Observable<any> {
    return this.apiService.post(`${this.users}/forgotPassword`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public emailAndNumberAlreadyExits(param: any): any {
    return this.apiService
      .post(`${this.users}/emailAndNumberAlreadyExits`, param)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  public getUserInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.users}/getUserInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public logout(): Observable<any> {
    return this.apiService.post(`${this.users}/logout`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public authentication(param?: object): Observable<any> {
    return this.apiService.post(`${this.users}/authentication`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public saveInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.users}/saveUserInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getUsersList(): Observable<any> {
    return this.apiService.get(`${this.users}/getUsersList`).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
