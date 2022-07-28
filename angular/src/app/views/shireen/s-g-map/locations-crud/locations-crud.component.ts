import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SMapMarkerService } from 'src/app/shared-ui';
declare function slocationinitializeMAP(type?: any, data?: any): any;
declare function codeAddress(param?: any): any;
declare var window: any;
declare var $: any;

class locations {
  location: any = {
    default_address: "TI Mall",
  };
}

@Component({
  selector: 'app-locations-crud',
  templateUrl: './locations-crud.component.html',
  styleUrls: ['./locations-crud.component.scss']
})

export class LocationsCrudComponent implements OnInit {

  locationsList: any[] = [];
  type: any = ''
  searchResultLocation: any = ''
  windowScrolled: boolean;
  locationInfo: locations = new locations();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('showAddEditLocationModal', { static: false })
  public showAddEditLocationModal: any = ModalDirective;
  @ViewChild('deleteLocationModal', { static: false })
  public deleteLocationModal: any = ModalDirective;

  constructor(
    private sMapMarkerService: SMapMarkerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) {
    /*   this.activatedRoute.params.subscribe((res: any) => {
        this.type = res.type;
        console.log(" this.type", this.type)
        if (this.type && this.type === 'staticMarkers') {
          this.loadMap('staticMarkers');
        } else if (this.type && this.type === 'dbMarkers') {
          this.getLocationsList();
        } else if (this.type && this.type === 'dragDropMarker') {
          this.getLocationsList();
        }
      }); */
    this.getLocationsList();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    window['angularComponentReference'] = { component: this, zone: this.ngZone, loadAngularFunction: (currentlocationInfo: any) => this.angularFunctionCalled(currentlocationInfo), };

    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [
        {
          targets: 12,
          orderable: false,
          searchable: false,
        },
      ],
    };
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  angularFunctionCalled(currentlocationInfo: any) {
    // console.log('currentlocationInfo == ', currentlocationInfo);
    if (this.locationInfo.location.id) {
      currentlocationInfo.id = this.locationInfo.location.id
    }
    // this.locationInfo.location = {...currentlocationInfo};
    // this.regionsInfo = Object.assign({}, regionsInfoValue);
    this.locationInfo.location = JSON.parse(JSON.stringify(currentlocationInfo));
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next('');
  }

  getLocationsList() {
    this.spinner.show();
    this.sMapMarkerService.getLocations().subscribe({
      next: (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.datatableElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next('');
              this.locationsList = dataRes.data;
              // console.log("locationsList", this.locationsList);
              slocationinitializeMAP(this.type, this.locationsList);
              this.toastr.success(dataRes.message, 'Success!');
            }
          );
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
    // console.log('onRowClicked ==', location);
    // console.log('location.address ==', location.address);
    if (location && location.id) {
      const latlng = {
        lat: location.location_lat,
        lng: location.location_lng,
      };
      // geocodeLatLng(latlng);
      codeAddress(location.address)
      this.angularFunctionCalled(location)
    }
  }

  closeModel() {
    this.showAddEditLocationModal.hide();
    this.deleteLocationModal.hide();
  }

  showAddEditModal(location?: any) {
    // console.log('onRowClicked ==', location);
    // console.log('location.address ==', location.address);
    if (location && location.id) {
      const latlng = {
        lat: location.location_lat,
        lng: location.location_lng,
      };
      // geocodeLatLng(latlng);
      codeAddress(location.address)
      this.angularFunctionCalled(location)
    }
    this.showAddEditLocationModal.show();
  }

  showLocationDeleteModal(location: any) {
    this.locationInfo.location = location;
    this.deleteLocationModal.show();
  }

  saveLocationInfo() {
    this.spinner.show();
    console.log('this.locationInfo', this.locationInfo);
    let locationPostData = JSON.parse(JSON.stringify(this.locationInfo.location));
    delete locationPostData.default_address;
    this.sMapMarkerService.searchLocationSave(locationPostData).subscribe({
      next: (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.toastr.success(dataRes.message, 'Success!');
          dataRes = dataRes.data;
          console.log("dataRes", dataRes);
          // this.locationsList.unshift(this.locationInfo.location);
          this.locationInfo.location = "";
          this.closeModel();
          this.getLocationsList();
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        console.log("error", error);
        this.toastr.error(error.message, 'Error!');
      }
    });
  }

  deleteLocation() {
    this.spinner.show();
    let locationDelete = this.locationInfo.location;
    // console.log('locationDelete==', locationDelete);
    this.spinner.show();
    this.sMapMarkerService.deletelocation(locationDelete).subscribe({
      next: (dataRes: any) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.locationInfo.location = "";
          this.getLocationsList();
          this.toastr.success('Location deleted successfully.', 'Success');
        }
      },
      error: (error: any) => {
        this.closeModel();
        this.spinner.hide();
        this.toastr.error(
          'There are some server error. Please check connection.',
          'Error'
        );
      }
    });
  }
}
