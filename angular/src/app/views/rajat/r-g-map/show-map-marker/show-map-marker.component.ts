import { Component, OnInit } from '@angular/core';
declare function rinitializeMAP(): any;

@Component({
  selector: 'app-show-map-marker',
  templateUrl: './show-map-marker.component.html',
  styleUrls: ['./show-map-marker.component.scss']
})
export class ShowMapMarkerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      rinitializeMAP();
      console.log("testingggggggggggg")
    }, 2000);
  }


}