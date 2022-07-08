import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RMapMarkerService } from 'src/app/shared-ui/services/r-map-marker.service';
declare function rinitializeMAP(): any;
declare function sandLocationList(param: any, data?:any): any;

@Component({
  selector: 'app-show-map-marker',
  templateUrl: './show-map-marker.component.html',
  styleUrls: ['./show-map-marker.component.scss']
})
export class ShowMapMarkerComponent implements OnInit {

  locationList: any[] = [];

  type: any = '';

  constructor(
    private rMapMarkerService: RMapMarkerService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.type = res.rType;
      if (this.type && this.type === 'rStaticMarker') {
        sandLocationList('rStaticMarker');
      } else if (this.type && this.type === 'rDynamicMarkers') {
        this.getLoactionList();
      } else if (this.type && this.type === 'dragAndDropMarkers') {
        sandLocationList('dragAndDropMarkers');
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      rinitializeMAP();
    }, 3000);
  }

  getLoactionList() {
    this.rMapMarkerService.getLoactionList().subscribe({
      next: (dataRes: any) => {
        if (dataRes.status === 200) {
          setTimeout(() => {
            sandLocationList( this.type, dataRes.data);
          }, 2000);
        }
      },
      error: (error: any) => {
        console.log('Error', error);
        this.toaster.error(error.message, 'Error!');
      }
    })
  }
}
