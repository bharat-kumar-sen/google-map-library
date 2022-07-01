import { Component, OnInit } from '@angular/core';
declare function binitializeMAP(): any;

@Component({
  selector: 'app-show-map-marker',
  templateUrl: './show-map-marker.component.html',
  styleUrls: ['./show-map-marker.component.scss']
})
export class ShowMapMarkerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      binitializeMAP();
    }, 2000);
  }
}
