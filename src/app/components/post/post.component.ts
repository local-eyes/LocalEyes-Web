import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import firestore from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { SignInCheckerComponent } from '../sign-in-checker/sign-in-checker.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  answers:any;
  answersLoaded:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public post: any, 
    private data: DataService,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
    public af: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService
    ) { }

  ngOnInit(): void {
    console.log(this.post);
    this.fetchAnswers(this.post.id);
  }

  fetchAnswers(postId){
    this.data.getAnswers(postId).forEach(res => {
      this.answers = res;
      this.answersLoaded = true;
      console.log(res);
      
    })
  }

  incrementClaps(postToIncrease:string, i:number) {
    const incrementor = firestore.firestore.FieldValue.increment(1);
    const postRef = this.af.doc(`localQuestions/${postToIncrease}`);
    postRef.update({'content.claps': incrementor});
    this.post.content.claps += 1;
  }

  copyToClipboard(id:string) {
    this.snackbar.open("🎉 Copied to Clipboard!", null,{verticalPosition: "top", horizontalPosition: "end", duration: 3000});
    if (location.hostname === "localhost") {
      this.clipboard.copy(`http://localhost:4200/post/${id}`);
    } else {
      this.clipboard.copy("Coming Soon");
    }
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }
}
