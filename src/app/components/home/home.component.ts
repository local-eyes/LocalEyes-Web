import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts:any;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getPosts(26.842294, 75.830585, 10000);
  }
  getPosts(latitude, longitude, radius) {
    this.data.getNearbyPosts(latitude, longitude, radius).subscribe(res => {
      this.posts = res;
      console.log(this.posts);
    });
    
  }
}
