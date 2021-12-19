import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { DeviceDetectorService } from "ngx-device-detector";
import { SignInCheckerComponent } from './components/sign-in-checker/sign-in-checker.component';
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { IntroScreenComponent } from './components/intro-screen/intro-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LocalEyes';
  deviceInfo = null;
  isMobile: boolean;
  isAndroid: boolean;
  userData: any;
  constructor(
    public auth: AuthService, 
    private deviceDetector: DeviceDetectorService, 
    private dialog: MatDialog,
    private registerIcon: MatIconRegistry,
    private sanitizer: DomSanitizer
    ) {
    this.detectDevice();
    this.registerIcon.addSvgIcon(
      `claps`,
      this.sanitizer.bypassSecurityTrustResourceUrl("../assets/imgs/clap.svg")
    );
  }
  ngOnInit() {
    this.getUserData();
    if (!localStorage.getItem("intro_screen_displayed")){
      if (this.isMobile==false){
        this.dialog.open(IntroScreenComponent, {width: "60vw"});
      } else {
        this.dialog.open(IntroScreenComponent, {width: "100vw"});
      }
      localStorage.setItem("intro_screen_displayed", "true")
    }
    setTimeout(() => {
      if (!this.auth.userData) {
        console.log("User not logged in");
        this.openSignInChecker();
      } else {
        console.log("user Logged In");
      }
    }, 60000);
  }

  getUserData() {
    this.userData = this.auth.userData;
  }

  detectDevice() {
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    this.isMobile = this.deviceDetector.isMobile();
    if (this.deviceInfo.os === "Android") {
      this.isAndroid = true;
      localStorage.setItem("isAndroid", this.isAndroid.toString());
    }
    localStorage.setItem("os", this.deviceInfo.os);
    localStorage.setItem("isMobile", `${this.isMobile}`)
  }

  openSignInChecker(): void {
    this.dialog.open(SignInCheckerComponent, {disableClose: true});
  }

  openLogoutConfirmation() {
    this.dialog.open(SignInCheckerComponent, {data: "logOut"});
  }
  
}
