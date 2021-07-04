import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import firestore from 'firebase/app'
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { SignInCheckerComponent } from '../sign-in-checker/sign-in-checker.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-direct-link',
  templateUrl: './direct-link.component.html',
  styleUrls: ['./direct-link.component.css']
})
export class DirectLinkComponent implements OnInit {
postData: any;
commentsData: any;
routeSub: any;
collection: string;
postId: string;
loadComplete: boolean = false;
answersLoaded: boolean = false;

  constructor(
    public router: ActivatedRoute,
    private data: DataService,
    public auth: AuthService,
    public af: AngularFirestore,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
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

  incrementClaps(postToIncrease:string, collection:string) {
    const incrementor = firestore.firestore.FieldValue.increment(1);
    const postRef = this.af.doc(`${collection}/${postToIncrease}`);
    postRef.update({'content.claps': incrementor});
    this.postData.content.claps += 1;
  }

  openSignInChecker() {
    this.dialog.open(SignInCheckerComponent);
  }

}
