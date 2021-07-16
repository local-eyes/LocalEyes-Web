import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { LocationService } from 'src/app/services/location/location.service';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';
import firestore from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { SignInCheckerComponent } from '../sign-in-checker/sign-in-checker.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {
  radius:any = 6000;
  nearbyPosts:any;
  cityPosts:any;
  lat:any;
  lon: any;
  loadComplete:boolean = false;
  deviceInfo: any;
  isMobile = localStorage.getItem('isMobile');
  user:any;
  title = "Unanswered Questions";
  cityLoaded = false;
  constructor(
    private data: DataService, 
    private location: LocationService, 
    public dialog: MatDialog,
    public af: AngularFirestore,
    public auth: AuthService,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.user = this.auth.userData;
    this.location.getPosition().then(pos=>
      {
        this.lon = pos.lng;
        this.lat = pos.lat;
        this.getPosts(this.lat, this.lon, this.radius, null);
      });
  }

  getCity (city:string) {
    this.data.getCityUnanswered(city).subscribe(res => {
      this.cityPosts = res;
    })
  }
  getPosts(latitude, longitude, radius, sortBy) {
    this.loadComplete = false;
    this.data.getNearbyUnanswered(latitude, longitude, radius).subscribe(res => {
      this.nearbyPosts = res;
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

  openPost(collection:string, postId:string) {
    if (collection === "local") {
      this.dialog.open(PostComponent, {height: "90vh", width: "90vw", data: this.nearbyPosts[postId], hasBackdrop: true});
    } else {
      this.dialog.open(PostComponent, {height: "90vh", width: "90vw", data: this.cityPosts[postId], hasBackdrop: true});
    }
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }

  incrementClaps(collection:string, postToIncrease:string, i:number) {
    const incrementor = firestore.firestore.FieldValue.increment(1);
    const postRef = this.af.doc(`${collection}/${postToIncrease}`);
    postRef.update({'content.claps': incrementor});
    this.nearbyPosts[i].content.claps += 1;
  }

  copyToClipboard(collection: string, id:string) {
    this.snackbar.open("🎉 Copied to Clipboard!", null,{verticalPosition: "bottom", horizontalPosition: "end", duration: 3000});
    if (location.hostname === "localhost") {
      this.clipboard.copy(`http://localhost:4200/post/${collection}/${id}`);
    } else {
      this.clipboard.copy(`http://local-eyes.tech/post/${collection}/${id}`);
    }
  }

  formatThumb(value:number) {
    return value + 'mtr'
  }

  loadData(tabIndex:number) {
    if (tabIndex === 1 && this.cityLoaded == false) {
      this.getCity("jaipur");
      this.cityLoaded = true;
    }
  }

}
