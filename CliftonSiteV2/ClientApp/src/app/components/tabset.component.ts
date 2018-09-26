import { Component, Input } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'cac-tabset',
  exportAs: 'cacTabset',
  template: `
    <div [class]="navClass">
     <ul class="nav" [ngClass]="classMap" (click)="$event.preventDefault()">
        <li *ngFor="let tabz of tabs" [ngClass]="['nav-item', tabz.customClass || '']"
            [class.active]="tabz.active" [class.disabled]="tabz.disabled">
          <a href="javascript:void(0);" class="nav-link"
             [attr.id]="tabz.id ? tabz.id + '-link' : ''"
             [class.active]="tabz.active" [class.disabled]="tabz.disabled"
             (click)="tabz.active = true">
            <span [ngTransclude]="tabz.headingRef">{{ tabz.heading }}</span>
            <span *ngIf="tabz.removable" (click)="$event.preventDefault(); removeTab(tabz);" class="bs-remove-tab"> &#10060;</span>
          </a>
        </li>
      </ul>
    </div>
    <div [class]="contentClass">
      <div class="card-body">
        <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `
})
export class CacNgbTabset extends TabsetComponent {


  @Input() contentClass: string;

  @Input() navClass: string;
}
