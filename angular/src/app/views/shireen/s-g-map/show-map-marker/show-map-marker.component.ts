import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SMapMarkerService } from '../../../../shared-ui';
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
declare function sinitializeMAP(type: any, data?: any): any;
declare function geocodeLatLng(param?: any): any;
declare function codeAddress(param?: any): any;
declare var window: any;
declare var $: any;

class locations {
  location: any = {};
}

@Component({
  selector: 'app-show-map-marker',
  templateUrl: './show-map-marker.component.html',
  styleUrls: ['./show-map-marker.component.scss']
})
export class ShowMapMarkerComponent implements OnInit {

  locationsList: any[] = [];
  type: any = ''
  searchResultLocation: any = ''
  windowScrolled: boolean;
  locationInfo: locations = new locations();
  clusterLocations: any = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ];

  constructor(
    private sMapMarkerService: SMapMarkerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.type = res.type;
      console.log(" this.type", this.type)
      if (this.type && this.type === 'staticMarkers') {
        this.loadMap('staticMarkers');
      } else if (this.type && this.type === 'dbMarkers') {
        this.getLocationsList();
      } else if (this.type && this.type === 'dragDropMarker') {
        this.getLocationsList();
      }
      else if (this.type && this.type === 'clusterMarkers') {
        this.getMarkerClusters();
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    window['angularComponentReference'] = { component: this, zone: this.ngZone, loadAngularFunction: (currentlocationInfo: any) => this.angularFunctionCalled(currentlocationInfo), };

    /*     $("html, body").animate(
          {
            scrollTop: 0,
          },
          600
        ); */
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  loadMap(type: any) {
    setTimeout(() => {
      sinitializeMAP(type);
    }, 1000);
  }

  angularFunctionCalled(currentlocationInfo: any) {
    console.log('Result == ', currentlocationInfo);
    this.locationInfo.location = currentlocationInfo;
    this.saveLocationInfo();
  }

  getLocationsList() {
    this.spinner.show();
    this.sMapMarkerService.getLocationsList().subscribe({
      next: (dataRes: any) => {
        if (dataRes.status === 200) {
          this.locationsList = dataRes.data;
          // console.log("locationsList", this.locationsList);
          sinitializeMAP(this.type, this.locationsList);
          this.toastr.success(dataRes.message, 'Success!');
          this.spinner.hide();
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        console.log("error", error);
        this.toastr.error(error.message, 'Error!');
      }
    });
  }

  saveLocationInfo() {
    this.spinner.show();
    // let locationPostData = JSON.parse(JSON.stringify(this.locationInfo));
    // console.log('this.locationInfo',this.locationInfo);
    this.sMapMarkerService.saveLocations(this.locationInfo.location).subscribe({
      next: (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.toastr.success(dataRes.message, 'Success!');
          dataRes = dataRes.data;
          // console.log("dataRes", dataRes);
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        console.log("error", error);
        this.toastr.error(error.message, 'Error!');
      }
    });
  }

  onRowClicked(location: any) {
    // console.log('location ==',location);
    const latlng = {
      lat: location.location_lat,
      lng: location.location_lng,
    };
    // geocodeLatLng(latlng);
    codeAddress(location.location_address)
  }

  getMarkerClusters() {
    this.locationsList = this.clusterLocations;
    setTimeout(() => {
      sinitializeMAP(this.type, this.locationsList);
    }, 1500);
    // sinitializeMAP(this.type, this.locationsList);
   }

}
