import { Component } from '@angular/core';

@Component({
  selector: 'app-our-venue',
  templateUrl: './our-venue.component.html',
  styleUrls: ['./our-venue.component.scss']
})
export class OurVenueComponent {
  private lat: number = 51.4115062667691;
  private lng: number = -2.76832604408264;
  private zoomLevel: number = 12;
  private pushpin: String = "assets/img/logopushpin.png";
}
