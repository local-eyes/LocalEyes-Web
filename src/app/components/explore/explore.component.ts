import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
isMobile = localStorage.getItem('isMobile');
notifs$ : Observable<any>;
title: string = "Notifications";
  constructor(private data: DataService, private auth: AuthService, public _location: Location) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.data.getNotifications(user.uid).subscribe(notif => {
        this.notifs$ = notif;
      });
    });
  }

  getDate(seconds:number) {
    const postTime = new Date(seconds * 1000);
    const postedOn = postTime.getTime();
    const curr = new Date().getTime();
    const gap = curr - postedOn;

    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;

    const fullDay = Math.floor(gap / day);
    const fullHour = Math.floor((gap % day) / hour);
    const fullMin = Math.floor((gap % hour) / min);

    if (fullDay >= 1) {
      return `${(postTime.toString()).slice(0, -40)}`
    } else if (fullDay <= 0 && fullHour > 0) {
      return `${fullHour} Hours ago`
    } else if (fullHour <= 0 && fullMin > 0) {
      return `${fullMin} Minutes ago`
    } else {
      return `> 1 Minute ago`;
    } 
  }

  goBack() {
    return this._location.back();
  }

}
