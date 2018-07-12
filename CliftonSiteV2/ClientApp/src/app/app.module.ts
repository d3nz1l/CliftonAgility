/// <reference path="../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

/// Angular imports
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

/// Vender imports

/// Component imports
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

// Providor imports
import { ColorHelper } from './helpers/color-helper.component';

/// Page imports
import { HomeComponent } from './home/home.component';
import { OurVenueComponent } from './our-venue/our-venue.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NavMenuComponent,
    OurVenueComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'our-venue', component: OurVenueComponent },
    ])
  ],
  providers: [
    ColorHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
