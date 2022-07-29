import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AlertService, SMapMarkerService } from 'src/app/shared-ui';
declare function slocationinitializeMAP(type?: any, data?: any): any;
declare function codeAddress(param?: any): any;
declare var window: any;
declare var $: any;

class locations {
  location: any = {
    default_address: "TI Mall",
  };
}

// just use it for validation
export class validationFields {
  location_lat: string = '';
  location_lng: string = '';
  place_Id: string = '';
  address: string = '';
  name: string = '';
  state: string = '';
  city: string = '';
  postal_code: number = 0;
  country: string = '';
  country_code: string = '';
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
  LocationForm: any = new FormGroup({});
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('showAddEditLocationModal', { static: false })
  public showAddEditLocationModal: any = ModalDirective;
  @ViewChild('deleteLocationModal', { static: false })
  public deleteLocationModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  constructor(
    private sMapMarkerService: SMapMarkerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private alertService: AlertService,
  ) {
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
    // this.validateLocationForm();
  }

  // validateLocationForm() {
  //   this.LocationForm = this.fb.group({
  //     name: ['', [Validators.required, Validators.minLength(3)]],
  //     phone: ['',[Validators.required,Validators.minLength(10),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
  //       ],
  //     ],
  //     address: ['', [Validators.required, Validators.minLength(3)]],
  //   });
  // }

  get invalidError() {
    return this.LocationForm.controls;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  angularFunctionCalled(currentlocationInfo: any) {
    if (this.locationInfo.location.id) {
      console.log('currentlocationInfo ==00 ', currentlocationInfo);
      currentlocationInfo.id = this.locationInfo.location.id
    }
    this.locationInfo.location = {...currentlocationInfo};
    this.locationInfo.location = JSON.parse(JSON.stringify(currentlocationInfo));
    // console.log('currentlocationInfo == 22', this.locationInfo.location);
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

  closeModel() {
    this.showAddEditLocationModal.hide();
    this.deleteLocationModal.hide();
  }

  showAddEditModal(location?: any) {
    if (location && location.id) {
      location = JSON.parse(JSON.stringify(location));
      console.log('olocation.id ==', location.id);
      const latlng = {
        lat: location.location_lat,
        lng: location.location_lng,
      };
      // codeAddress(location.address)
      codeAddress(latlng)
      this.angularFunctionCalled(location)
    }
    this.showAddEditLocationModal.show();
  }

  showLocationDeleteModal(location: any) {
    this.locationInfo.location = location;
    this.deleteLocationModal.show();
  }

  saveLocationInfo() :any{
    this.alertService.clear();
    const self = this;
    const ObjectKeys = Object.keys(this.requiredValidation);
    let postData = JSON.parse(JSON.stringify(self.locationInfo.location));
    console.log('postData== ',postData);
    const found = ObjectKeys.filter((obj: any) => {
      console.log('obj== ',obj);
      return !postData[obj];
    });
    this.spinner.show();
    if (found.length) {
      console.log('found== ',found);
      this.alertService.clear();
      this.alertService.error('*Please Fill Fields that are mandatory.');
      this.spinner.hide();
      return false;
    }
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
