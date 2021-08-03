import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in-checker',
  templateUrl: './sign-in-checker.component.html',
  styleUrls: ['./sign-in-checker.component.css']
})
export class SignInCheckerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public type: any,
    private dialog: MatDialog, 
    public auth: AuthService) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.closeAll();
  }
  
  logOut() {
    this.auth.signOut();
    this.dialog.closeAll();
  }

}
