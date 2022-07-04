import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MapMarkerService } from '../../../../shared-ui';
declare function sinitializeMAP(): any;
declare function sendLocationsLIst(param?:any): any;

@Component({
  selector: 'app-show-map-marker',
  templateUrl: './show-map-marker.component.html',
  styleUrls: ['./show-map-marker.component.scss']
})
export class ShowMapMarkerComponent implements OnInit {

  markersList: any[] = [];

  constructor(
    private mapmarkerService: MapMarkerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    this.getLocationsList();
  }

  ngOnInit(): void {
    setTimeout(() => {
      sinitializeMAP();
    }, 2000);
  }

  getLocationsList() {
    this.mapmarkerService.getLocationsList().subscribe({
      next: (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.markersList = dataRes.data;
          console.log("markersList", this.markersList);
          sendLocationsLIst(this.markersList);
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


