import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import firestore from 'firebase/app'
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { SignInCheckerComponent } from '../sign-in-checker/sign-in-checker.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from "@angular/cdk/clipboard";
import { Location } from "@angular/common";


@Component({
  selector: 'app-direct-link',
  templateUrl: './direct-link.component.html',
  styleUrls: ['./direct-link.component.css']
})
export class DirectLinkComponent implements OnInit {
title: string = "Post"
postData: any;
commentsData: any;
routeSub: any;
collection: string;
postId: string;
loadComplete: boolean = false;
answersLoaded: boolean = false;
isMobile = localStorage.getItem('isMobile');

  constructor(
    public router: ActivatedRoute,
    private data: DataService,
    public auth: AuthService,
    public af: AngularFirestore,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
    private _location: Location
    ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.collection = this.router.snapshot.paramMap.get('collection');
    this.postId = this.router.snapshot.paramMap.get('id');
    console.log(`${this.collection}/${this.postId}`);
    this.getPostByPostId(this.collection, this.postId);
  }

  getPostByPostId(collection:string, id:string) {
    this.data.getSinglePost(id, collection).subscribe(res => {
      this.postData = res;
      console.log(this.postData);
      this.loadComplete = true;
    })
    this.data.getAnswers(id).subscribe(comments => {
      this.commentsData = comments;
      console.log(this.commentsData);
      this.answersLoaded = true
    })
  }

  incrementClaps() {
    const incrementor = firestore.firestore.FieldValue.increment(1);
    const postRef = this.af.collection(this.collection).doc(this.postId);
    postRef.update({'content.claps': incrementor});
    this.postData.content.claps += 1;
  }

  copyToClipboard(collection: string, id:string) {
    this.snackbar.open("🎉 Copied to Clipboard!", null,{verticalPosition: "top", horizontalPosition: "end", duration: 3000});
    if (location.hostname === "localhost") {
      this.clipboard.copy(`http://localhost:4200/post/${collection}/${id}`);
    } else {
      this.clipboard.copy(`http://local-eyes.tech/post/${collection}/${id}`);
    }
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }

  goBack() {
    this._location.back();
  }

  addComment(newComment: string) {
    this.postData.answers += 1;
    this.commentsData.unshift(newComment)
  }

}
