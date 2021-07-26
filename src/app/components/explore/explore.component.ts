import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
isMobile = localStorage.getItem('isMobile');
notifs$ : Observable<any>;
uid = this.auth.userData.uid || null;
  constructor(private data: DataService, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.uid) {
      this.data.getNotifications(this.uid).subscribe(notif => {
        this.notifs$ = notif;
        console.log(this.notifs$);
      });
    }
  }

}
