import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  locationsList: any[] = [];
  type: any = ''
  constructor(
    private mapmarkerService: MapMarkerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // console.log('this.activatedRoute.snapshot.params',this.activatedRoute.snapshot.paramMap.get('type'));
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    if (this.type && this.type === 'staticMarker') {
      sendLocationsLIst('staticMarker');
    } else {
      this.getLocationsList();
    }
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


