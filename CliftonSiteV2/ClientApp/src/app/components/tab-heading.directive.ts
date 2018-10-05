import {
  Directive,
  TemplateRef
} from '@angular/core';
import { TabHeadingDirective, TabDirective } from 'ngx-bootstrap';
import { CacTabDirective } from './tab.directive';

@Directive({ selector: '[tabHeading]' })
export class CacTabHeadingDirective extends TabHeadingDirective {

  constructor(templateRef: TemplateRef<any>, tab: CacTabDirective
  ) {
    super(templateRef, tab)
  }
}
