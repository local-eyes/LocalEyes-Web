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
  constructor(public auth: AuthService, private deviceDetector: DeviceDetectorService, private dialog: MatDialog) {
    this.detectDevice();
  }
  ngOnInit() {
  }

  detectDevice() {
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    this.isMobile = this.deviceDetector.isMobile();
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }
  
}
