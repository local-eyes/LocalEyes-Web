import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AgmCoreModule } from "@agm/core";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DataService } from "./services/data.service";
import { googleMapsApiKey } from "../environments/environment";
import { LocationService } from './services/location.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    MapComponent,
    PostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: googleMapsApiKey
    }),
    HttpClientModule
  ],
  providers: [DataService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
