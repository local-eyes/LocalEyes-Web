import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  answers:any = [];
  answersLoaded:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public post: any, private data: DataService) { }

  ngOnInit(): void {
    this.fetchAnswers(this.post.id);
  }

  fetchAnswers(postId){
    this.data.getAnswers(postId).forEach(res => {
      this.answers = res;
      this.answersLoaded = true;
      console.log(res);
      
    })
  }
}
