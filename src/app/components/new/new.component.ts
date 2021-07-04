import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import firestore from 'firebase/app'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { geohashForLocation } from "geofire-common";


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
title: string = "Create New Post";
postingIn = "local";

isProfileComplete: boolean;
author: object;

localPost: FormGroup;
cityPost: FormGroup;

lat: any;
lon: any;
hash: string;
point: any;

loading: boolean;
success: boolean;

  constructor( 
    private afs: AngularFirestore, 
    private fb: FormBuilder,
    public auth: AuthService,
    public location: LocationService
    ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUserLocation();
    this.localPost = this.fb.group({
      answers: 0,
      author: this.author,
      content: this.fb.group({
        claps: 1,
        title: ['', [
          Validators.required,
          Validators.minLength(10)
        ]],
        description: '',
      }),
      position: {
        geohash: this.hash,
        geopoint: this.point
      },
      postedOn: firestore.firestore.Timestamp.now(),
      type: ['question', [
        Validators.required
      ]]
    })
    this.cityPost = this.fb.group({
      answers: 0,
      author: this.author,
      content: this.fb.group({
        claps: 1,
        title: ['', [
          Validators.required,
          Validators.minLength(10)
        ]],
        description: '',
      }),
      city: 'Jaipur',
      postedOn: firestore.firestore.Timestamp.now(),
      type: ['question', [
        Validators.required
      ]]
    })
  }

  get postTitle() {
    return this.localPost.get('content.title')
  }

  getUserData(){
    this.auth.user$.subscribe(user => {
      this.isProfileComplete = user.is_completed;
      this.author= {
        image: user.imageURL,
        name: user.fullname,
        uid: user.uid,
        locality: user.locality,
        living_since: user.living_since,
      };
    })
    console.log(this.author);
  }

  getUserLocation() {
    this.location.getPosition().then(position => {
      this.lat = position.lat;
      this.lon = position.lng;
      this.point = new firestore.firestore.GeoPoint(this.lat, this.lon)
      this.hash = geohashForLocation([position.lat, position.lng]);
      console.log(this.lon, this.lat, this.point, this.hash);
    })
  }

  async postToLocalFeed(){
    this.loading = true;

    const formValue = this.localPost.value;
    try {
      await console.log(formValue);
      this.success = true
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
}
