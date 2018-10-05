import { Injectable } from '@angular/core';

@Injectable()
export class SiteMap {

  private menuItems: MenuItem[] = [
    new MenuItem({ name: "Home", link: "/", icon: "home" }),
    new MenuItem({
      name: "About Us", icon: "info-outline", children: [
        new MenuItem({ name: "The Club", link: "/about-us", icon: "info-outline" }),
        new MenuItem({ name: "Training", link: "/about-us", fragment: "training", icon: "run" }),
        new MenuItem({ name: "Committee", link: "/about-us", fragment: "committee", icon: "accounts-outline" }),
      ]
    }),
    new MenuItem({ name: "Find Us", link: "/our-venue", icon: "pin-drop" }),
    new MenuItem({ name: "Contact Us", link: "/contact-us", icon: "comments" }),
    new MenuItem({
      name: "Membership Information", icon: "accounts-alt", children: [
        new MenuItem({ name: "Join Us", link: "/membership", icon: "accounts-add" }),
        new MenuItem({ name: "Help & Advice", link: "/help-advice", icon: "help-outline" }),
        new MenuItem({ name: "Club Clothing", link: "/club-clothing", icon: "shopping-basket" }),
        new MenuItem({ name: "Downloads", link: "/downloads", icon: "download" }),
      ]
    }),
  ];

  private flatMenu: MenuItem[];

  public getNestedMenuItems(): MenuItem[] {

    return this.menuItems;
  }

  public getFlatMenuItems(): MenuItem[] {

    if (!this.flatMenu) {
      this.flatMenu = this.getMenusFromItems(this.menuItems);
    }

    return this.flatMenu;
  }

  private getMenusFromItems(items: MenuItem[]): MenuItem[] {

    let flatMenu: MenuItem[] = [];

    for (let menuItem of this.menuItems) {

      if (menuItem.hasChildren()) {
        flatMenu = flatMenu.concat(this.getMenusFromItems(menuItem.children));
        continue;
      }

      flatMenu.push(menuItem);
    }

    return flatMenu;
  }
}

export class MenuItem {

  public name: string;

  public link: string;

  public fragment: string;

  public icon: string;

  public children: MenuItem[];

  constructor(init: Partial<MenuItem>) {
    this.name = init.name;
    this.link = init.link;
    this.fragment = init.fragment;
    this.icon = init.icon;
    this.children = init.children;
  }

  public hasChildren(): boolean {

    return !!this.children && this.children.length > 0;
  }
}
