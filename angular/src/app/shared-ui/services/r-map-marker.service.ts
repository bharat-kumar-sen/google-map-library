import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RMapMarkerService {

  markers = 'rMarkers';

  constructor(private apiService: ApiService) { }

  public getLoactionList(): Observable<any> {
    return this.apiService.get(`${this.markers}/getLocationsList`).pipe(map((data) => {
      return data;
    }))
  }

  public postLoactionList(param: any): Observable<any> {
    // console.log('In Service', param);
    return this.apiService.post(`${this.markers}/postLocationsList`, param).pipe(map((data) => {
      return data;
    }))
  }
}
