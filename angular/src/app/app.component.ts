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
    clusterMarkers: 'clusterMarkers'
  }
  rMenuType: any = {
    rStaticMarkers: 'rStaticMarkers',
    rDynamicMarkers: 'rDynamicMarkers',
    rInfoWindoMarkers: 'rInfoWindoMarkers',
    rDragAndDropMarkers: 'rDragAndDropMarkers',
    rMarkerCluster: 'rMarkerCluster',
    rDragMarkerOnPosition: 'rDragMarkerOnPosition'
  }
}
