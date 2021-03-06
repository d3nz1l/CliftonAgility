import { Component, Input } from '@angular/core';
import { SiteMap, MenuItem } from '../helpers/site-map.provider';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  @Input()
  public colorScheme: string = "primary";

  public menuItems: MenuItem[];

  constructor(siteMap: SiteMap) {

    this.menuItems = siteMap.getNestedMenuItems();
  }
}
