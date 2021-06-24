import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in-checker',
  templateUrl: './sign-in-checker.component.html',
  styleUrls: ['./sign-in-checker.component.css']
})
export class SignInCheckerComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
