import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMapMarkerComponent } from './show-map-marker.component';

describe('ShowMapMarkerComponent', () => {
  let component: ShowMapMarkerComponent;
  let fixture: ComponentFixture<ShowMapMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMapMarkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMapMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
