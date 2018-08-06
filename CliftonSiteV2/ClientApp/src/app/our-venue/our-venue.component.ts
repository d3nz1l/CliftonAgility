import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-our-venue',
  templateUrl: './our-venue.component.html',
  styleUrls: ['./our-venue.component.scss']
})
export class OurVenueComponent {
  public lat: number = 51.4115062667691;
  public lng: number = -2.76832604408264;
  public zoomLevel: number = 12;
  public pushpin: String = "assets/img/logopushpin.png";

  public isCollapsed: boolean = window.innerWidth < 720;

  constructor(title: Title) {

    title.setTitle("Find Us - Clifton AC");
  }
}
