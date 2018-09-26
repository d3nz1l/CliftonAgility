import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgTranscludeDirective } from 'ngx-bootstrap';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { CacNgbTabset } from './tabset.component';
import { CacTabDirective } from './tab.directive';
import { TabsetConfig } from 'ngx-bootstrap';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgTranscludeDirective,
    CacTabDirective,
    CacNgbTabset,
    TabHeadingDirective
  ],
  exports: [
    CacTabDirective,
    CacNgbTabset,
    TabHeadingDirective,
    NgTranscludeDirective
  ]
})
export class CacTabsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CacTabsModule,
      providers: [TabsetConfig]
    };
  }
}
