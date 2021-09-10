import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firestore from 'firebase/app'
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-not-open',
  templateUrl: './not-open.component.html',
  styleUrls: ['./not-open.component.css']
})
export class NotOpenComponent implements OnInit {
  city: string;
  submitted = false;
  requestForm: FormGroup
  constructor(
    private router: ActivatedRoute,
    private afs: AngularFirestore, 
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.city = this.router.snapshot.queryParamMap.get('city')
    this.requestForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      city: this.city,
      postedOn: firestore.firestore.Timestamp.now(),
      postedFrom: "web",
      coords: `${localStorage.getItem("latitude")}, ${localStorage.getItem("longitude")}`,
    });
  }

  get email() {
    return this.requestForm.get('email')
  }

  async requestLaunch() {
    const formValue = this.requestForm.value;
    try {
      await this.afs.collection("launch-request").add(formValue);
      this.submitted = true;
    } catch (error) {
      console.log(error);
      this.submitted = false;
    }
  }
}
