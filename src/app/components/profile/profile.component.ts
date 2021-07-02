import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
uid: string;
private routeSub: any;
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['uid']);
    this.routeSub = this.route.params.subscribe(param => {
      console.log(param);
      this.uid = param['uid'];
      console.log(this.uid);
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
  }

}
