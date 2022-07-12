import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class SMapMarkerService {
  users = "users";
  markers = "markers";
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

  public saveLocations(param: object): Observable<any> {
    // console.log('call service == ',param);
    return this.apiService.post(`${this.markers}/saveLocations`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getLocationsList(): Observable<any> {
    return this.apiService.get(`${this.markers}/getLocationsList`).pipe(
      map((data) => {
        return data;
      })
    );
  }

}

