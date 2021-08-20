import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { DeviceDetectorService } from "ngx-device-detector";
import { SignInCheckerComponent } from './components/sign-in-checker/sign-in-checker.component';
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
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
      this.dialog.open(IntroScreenComponent);
      localStorage.setItem("intro_screen_displayed", "true")
    }
  }

  getUserData() {
    this.userData = this.auth.userData;
  }

  detectDevice() {
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    this.isMobile = this.deviceDetector.isMobile();
    localStorage.setItem("isMobile", `${this.isMobile}`)
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }

  openLogoutConfirmation() {
    this.dialog.open(SignInCheckerComponent, {data: "logOut"});
  }
  
}
