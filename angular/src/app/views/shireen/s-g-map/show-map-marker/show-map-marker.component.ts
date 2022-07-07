import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MapMarkerService } from '../../../../shared-ui';
declare function sinitializeMAP(): any;
declare function sendLocationsLIst(param?: any): any;
// declare function getDragDropLocation(getDraglocationAddress?: any): any;
declare var window: any;

@Component({
  selector: 'app-show-map-marker',
  templateUrl: './show-map-marker.component.html',
  styleUrls: ['./show-map-marker.component.scss']
})
export class ShowMapMarkerComponent implements OnInit {

  locationsList: any[] = [];
  type: any = ''
  searchResultLocation: any = ''

  constructor(
    private mapmarkerService: MapMarkerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) {

    console.log('this.activatedRoute.snapshot.params', this.activatedRoute.snapshot.paramMap.get('type'));
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    if (this.type && this.type === 'staticMarkers') {
      sendLocationsLIst('staticMarkers');
    } else if (this.type && this.type === 'dbMarkers') {
      this.getLocationsList();
    } else if (this.type && this.type === 'dragDropMarker') {
      sendLocationsLIst('dragDropMarker');
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    window['angularComponentReference'] = { component: this, zone: this.ngZone, loadAngularFunction: (searchResult: any) => this.angularFunctionCalled(searchResult), };

    setTimeout(() => {
      sinitializeMAP();
    }, 2000);
  }

  angularFunctionCalled(searchResult: any) {
    console.log('Angular function is called', searchResult);
    this.searchResultLocation = searchResult;

  }

  getLocationsList() {
    this.mapmarkerService.getLocationsList().subscribe({
      next: (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.locationsList = dataRes.data;
          // console.log("locationsList", this.locationsList);
          sendLocationsLIst(this.locationsList);
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

}
