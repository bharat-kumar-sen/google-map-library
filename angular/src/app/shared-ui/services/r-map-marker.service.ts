import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RMapMarkerService {

  rMarkers = 'rMarkers';
  rCRUDMarkers = 'rCRUDMarkers';

  constructor(private apiService: ApiService) { }

  public getLoactionList(): Observable<any> {
    return this.apiService.get(`${this.rMarkers}/getLocationsList`).pipe(map((data) => {
      return data;
    }))
  }

  public postLoactionList(param: any): Observable<any> {
    // console.log('In Locations Service', param);
    return this.apiService.post(`${this.rMarkers}/postLocationsList`, param).pipe(map((data) => {
      return data;
    }))
  }

  public getCRUDLoactionList(): Observable<any> {
    return this.apiService.get(`${this.rCRUDMarkers}/getCRUDLocationsList`).pipe(map((data) => {
      return data;
    }))
  }

  public postCRUDLoactionList(param: any): Observable<any> {
    console.log('In CRUD locations Service', param);
    return this.apiService.post(`${this.rCRUDMarkers}/postCRUDLocationsList`, param).pipe(map((data) => {
      return data;
    }))
  }

  public postCRUDLoactionUpdateList(param: any): Observable<any> {
    console.log('In CRUD locations Service', param);
    return this.apiService.post(`${this.rCRUDMarkers}/postCRUDLoactionUpdateList`, param).pipe(map((data) => {
      return data;
    }))
  }
}
