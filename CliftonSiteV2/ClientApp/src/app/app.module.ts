///// <reference path="../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

/// Angular imports
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

/// Vender imports
import { AgmCoreModule } from '@agm/core';
import { BsDatepickerModule, BsDropdownModule, CollapseModule, AccordionModule  } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { Angulartics2Module } from 'angulartics2';

/// Component imports
import { AppComponent } from './app.component';
import { CacTabsModule } from './components/tabset.modue';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SideBarFindUsComponent } from './sidebar/find-us.component';
import { SideBarMemberFormComponent } from './sidebar/member-form.component';
import { SideBarHelpComponent } from './sidebar/help.component';
import { SlideMenuComponent } from './nav-menu/slide-menu.component';

// Providor imports
import { ColorHelper } from './helpers/color-helper.component';
import { RippleComponent } from './helpers/ripples.component';
import { Validation } from './validators/validation-helper.provider';
import { SiteMap } from './helpers/site-map.provider';

// Layout components
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { FullScreenLayoutComponent } from './layouts/full-screen-layout/full-screen-layout.component';

/// Page imports
import { HomeComponent } from './home/home.component';
import { OurVenueComponent } from './our-venue/our-venue.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ClubClothingComponent } from './club-clothing/club-clothing.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { MembershipComponent } from './membership/membership.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HelpAdviceComponent } from './help-advice/help-advice.component';

/// Directives
import { CustomMinDirective } from './validators/min-validator.directive';
import { CacAccordianDirective } from './components/accordian.directive';
import { CacAccordianGroupDirective } from './components/accordian-group.directive';
import { CacAccordianGroupHeadingDirective } from './components/accordian-group-heading.directive';
import { CacAccordianGroupPanelDirective } from './components/accordian-group-panel.directive';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    CacAccordianDirective,
    CacAccordianGroupDirective,
    CacAccordianGroupHeadingDirective,
    CacAccordianGroupPanelDirective,
    ClubClothingComponent,
    ContactUsComponent,
    CustomMinDirective,
    DownloadsComponent,
    FooterComponent,
    HeaderComponent,
    HelpAdviceComponent,
    HomeComponent,
    MembershipComponent,
    NavMenuComponent,
    OurVenueComponent,
    PrivacyPolicyComponent,
    RippleComponent,
    SideBarFindUsComponent,
    SideBarHelpComponent,
    SideBarMemberFormComponent,
    SlideMenuComponent,
    DefaultLayoutComponent,
    FullScreenLayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    DeviceDetectorModule.forRoot(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0O1HVq24zqR_7c2CbDESfMJZ79Se9GLQ'
    }),
    BsDatepickerModule.forRoot(),
    CacTabsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    Angulartics2Module.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: DefaultLayoutComponent,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'about-us', component: AboutUsComponent },
          { path: 'contact-us', component: ContactUsComponent },
          { path: 'club-clothing', component: ClubClothingComponent },
          { path: 'downloads', component: DownloadsComponent },
          { path: 'membership', component: MembershipComponent },
          { path: 'privacy-policy', component: PrivacyPolicyComponent },
          { path: 'help-advice', component: HelpAdviceComponent }
        ]
      },
      {
        path: '',
        component: FullScreenLayoutComponent,
        children: [
          { path: 'our-venue', component: OurVenueComponent }
        ]
      }
    ], {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
  ],
  providers: [
    ColorHelper,
    SiteMap,
    Validation,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LdjzA4TAAAAAEHRViqv4q4daAAW-y83JdYekxfS' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
