///// <reference path="../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

/// Angular imports
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

/// Vender imports
import { AgmCoreModule } from '@agm/core';


/// Component imports
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

// Providor imports
import { ColorHelper } from './helpers/color-helper.component';

// Layout components
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { FullScreenLayoutComponent } from './layouts/full-screen-layout/full-screen-layout.component';

/// Page imports
import { HomeComponent } from './home/home.component';
import { OurVenueComponent } from './our-venue/our-venue.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    ContactUsComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NavMenuComponent,
    OurVenueComponent,
    DefaultLayoutComponent,
    FullScreenLayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0O1HVq24zqR_7c2CbDESfMJZ79Se9GLQ'
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: DefaultLayoutComponent,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'about-us', component: AboutUsComponent },
          { path: 'contact-us', component: ContactUsComponent }
        ]
      },
      {
        path: '',
        component: FullScreenLayoutComponent,
        children: [
          { path: 'our-venue', component: OurVenueComponent }
        ]
      }
    ])
  ],
  providers: [
    ColorHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
