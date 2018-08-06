import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ColorHelper } from '../helpers/color-helper.component';

@Component({
  selector: 'app-club-clothing',
  templateUrl: './club-clothing.component.html',
  styleUrls: ['./club-clothing.component.scss']
})
export class ClubClothingComponent {

  public colors: ColorHelper = undefined;

  public clothingItems = [
    new ClothingItem("T-Shirt", "Heather grey short sleeve t-shirt with an embroidered club logo on the front.", "tshirt"),
    new ClothingItem("Polo - Mens", "Royal blue polo shirt with an embroidered club logo on the front.", "polo"),
    new ClothingItem("Polo - Womens", "Royal blue polo shirt with an embroidered club logo on the front.", "polo_lady"),
    new ClothingItem("Body Warmer/Gilet", "Royal blue padded gilet with an embroidered club logo on the front and  back.", "gilet"),
    new ClothingItem("Sweatshirt", "Royal blue sweatshirt with an embroidered club logo on the front.", "sweatshirt"),
    new ClothingItem("Hoodie", "Royal blue contrast hoodie with an embroidered club logo on the front.", "hoodie"),
    new ClothingItem("Jacket", "Royal blue padded jacket with an embroidered club logo on the front and back.", "jacket")
  ];

  constructor(title: Title, colorHelper: ColorHelper) {

    title.setTitle("Clothing - Clifton AC");
    this.colors = colorHelper;
  }
}

class ClothingItem {
  public title: string;

  public description: string;

  public filename: string;

  constructor(title: string, description: string, filename: string) {
    this.title = title;
    this.description = description;
    this.filename = filename;
  }

  public image(): string {

    return "/assets/img/clothing/" + this.filename + ".jpg";
  }
}
