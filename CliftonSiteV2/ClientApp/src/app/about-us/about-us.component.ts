import { Component } from '@angular/core';
import { ColorHelper } from '../helpers/color-helper.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  public colors: ColorHelper = undefined;

  public trainers = [
    "Bryan Reakes",
    "Carol Avenell",
    "David Sweeney",
    "Isobel Mills",
    "Jean Boniface",
    "Louise Gilmore",
    "Mark den Dunnen",
    "Maureen Reakes",
    "Pauline Pearce",
    "Rob Kilby"
  ];

  public committee = [
    new CommitteeMember("Rob Kilby", "Chair Person"),
    new CommitteeMember("Carol Wye", "Secretary"),
    new CommitteeMember("Isobel Mills", "Treasurer"),
    new CommitteeMember("Ann Parker", ""),
    new CommitteeMember("Jean Boniface", ""),
    new CommitteeMember("Louise Gilmore", ""),
    new CommitteeMember("Maureen Reakes", ""),
    new CommitteeMember("Pauline Pearce", "")
  ];

  constructor(colorHelper: ColorHelper) {
    this.colors = colorHelper;
  }
}

class CommitteeMember {
  public name: String;

  public position: String;

  constructor(name: String, position: String) {
    this.name = name;
    this.position = position;
  }

  public image(): String {
    let filename = this.name.toLowerCase().replace(" ", "");

    return "/assets/img/committee/" + filename + ".png";
  }
}
