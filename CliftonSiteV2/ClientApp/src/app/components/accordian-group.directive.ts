import { Directive, HostListener, Inject, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { CacAccordianDirective } from './accordian.directive';
import { CacAccordianGroupPanelDirective } from './accordian-group-panel.directive';

@Directive({
  selector: '[cac-accordian-group]',
  exportAs: 'cacAccordianGroup'
})
export class CacAccordianGroupDirective implements OnInit, OnDestroy {

  protected _isOpen: boolean = false;
  protected _panel: CacAccordianGroupPanelDirective;

  protected accordion: CacAccordianDirective;


  @Input() isDisabled: boolean;

  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }

  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();

  set isOpen(value: boolean) {
    if (value !== this.isOpen) {
      if (value) {
        this.accordion.closeOtherPanels(this);
      }

      this._isOpen = value;

      Promise.resolve(null).then(() => {
        this.isOpenChange.emit(value);
      });
    }
  }

  constructor(@Inject(CacAccordianDirective) accordion: CacAccordianDirective) {
    this.accordion = accordion;
  }

  toggleOpen(): any {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

  ngOnInit(): any {
    this.accordion.addGroup(this);
  }

  ngOnDestroy(): any {
    this.accordion.removeGroup(this);
  }
}
