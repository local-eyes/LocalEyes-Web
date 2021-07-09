import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { DeviceDetectorService } from "ngx-device-detector";
import { SignInCheckerComponent } from './components/sign-in-checker/sign-in-checker.component';
import { MatDialog } from "@angular/material/dialog";

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
  constructor(public auth: AuthService, private deviceDetector: DeviceDetectorService, private dialog: MatDialog) {
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
    localStorage.setItem("isMobile", `${this.isMobile}`)
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }
  
}
