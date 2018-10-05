import { Directive, Input } from '@angular/core';
import { CacAccordianGroupDirective } from './accordian-group.directive';

@Directive({
  selector: '[cac-accordian]',
  exportAs: 'cacAccordian',
  host: {
    '[attr.aria-multiselectable]': 'closeOthers'
  }
})
export class CacAccordianDirective  {

  protected groups: CacAccordianGroupDirective[] = [];

  @Input() closeOthers: boolean;

  closeOtherPanels(openGroup: CacAccordianGroupDirective): void {
    if (!this.closeOthers) {
      return;
    }

    this.groups.forEach((group: CacAccordianGroupDirective) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }


  addGroup(group: CacAccordianGroupDirective): void {
    this.groups.push(group);
  }

  removeGroup(group: CacAccordianGroupDirective): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}
