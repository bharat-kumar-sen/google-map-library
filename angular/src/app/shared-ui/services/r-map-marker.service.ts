import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
}
