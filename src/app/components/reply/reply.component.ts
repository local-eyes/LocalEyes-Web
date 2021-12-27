import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import firestore from "firebase/app";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() replyData: any;
  @Output() newReplyEvent = new EventEmitter<any>();
  reply:FormGroup;
  author: any;
  isMobile = localStorage.getItem('isMobile');

  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.auth.userData) {
      this.author = this.auth.userData;
      this.reply = this.fb.group({
        answer: new FormControl({value: '', disabled: !this.auth.userData.is_completed}, [
          Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
        ]),
        author: {
          fullname: this.author.fullname,
          image: this.author.imageURL,
          living_since: this.author.living_since,
          locality: this.author.locality,
          uid: this.author.uid,
          role: this.author.role
        },
        docRef: this.replyData.docRef,
        pId: this.replyData.pId, 
        mentionUid: this.replyData.author.uid,
        postedOn: firestore.firestore.Timestamp.now()
      });
    }
  }

  get answer() {
    return this.reply.get('answer');
  }

  async postReply() {
    var replyValue = this.reply.value;
    replyValue.answer = `@${(this.replyData.author.fullname).replaceAll(' ', '')} ${replyValue.answer}`;
    try {
      await this.afs.collection("comments").add(replyValue);
      this.newReplyEvent.emit(replyValue);
      this.reply.get('answer').reset();
      this.reply.get('answer').clearValidators();
      this.reply.get('answer').updateValueAndValidity();
    } catch (error) {
    }
  }


}
