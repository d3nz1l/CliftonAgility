import { Component, Input } from '@angular/core';
import { SiteMap, MenuItem } from '../helpers/site-map.provider';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html'
})
export class SlideMenuComponent {

  public isOpen: boolean = false;

  public openTabs: boolean[] = [];

  @Input()
  public colorScheme: string = "primary";

  public menuItems: MenuItem[];

  constructor(siteMap: SiteMap) {

    this.menuItems = siteMap.getNestedMenuItems();
  }

  public toggle(): void {

    this.isOpen = !this.isOpen;
  }
}
