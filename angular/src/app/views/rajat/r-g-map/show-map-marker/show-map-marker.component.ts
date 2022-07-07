import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RMapMarkerService } from 'src/app/shared-ui/services/r-map-marker.service';
declare function rinitializeMAP(): any;
declare function sandLocationList(param?: any): any;

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
    this.type = this.activatedRoute.snapshot.paramMap.get('rType');
    // console.log('TYPEEEeeeeeeee',this.type);
    if (this.type && this.type === 'rStaticMarker') {
      sandLocationList('rStaticMarker');
    } else if (this.type && this.type === 'rDynamicMarkers') {
      this.getLoactionList();
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      rinitializeMAP();
    }, 2000);
  }

  getLoactionList() {
    this.rMapMarkerService.getLoactionList().subscribe({
      next: (dataRes: any) => {
        // console.log('DDDDDDDDD',dataRes)
        if (dataRes.status === 200) {
          this.locationList = dataRes.data;
        }
      },
      error: (error: any) => {
        console.log('Error', error);
      }
    })
  }
}
