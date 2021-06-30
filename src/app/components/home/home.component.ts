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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  radius:any = 1500;
  nearbyPosts:any;
  cityPosts:any;
  lat:any;
  lon: any;
  loadComplete:boolean = false;
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
    this.location.getPosition().then(pos=>
      {
        this.lon = pos.lng;
        this.lat = pos.lat;
        this.getPosts(this.lat, this.lon, this.radius, null);
        this.getCity("jaipur");
      });
  }

  getCity (city:String) {
    this.data.getCityPosts(city).subscribe(res => {
      this.cityPosts = res;
      console.log("City Posts", this.cityPosts);
    })
  }
  getPosts(latitude, longitude, radius, sortBy) {
    this.loadComplete = false;
    this.data.getNearbyPosts(latitude, longitude, radius, sortBy).subscribe(res => {
      this.nearbyPosts = res;
      console.log("Nearby Posts", this.nearbyPosts);
      this.loadComplete = true;
    })
  }

  log(value) {
    console.log(value);
    
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

  incrementClaps(postToIncrease:string, i:number) {
    const incrementor = firestore.firestore.FieldValue.increment(1);
    const postRef = this.af.doc(`localQuestions/${postToIncrease}`);
    postRef.update({'content.claps': incrementor});
    this.nearbyPosts[i].content.claps += 1;
  }

  copyToClipboard(id:string) {
    this.snackbar.open("🎉 Copied to Clipboard!", null,{verticalPosition: "top", horizontalPosition: "end", duration: 3000});
    if (location.hostname === "localhost") {
      this.clipboard.copy(`http://localhost:4200/post/${id}`);
    } else {
      this.clipboard.copy("Coming Soon");
    }
  }

  formatThumb(value:number) {
    return value + 'mtr'
  }
}
