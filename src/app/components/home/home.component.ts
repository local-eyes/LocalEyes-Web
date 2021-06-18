import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts:any;
  lat:any;
  lon: any;
  loadComplete:boolean = false;
  constructor(private data: DataService, private location: LocationService) { }

  ngOnInit(): void {
    this.location.getPosition().then(pos=>
      {
        this.lon = pos.lng;
        this.lat = pos.lat;
        this.getPosts(this.lat, this.lon, 10000);
      });
  }

  getPosts(latitude, longitude, radius) {
    this.data.getNearbyPosts(latitude, longitude, radius).subscribe(res => {
      this.posts = res;
      console.log(this.posts);
      this.loadComplete = true;
    })
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
}
