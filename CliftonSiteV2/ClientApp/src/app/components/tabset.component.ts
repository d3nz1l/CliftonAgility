import { Component, Input } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cac-ngb-tabset',
  exportAs: 'cacNgbTabset',
  template: `
    <div [class]="navClass">
      <ul [class]="'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')" role="tablist">
        <li class="nav-item" *ngFor="let tab of tabs">
          <a [id]="tab.id" class="nav-link" [class.active]="tab.id === activeId" [class.disabled]="tab.disabled"
            href (click)="!!select(tab.id)" role="tab" [attr.tabindex]="(tab.disabled ? '-1': undefined)"
            [attr.aria-controls]="(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)"
            [attr.aria-expanded]="tab.id === activeId" [attr.aria-disabled]="tab.disabled">
            {{tab.title}}<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></ng-template>
          </a>
        </li>
      </ul>
    </div>
    <div [class]="contentClass">
      <div class="card-body">
        <div class="tab-content">
          <ng-template ngFor let-tab [ngForOf]="tabs">
            <div
              class="tab-pane {{tab.id === activeId ? 'active' : null}}"
              *ngIf="!destroyOnHide || tab.id === activeId"
              role="tabpanel"
              [attr.aria-labelledby]="tab.id" id="{{tab.id}}-panel"
              [attr.aria-expanded]="tab.id === activeId">
              <ng-template [ngTemplateOutlet]="tab.contentTpl?.templateRef"></ng-template>
            </div>
          </ng-template>
      </div>
    </div>
  </div>
  `
})
export class CacNgbTabset extends NgbTabset {

  @Input() contentClass: string;

  @Input() navClass: string;
}
