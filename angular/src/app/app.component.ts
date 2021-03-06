import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-website';
  loadingLabel: string = "Loading... Please Wait.";
  menuType: any = {
    staticMarker: 'staticMarkers',
    dbMarker: 'dbMarkers',
    dragDropMarker: 'dragDropMarker',
    clusterMarkers: 'clusterMarkers',
    polyline:'polyline',
    polygons:'polygons',
  }
  rMenuType: any = {
    rStaticMarkers: 'rStaticMarkers',
    rDynamicMarkers: 'rDynamicMarkers',
    rInfoWindoMarkers: 'rInfoWindoMarkers',
    rDragAndDropMarkers: 'rDragAndDropMarkers',
    rDragMarkerOnPosition: 'rDragMarkerOnPosition',
    rMarkerCluster: 'rMarkerCluster',
    rPolygonMarkers: 'rPolygonMarkers',
    rPolylineMarkers: 'rPolylineMarkers',
    rComplexPolylineMarkers: 'rComplexPolylineMarkers',
    rMotionPloylineMarker: 'rMotionPloylineMarker',
  }
}
