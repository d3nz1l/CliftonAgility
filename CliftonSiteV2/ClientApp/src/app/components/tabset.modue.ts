import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CacTabHeadingDirective } from './tab-heading.directive';
import { CacNgbTabset } from './tabset.component';
import { CacTabDirective } from './tab.directive';
import { CacTranscludeDirective } from './transclude.directive';
import { TabsetConfig } from 'ngx-bootstrap';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CacTranscludeDirective,
    CacTabDirective,
    CacNgbTabset,
    CacTabHeadingDirective
  ],
  exports: [
    CacTabDirective,
    CacNgbTabset,
    CacTabHeadingDirective,
    CacTranscludeDirective
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
