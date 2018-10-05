import { Directive, HostBinding, Inject, HostListener, ChangeDetectorRef } from '@angular/core';
import { CacAccordianGroupDirective } from './accordian-group.directive';

@Directive({
  selector: '[cac-accordian-heading]',
  host: {
    '[attr.aria-expanded]': 'isOpen'
  }
})
export class CacAccordianGroupHeadingDirective {

  protected _accordionGroup: CacAccordianGroupDirective;
  protected _changeDetector: ChangeDetectorRef;

  get isOpen(): boolean {
    return this._accordionGroup.isOpen;
  }

  @HostBinding('class.collapsed')
  get isClosed(): boolean {
    return !this._accordionGroup.isOpen;
  }

  @HostListener('click', ['$event'])
  preventBubbling($event: any) {

    this._changeDetector.detectChanges();
    $event.stopPropagation();
  }

  constructor(@Inject(CacAccordianGroupDirective) accordionGroup: CacAccordianGroupDirective, changeDetector: ChangeDetectorRef) {
    this._accordionGroup = accordionGroup;
    this._changeDetector = changeDetector;
  }

  @HostListener('click', ['$event'])
  toggle(event): void {

    this._accordionGroup.toggleOpen();

    this._changeDetector.detectChanges();

    event.stopPropagation();
  }
}
