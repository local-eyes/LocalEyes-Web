import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
uid: string;
personData: any;
dataLoaded: boolean = false
private routeSub: any;
  constructor(public route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getProfileFromService(this.uid);
  }

  getProfileFromService(uid: string) {
    this.data.getProfile(uid).subscribe(res => {
      this.personData = res;
      this.dataLoaded = true;
    });
  }

}
