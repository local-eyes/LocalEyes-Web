import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import firestore from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { SignInCheckerComponent } from '../sign-in-checker/sign-in-checker.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public post: any, 
    private data: DataService,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
    public af: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private deviceDetector: DeviceDetectorService
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

  copyToClipboard(collection: string, id:string) {
    this.snackbar.open("🎉 Copied to Clipboard!", null,{verticalPosition: "top", horizontalPosition: "end", duration: 3000});
    if (location.hostname === "localhost") {
      this.clipboard.copy(`http://localhost:4200/#/post/${collection}/${id}`);
    } else {
      this.clipboard.copy(`https://local-eyes.tech/app/#/post/${collection}/${id}`);
    }
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }

  addComment(newComment: string) {
    this.post.answers += 1;
    this.answers.unshift(newComment)
  }

}
