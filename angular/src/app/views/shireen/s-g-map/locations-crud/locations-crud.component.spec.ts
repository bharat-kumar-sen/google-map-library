import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsCrudComponent } from './locations-crud.component';

describe('LocationsCrudComponent', () => {
  let component: LocationsCrudComponent;
  let fixture: ComponentFixture<LocationsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
