import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { DeviceDetectorService } from "ngx-device-detector";
import { SignInCheckerComponent } from './components/sign-in-checker/sign-in-checker.component';
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

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
  }
  ngOnInit() {
    this.getUserData();
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
