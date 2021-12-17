import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
isMobile = localStorage.getItem('isMobile');
title: string = "Complete your profile";
editUid: string = this.router.snapshot.paramMap.get('uid');
profileData: FormGroup;
user: any;

  constructor(
    public auth: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public _location: Location
  ) { }

  ngOnInit(): void {
    if (this.auth && this.editUid === this.auth.userData.uid) {
      this.user = this.auth.userData;
      this.profileData = this.fb.group({
        bio: [this.user.bio, [
          Validators.required,
          Validators.maxLength(200)
        ]],
        createdOn: this.user.createdOn,
        dob: '',
        email: {value: this.user.email, disabled: true},
        fullname: {value: this.user.fullname, disabled: true},
        gender: 'Male',
        imageURL: this.user.imageURL,
        is_completed: true,
        living_since: [this.user.living_since, [
          Validators.required,
          Validators.max(99),
          Validators.min(1)
        ]],
        locality: [this.user.locality, [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2)
        ]],
        phoneNum: '',
        uid: this.user.uid,
        occupation: ''
      })
    } else {
      this.route.navigate([`/profile/${this.editUid}`])
    }
  }

  get bio() {
    return this.profileData.get('bio')
  }

  get living_since() {
    return this.profileData.get('living_since')
  }

  get locality() {
    return this.profileData.get('locality')
  }

  async saveData() {
    const profileFormData = this.profileData.value;

    try {
      await this.afs.collection("users").doc(this.editUid).set(profileFormData, {merge: true});
      this.route.navigate([`/profile/${this.editUid}`]);
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy() {
    const formData = this.profileData.value;
    console.log(formData);    
    if (formData.locality == "" || formData.living_since == "" || formData.locality == null || formData.living_since == null) {
      alert("You Need to Fill Locality and Living Since to Continue");
      return this.route.navigate([`/profile/${this.user.uid}/edit`]);
    }
  }
}