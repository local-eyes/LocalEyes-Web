import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  code: String = null;
  referrer: String = null;
  message: String = "You have been invited to Donwload LocalEyes by " + this.referrer + ". You are now being redirected to the app.";
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.code = params['code'];
    });
    console.log(this.code);
  }

}
