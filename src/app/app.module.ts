import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { environment, firebaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from "@angular/fire/firestore";
import { MaterialModule } from './material/material.module';

// Components
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SignInCheckerComponent } from './components/sign-in-checker/sign-in-checker.component';
import { NewComponent } from './components/new/new.component';
import { DirectLinkComponent } from './components/direct-link/direct-link.component';
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ForYouComponent } from './components/for-you/for-you.component';
import { CommentsComponent } from './components/comments/comments.component';
import { IntroScreenComponent } from './components/intro-screen/intro-screen.component';

// Services
import { AuthService } from './services/auth/auth.service';
import { DataService } from "./services/data/data.service";
import { LocationService } from './services/location/location.service';
import { NotOpenComponent } from './components/not-open/not-open.component';
import { ReplyComponent } from './components/reply/reply.component';
import { InviteComponent } from './components/invite/invite.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    PostComponent,
    ProfileComponent,
    LoaderComponent,
    ExploreComponent,
    SignInCheckerComponent,
    NewComponent,
    DirectLinkComponent,
    ForYouComponent,
    CommentsComponent,
    FileUploadComponent,
    EditProfileComponent,
    IntroScreenComponent,
    NotOpenComponent,
    ReplyComponent,
    InviteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService, 
    LocationService, 
    AuthService,
    // {
    //   provide: FIRESTORE_EMULATOR,
    //   useValue: environment.production ? undefined : ["localhost", 8080]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
