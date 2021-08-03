import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
uid: string;
personData: any;
dataLoaded: boolean = false
localFeed: any;
cityFeed: any;
answers: any;
currentUser: string;
cityLoaded = false;
answersLoaded = false;
title = "Profile";
isMobile = localStorage.getItem('isMobile');
  constructor(
    public route: ActivatedRoute, 
    private data: DataService, 
    private auth: AuthService,
    public dialog: MatDialog,
    public _location: Location
    ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    if (this.auth.userData) {
      this.currentUser = this.auth.userData.uid; 
    }
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getProfileFromService(this.uid);
    this.getLocalFeed(this.uid);
  }

  getProfileFromService(uid: string) {
    this.data.getProfile(uid).subscribe(res => {
      this.personData = res;
      this.dataLoaded = true;
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

  getJoiningDate(seconds:number) {
    const months = {
      0: "January", 
      1: "February", 
      2: "March", 
      3: "April",
      4: "May", 
      5: "June", 
      6: "July",
      7: "August", 
      8: "September", 
      9: "October", 
      10: "November", 
      11: "December"
    }
    const postTime = new Date(seconds * 1000);
    return `${months[postTime.getMonth()]} ${postTime.getFullYear()}`;
  }

  log(value:any) {
  }

  loadData(tabIndex:number) {
    if (tabIndex === 1 && this.cityLoaded == false) {
      this.getCityFeed(this.uid);
      this.cityLoaded = true;
    }
    if (tabIndex === 2 && this.answersLoaded == false) {
      this.getUserAnswersFeed(this.uid);
      this.answersLoaded = true;
    }
  }

  getLocalFeed(uid: string) {
    this.data.getUserLocalFeed(uid).subscribe(feed => {
      this.localFeed = feed;
    })
  }
  getCityFeed(uid: string) {
    this.data.getUserCityFeed(uid).subscribe(feed => {
      this.cityFeed = feed;
    })
  }
  getUserAnswersFeed(uid: string) {
    this.data.getAnswersFeed(uid).subscribe(feed => {
      this.answers = feed;
    })
  }

  openPost(collection:string, postId:string) {
    if (collection === "local") {
      this.dialog.open(PostComponent, {height: "90vh", width: "100vw", data: this.localFeed[postId], hasBackdrop: true});
    } else {
      this.dialog.open(PostComponent, {height: "90vh", width: "100vw", data: this.cityFeed[postId], hasBackdrop: true});
    }
  }

  goBack() {
    this._location.back();
  }

}
