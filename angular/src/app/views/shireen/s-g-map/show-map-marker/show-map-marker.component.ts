import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SMapMarkerService } from '../../../../shared-ui';
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
        // this.loadMap('dragDropMarker');
        this.getLocationsList();
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
          console.log("locationsList", this.locationsList);
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

}
