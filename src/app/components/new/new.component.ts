import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import firestore from 'firebase/app'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';
import { geohashForLocation } from "geofire-common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
title: string = "Create New Post";
postingIn = "local";
postType = "question";

author: any;

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
    private router: Router
    ) { }

  ngOnInit(): void {
    this.author = this.auth.userData;
    this.getUserLocation();
    this.localPost = this.fb.group({
      answers: 0,
      author: {
        image: this.author.imageURL,
        living_since: this.author.living_since,
        locality: this.author.locality,
        name: this.author.fullname,
        uid: this.author.uid
      },
      content: this.fb.group({
        claps: 1,
        title: ['', [
          Validators.required,
          Validators.minLength(10)
        ]],
        description: [''],
      }),
      position: {
        geohash: this.hash,
        geopoint: this.point
      },
      postedOn: firestore.firestore.Timestamp.now(),
      type: [this.postType, [
        Validators.required
      ]]
    })
    this.cityPost = this.fb.group({
      answers: 0,
      author: {
        image: this.author.imageURL,
        living_since: this.author.living_since,
        locality: this.author.locality,
        name: this.author.fullname,
        uid: this.author.uid
      },
      content: this.fb.group({
        claps: 1,
        title: ['', [
          Validators.required,
          Validators.minLength(10)
        ]],
        description: [''],
      }),
      city: 'jaipur',
      postedOn: firestore.firestore.Timestamp.now(),
      type: [this.postType, [
        Validators.required
      ]]
    });
    this.localPost.valueChanges.subscribe(val => {
      if (val.type == 'announcement') {
        // this.localPost.controls['content.description'].setValidators([Validators.required])
        this.localPost.get('content.description').setValidators([Validators.required, Validators.minLength(10)]);
      }
    });
  }
  

  get localTitle() {
    return this.localPost.get('content.title')
  }

  get localDesc() {
    return this.localPost.get('content.description')
  }

  get cityTitle() {
    return this.cityPost.get('content.title')
  }

  get cityDesc() {
    return this.cityPost.get('content.description')
  }

  getUserLocation() {
    this.lat = parseFloat(localStorage.getItem("latitude"))
    this.lon = parseFloat(localStorage.getItem("longitude"))
    this.point = new firestore.firestore.GeoPoint(this.lat, this.lon)
    this.hash = geohashForLocation([this.lat, this.lon]);
    console.log(this.lon, this.lat, this.point, this.hash);
  }

  async postToLocalFeed(){
    this.loading = true;

    const formValue = this.localPost.value;
    try {
      await this.afs.collection("local").add(formValue);
      this.success = true
      this.router.navigate([""]);
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async postToCityFeed(){
    this.loading = true;

    const formValue = this.cityPost.value;
    try {
      await this.afs.collection("city").add(formValue);
      this.success = true
      this.router.navigate([""]);
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
}
