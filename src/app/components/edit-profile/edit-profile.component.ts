import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
isMobile = localStorage.getItem('isMobile');
title: string = "Complete your profile";
editUid: string = this.router.snapshot.paramMap.get('uid');
profileData: FormGroup

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
      let user = this.auth.userData;
      this.profileData = this.fb.group({
        bio: [user.bio, [
          Validators.required,
          Validators.maxLength(200)
        ]],
        createdOn: user.createdOn,
        dob: '',
        email: {value: user.email, disabled: true},
        fullname: {value: user.fullname, disabled: true},
        gender: 'Male',
        imageURL: user.imageURL,
        is_completed: true,
        living_since: [user.living_since, [
          Validators.required,
          Validators.max(99),
          Validators.min(1)
        ]],
        locality: [user.locality, [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2)
        ]],
        phoneNum: '',
        uid: user.uid,
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
      console.log(profileFormData);
      await this.afs.collection("users").doc(this.editUid).set(profileFormData, {merge: true});
      this.route.navigate([`/profile/${this.editUid}`]);
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {
    this._location.back();
  }

}
