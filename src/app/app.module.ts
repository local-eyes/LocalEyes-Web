import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

// Firebase
import { environment, firebaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from "@angular/fire/firestore";

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DataService } from "./services/data/data.service";
import { LocationService } from './services/location/location.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ExploreComponent } from './components/explore/explore.component';
import { AuthService } from './services/auth/auth.service';
import { SignInCheckerComponent } from './components/sign-in-checker/sign-in-checker.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    PostComponent,
    ProfileComponent,
    LoaderComponent,
    ExploreComponent,
    SignInCheckerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    DataService, 
    LocationService, 
    AuthService,
    {
      provide: FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ["localhost", 8080]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
