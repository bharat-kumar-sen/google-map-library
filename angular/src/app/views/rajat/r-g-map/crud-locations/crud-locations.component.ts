import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RMapMarkerService } from 'src/app/shared-ui/services/r-map-marker.service';

declare function initializeMAP(): any;

class displayLocationsTable {
  lat: number = 0;
  lng: number = 0;
  placeId: string = '';
  city: string = '';
  address: string = '';
  postelCode: number = 0;
  country: string = '';
  countryCode: number = 0;
}

@Component({
  selector: 'app-crud-locations',
  templateUrl: './crud-locations.component.html',
  styleUrls: ['./crud-locations.component.scss']
})
export class CrudLocationsComponent implements OnInit {

  displayLocationsInfo: any = {};
  searchValue: any;
  addressInfo: any;
  dataShowInTable: displayLocationsTable[] = [];

  constructor(
    private rMapMarkerService: RMapMarkerService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    initializeMAP();
    this.getCRUDLoactionList();
    window['angularComponentReference'] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: (addressInfo: any) => this.postLoactionDetailsFromJs(addressInfo)
    };
  }

  postLoactionDetailsFromJs(addressInfo: any) {
    this.displayLocationsInfo = addressInfo;
    console.log('addressInfo from js to ts into ts=====', addressInfo);
  }

  getCRUDLoactionList() {
    this.rMapMarkerService.getCRUDLoactionList().subscribe({
      next: (dataReq: any) => {
        if (dataReq.status === 200) {
          console.log('GET Data from service-tp-TS in TS==', dataReq);
        }
        this.dataShowInTable = dataReq.data.reverse();
      },
      error: (error: any) => {
        console.log('Error', error);
        this.toaster.error(error.message, 'Error!');
      }
    })
  }

  postCRUDLoactionData() {
    console.log('Data is post!!!!!!!')
    this.rMapMarkerService.postCRUDLoactionList(this.displayLocationsInfo).subscribe({
      next: (DataRas) => { },
      error: (error: any) => {
        console.log('Error', error);
        this.toaster.error(error.message, 'Error!');
      }
    })
  }

  searchEnteredContent(event: any) {
    console.log('params===', event)
  }

}
