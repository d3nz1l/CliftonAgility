import {
  Directive,
} from '@angular/core';
import { NgTranscludeDirective } from 'ngx-bootstrap';

@Directive({
  selector: '[ngTransclude]'
})
export class CacTranscludeDirective extends NgTranscludeDirective {
}
