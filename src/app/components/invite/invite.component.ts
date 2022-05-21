import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  isLoading: boolean = true;
  referrerData: any;
  referrerName: String;
  referrerCode: String;
  seconds: number = 10;
  constructor(
    private router: ActivatedRoute,
    private afs: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.referrerCode = params['code'];
    });
    console.log(this.referrerCode);
    if (this.referrerCode) {
      this.getReferrerData(this.referrerCode);
    } else {
      this.isLoading = false;
      this.redirectToPlayStore();
    }
  }

  redirectToPlayStore() {
    // 10 seconds timer before redirection
    setInterval(() => {
      this.seconds--;
      if (this.seconds === 1) {
        window.location.href = 'https://play.google.com/store/apps/details?id=tech.dagurmittal.app&utm-campaign=referral-campaing&utm-source=referral-link&utm-medium=invite-link&utm-content=referral-link&utm-term=referral-link';
      }
    }, 1000);
  }

  getReferrerData(code:String): void {
    // get referralData id from firestore where code = code
    this.afs.collection('referralData').ref.where('code', '==', code).get().then(querySnapshot => {
      if (querySnapshot.empty) {
        console.log("invalid code");
        this.isLoading = false;
        this.redirectToPlayStore();
      } else {
        const referrerId = querySnapshot.docs[0].id;
        this.afs.doc("users/"+referrerId).get().subscribe(user => {
          this.referrerData = user.data();
          this.isLoading = false;
          this.referrerName = this.referrerData.fullname;
          this.redirectToPlayStore();
        });
      }
    });
  }
}