import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RMapMarkerService } from 'src/app/shared-ui/services/r-map-marker.service';

declare function rinitializeMAP(type: any, location?: any): any;
declare function moveMarkerTdClick(locations: any): any;
declare var $: any;

class displayLocationsTable {
  id: number = 0;
  location_name: string = '';
  title: string = '';
  location_lat: number = 0;
  location_lng: number = 0;
  marker_image: string = '';
}
class displayStaticLocationsTable {
  id: number = 0;
  location_name: string = '';
  title: string = '';
  location_lat: number = 0;
  location_lng: number = 0;
  marker_image: string = '';
}
@Component({
  selector: 'app-show-map-marker',
  templateUrl: './show-map-marker.component.html',
  styleUrls: ['./show-map-marker.component.scss']
})

export class ShowMapMarkerComponent implements OnInit {

  locationList: any[] = [];

  // staticLocations: displayStaticLocationsTable = new displayStaticLocationsTable()

  staticLocations = [{
    Id: 1,
    location_name: 'Smith Center',
    location_lat: 39.779823,
    location_lng: 98.787064,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/indore.jpg',
    title: 'Smith Center Location'
  },
  {
    Id: 2,
    location_name: 'Chicago',
    location_lat: 41.8781,
    location_lng: 87.6298,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/bhopal.jpg',
    title: 'Chicago Location'
  },
  {
    Id: 4,
    location_name: 'San Diego',
    location_lat: 32.7157,
    location_lng: 117.1611,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/ujjain.jpg',
    title: 'San Diego Location'
  },
  {
    Id: 5,
    location_name: 'San Francisco',
    location_lat: 37.7749,
    location_lng: 122.4194,
    marker_image: 'https://amw-task.amwebtech.org/assets/marker/dewas.jpg',
    title: 'San Francisco Location'
  },
  ];

  type: any = '';

  dataShowInTable: displayLocationsTable[] = [];

  displayLocationsInfo: any = {};

  constructor(
    private rMapMarkerService: RMapMarkerService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.type = res.rType;
      if (this.type === 'rStaticMarkers') {
        this.loadMap();
      } else if (this.type === 'rDynamicMarkers') {
        this.getLoactionList();
      } else if (this.type === 'rInfoWindoMarkers') {
        this.loadMap();
      } else if (this.type === 'rDragAndDropMarkers') {
        this.getLoactionList();
      } else if (this.type === 'rDragMarkerOnPosition') {
        this.loadMap();
      } else if (this.type === 'rMarkerCluster') {
        this.getLoactionList();
      } else if (this.type === 'rPolygonMarkers') {
        this.loadMap();
      } else if (this.type === 'rPolylineMarkers') {
        this.loadMap();
      } else if (this.type === 'rComplexPolylineMarkers') {
        this.loadMap();
      } else if (this.type === 'rMotionPloylineMarker') {
        this.loadMap();
      }
    });
  }

  ngOnInit(): void {
    window['angularComponentReference'] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: (addressInfo: any) => this.postLoactionData(addressInfo)
    };
  }

  loadMap() {
    setTimeout(() => {
      rinitializeMAP(this.type, location);
    }, 100);
  }

  commingSoon() {
    console.log('This type is in under development/Production And will Comming soon!');
  }

  getLoactionList() {
    this.rMapMarkerService.getLoactionList().subscribe({
      next: (dataReq: any) => {
        if (dataReq.status === 200) {
          setTimeout(() => {
            rinitializeMAP(this.type, dataReq.data);
          }, 1500);
        }
        this.dataShowInTable = dataReq.data.reverse();
      },
      error: (error: any) => {
        console.log('Error', error);
        this.toaster.error(error.message, 'Error!');
      }
    })
  }

  postLoactionData(addressInfoObject: any) {
    this.displayLocationsInfo = addressInfoObject;
    console.log('DataRasDataRas==', this.displayLocationsInfo);
    this.dataShowInTable.unshift(this.displayLocationsInfo);
    this.rMapMarkerService.postLoactionList(addressInfoObject).subscribe({
      next: (DataRas) => { },
      error: (error: any) => {
        console.log('Error', error);
        this.toaster.error(error.message, 'Error!');
      }
    })
  }

  moveMarkerTdClickToRecord(locations: any) {
    moveMarkerTdClick(locations)
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      10
    );
  }
}
