import { Directive, HostBinding, Inject, ElementRef, Renderer2 } from '@angular/core';
import { CacAccordianGroupDirective } from './accordian-group.directive';

@Directive({
  selector: '[cac-accordian-panel]',
  exportAs: 'AccordianGroupPanel'
})
export class CacAccordianGroupPanelDirective {

  protected _isOpen: boolean = false;
  protected _element: ElementRef;
  protected _renderer: Renderer2;

  get isOpen(): boolean {
    return this._isOpen;
  }

  constructor(element: ElementRef, renderer: Renderer2) {
    this._element = element;
    this._renderer = renderer;
  }

  public toggle() {

    this.isOpen ? this.hide() : this.show();
  }

  private show(): void {

    var self = this;

    this._element.nativeElement.style.height = '0';

    this.removeClass("collapse");
    this.addClass("collapsing");

    window.setTimeout(function (e) {

      self.removeClass("collapsing");
      self.addClass("collapse");
      self.addClass("show");

      self._element.nativeElement.style.height = '';

    }, 500);

    let hostHeight = this._element.nativeElement.scrollHeight;
    this._element.nativeElement.style.height = hostHeight + 'px';
    this._isOpen = !this._isOpen;
  }

  private hide(): void {

    var self = this;
    let hostHeight = this._element.nativeElement.getBoundingClientRect().height;
    this._element.nativeElement.style.height = hostHeight + 'px';

    self.addClass("collapsing");
    self.removeClass("collapse");
    self.removeClass("show");

    window.setTimeout(function (e) {

      self._element.nativeElement.style.height = '0';

    }, 10);

    window.setTimeout(function (e) {

      self.removeClass("collapsing");
      self.addClass("collapse");

      self._element.nativeElement.style.height = '';

    }, 500);

    this._isOpen = false;
  }

  private addClass(className: string) {
    let classList = this._element.nativeElement.className.split(" ");

    if (classList.indexOf(className) == -1) {
      this._element.nativeElement.className += " " + className;
    }
  }

  private removeClass(className: string) {
    let classList = this._element.nativeElement.className.split(" ");

    if (classList.indexOf(className) > -1) {

      classList.splice(classList.indexOf(className), 1);

      this._element.nativeElement.className = classList.join(" ");
    }
  }
}
