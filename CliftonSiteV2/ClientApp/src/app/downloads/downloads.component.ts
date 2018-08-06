import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {

  constructor(title: Title) {

    title.setTitle("Downloads - Clifton AC");
  }
}
