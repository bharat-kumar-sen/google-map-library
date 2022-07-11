import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RMapMarkerService } from 'src/app/shared-ui/services/r-map-marker.service';
declare function rinitializeMAP(type: any, location?: any): any;
// declare function sandLocationList(param: any, data?: any): any;

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
      console.log('First Init=======', this.type);
      if (this.type === 'rStaticMarkers') {
        console.log('Rajat-Static Markers')
        this.loadMap();
      } else if (this.type === 'rDynamicMarkers') {
        console.log('Rajat-Dynamic Markers')
        this.getLoactionList();
      } else if (this.type === 'rInfoWindoMarkers') {
        console.log('Rajat-InfoWindo Markers')
        this.loadMap();
      } else if (this.type === 'rDragAndDropMarkers') {
        console.log('Rajat-DragAndDrop Markers')
        this.loadMap();
      }
    });
  }

  ngOnInit(): void { }

  loadMap() {
    setTimeout(() => {
      rinitializeMAP(this.type, location);
    }, 100);
  }

  getLoactionList() {
    this.rMapMarkerService.getLoactionList().subscribe({
      next: (dataRes: any) => {
        if (dataRes.status === 200) {
          setTimeout(() => {
          rinitializeMAP(this.type, dataRes.data);
          }, 500);
          console.log('Checking Dynamic data=========', dataRes.data);
        }
      },
      error: (error: any) => {
        console.log('Error', error);
        this.toaster.error(error.message, 'Error!');
      }
    })
  }
}
