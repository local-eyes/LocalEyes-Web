import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firestore from 'firebase/app'
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { SignInCheckerComponent } from '../sign-in-checker/sign-in-checker.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from "@angular/common";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { SidenavComponent } from '../sidenav/sidenav.component';


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
showReply: any = []
answersLoaded: boolean = false;
isMobile = localStorage.getItem('isMobile');

  constructor(
    public router: ActivatedRoute,
    private _router: Router,
    private data: DataService,
    public auth: AuthService,
    public af: AngularFirestore,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private _location: Location
    ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.collection = this.router.snapshot.paramMap.get('collection');
    this.postId = this.router.snapshot.paramMap.get('id');
    this.getPostByPostId(this.collection, this.postId);
  }

  getPostByPostId(collection:string, id:string) {
    this.data.getSinglePost(id, collection).subscribe(res => {
      this.postData = res;
      this.loadComplete = true;
    })
    this.data.getAnswers(id).subscribe(comments => {
      this.commentsData = comments;
      for (let i = 0; i < this.commentsData.length; i++) {
        this.showReply.push({
          title: "Reply",
          icon: "reply",
          showReplyButton: false,
        })
      }
      this.answersLoaded = true
    })
  }

  incrementClaps() {
    const incrementor = firestore.firestore.FieldValue.increment(1);
    const postRef = this.af.collection(this.collection).doc(this.postId);
    postRef.update({'content.claps': incrementor});
    this.postData.content.claps += 1;
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }

  goBack() {
    this._location.back();
  }

  addComment(newComment: string) {
    this.postData.answers += 1;
    this.commentsData.push(newComment)
  }

  addReply(i:number, newComment: string) {
    this.postData.answers += 1;
    this.commentsData.push(newComment);
    this.showReply.push({
      title: "Reply",
      icon: "reply",
      showReplyButton: false,
    })
    this.showReply[i] = {
      title: "Reply",
      icon: "reply",
      showReplyButton: false,
    }
  }

  showReplyForm(i:any) {
    if (this.showReply[i].showReplyButton === false) {
    this.showReply[i] = {
      title: "Cancel",
      icon: "cancel",
      showReplyButton: true,
    }
    } else {
      this.showReply[i] = {
        title: "Reply",
        icon: "reply",
        showReplyButton: false,
      }
    }
  }

  formatAnswer(i: number, answer: any) {
    // replace @username with link
    if (answer.answer != null) {
      return document.getElementById(`answer${i}`).innerHTML = (answer.answer).replace(/@([A-Za-z0-9_]+)/g, `<span class="highlight" style="cursor:pointer">@$1</span>`);
    }
  }

  navigateToProfile(answer:any) {
    answer.answer.replace(/@([A-Za-z0-9_]+)/g, (match, p1) => {
      this._router.navigate(['/profile', answer.mentionUid]);
    }); 
  }

  openShareSheet(collection: string, id: string, name: string, title: string) {
    this.bottomSheet.open(SidenavComponent, {data: {collection: collection, id:id, name: name, title: title}})  
  }

}
