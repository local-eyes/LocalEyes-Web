import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import firestore from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { SignInCheckerComponent } from '../sign-in-checker/sign-in-checker.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  answers:any;
  answersLoaded:boolean = false;
  deviceInfo = null;
  isMobile: boolean;
  showReply: boolean[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public post: any, 
    private data: DataService,
    public af: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private router: Router,
    private deviceDetector: DeviceDetectorService,
    private bottomSheet: MatBottomSheet
    ) { 
      this.detectDevice();
    }

  ngOnInit(): void {
    this.fetchAnswers(this.post.id);
  }

  detectDevice() {
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    this.isMobile = this.deviceDetector.isMobile();
  }

  fetchAnswers(postId){
    this.data.getAnswers(postId).forEach(res => {
      this.answers = res;
      this.answersLoaded = true;
    })
  }

  incrementClaps(postToIncrease:string, i:number) {
    const incrementor = firestore.firestore.FieldValue.increment(1);
    const postRef = this.af.doc(`localQuestions/${postToIncrease}`);
    postRef.update({'content.claps': incrementor});
    this.post.content.claps += 1;
  }

  openShareSheet(collection: string, id: string, name: string, title: string) {
    this.bottomSheet.open(SidenavComponent, {data: {collection: collection, id:id, name: name, title: title}})  
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }

  addComment(newComment: string) {
    this.post.answers += 1;
    this.answers.push(newComment);
  }

  addReply(i:number, newComment: string) {
    this.post.answers += 1;
    this.answers.push(newComment);
    this.showReply[i] = false;
  }

  showReplyForm(i:any) {
    this.showReply[i] = !this.showReply[i];
  }

  formatAnswer(i: number, answer: any) {
    // replace @username with link
    return document.getElementById(`answer${i}`).innerHTML = (answer.answer).replace(/@([A-Za-z0-9_]+)/g, `<span class="highlight" style="cursor:pointer">@$1</span>`);
  }

  navigateToProfile(answer:any) {
    answer.answer.replace(/@([A-Za-z0-9_]+)/g, (match, p1) => {
      this.router.navigate(['/profile', answer.mentionUid]);
    }); 
  }

}
