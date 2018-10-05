import {
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';
import { CacNgbTabset } from './tabset.component';
import { TabDirective } from 'ngx-bootstrap';

@Directive({ selector: 'tab, [tab]' })
export class CacTabDirective extends TabDirective {

  constructor(
    tabset: CacNgbTabset,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(tabset, elementRef, renderer)
  }
}
