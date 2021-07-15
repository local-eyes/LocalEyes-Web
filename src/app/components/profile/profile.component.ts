import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

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
  constructor(public route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getProfileFromService(this.uid);
  }

  getProfileFromService(uid: string) {
    this.data.getProfile(uid).subscribe(res => {
      this.personData = res;
      this.dataLoaded = true;
      console.log(this.personData);
    });
  }

  getDate(seconds:number) {
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

  loadData(tabIndex:number, tabName:string) {
    
  }

  getLocalFeed(uid: string) {
    this.data.getUserLocalFeed(uid).subscribe(feed => {
      this.localFeed = feed;
      console.log(this.localFeed);
    })
  }
  getCityFeed(uid: string) {
    this.data.getUserCityFeed(uid).subscribe(feed => {
      this.cityFeed = feed;
      console.log(this.cityFeed);
    })
  }
  getUserAnswersFeed(uid: string) {
    this.data.getAnswersFeed(uid).subscribe(feed => {
      this.localFeed = feed;
      console.log(this.localFeed);
    })
  }

}
