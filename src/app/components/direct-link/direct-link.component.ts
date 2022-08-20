import { Injectable, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
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
import { Title, Meta } from '@angular/platform-browser';


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
os = localStorage.getItem('os').toLowerCase() || null;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: any,
    public router: ActivatedRoute,
    private _router: Router,
    private data: DataService,
    public auth: AuthService,
    public af: AngularFirestore,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private _location: Location,
    private _title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    if (this.os !== null && this.os === 'android') {
      this.isMobile = "true";
    }
    this.collection = this.router.snapshot.paramMap.get('collection');
    this.postId = this.router.snapshot.paramMap.get('id');
    this.getPostByPostId(this.collection, this.postId);
    setTimeout(() => {
      // disable close mat bottome sheet
      this.bottomSheet.open(SidenavComponent, {data: {collection: this.collection, id:this.postId, name: this.postData.author.name, title: this.postData.content.title, type: 'prompt'}, disableClose: true})
    }, 1000);
  }

  getPostByPostId(collection:string, id:string) {
    this.data.getSinglePost(id, collection).subscribe(res => {
      this.postData = res;
      const newTitle = `${this.collection.toLocaleUpperCase()} ${this.postData.type.toLocaleUpperCase()} by ${this.postData.author.name} on LocalEyes`;
      this._title.setTitle(this.postData.content.title);
      this.meta.updateTag({ name: 'title', content: this.postData.content.title });
      this.meta.updateTag({ name: 'description', content: `${newTitle.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}` });
      this.meta.updateTag({ name: 'author', content: this.postData.author.name });
      this.meta.updateTag({ name: 'keywords', content: 'near me, hyperlocal, localeyes, local eyes, local eye, community, jaipur' });
      this.meta.updateTag({ property: 'og:description', content: `${newTitle.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}` });
      this.meta.updateTag({ property: 'og:title', content: this.postData.content.title });
      this.meta.updateTag({ property: 'og:image', content: this.postData.content.image ? this.postData.content.image : "https://localeyes.in/assets/imgs/Logo-14-bg.png" });
      this.meta.updateTag({ property: 'og:url', content: `https://localeyes.in/` });
      this.meta.updateTag({ name: 'twitter:title', content: this.postData.content.title });
      this.meta.updateTag({ name: 'twitter:description', content: `${newTitle.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}` });
      this.meta.updateTag({ name: 'twitter:image', content: this.postData.content.image ? this.postData.content.image : "https://localeyes.in/assets/imgs/Logo-14-bg.png" });
      this.meta.updateTag({ name: 'twitter:image:alt', content: this.postData.content.image ? `image posted by ${this.postData.author.name}` : "LocalEyes Logo" });
      this.meta.updateTag({ name: 'twitter:url', content: `https://localeyes.in/app/${this.collection}/${this.postId}` });
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
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
    if (isPlatformBrowser(this.platformId)) {
      if (answer.answer != null) {
        return document.getElementById(`answer${i}`).innerHTML = (answer.answer).replace(/@([A-Za-z0-9_]+)/g, `<span class="highlight" style="cursor:pointer">@$1</span>`);
      }
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
