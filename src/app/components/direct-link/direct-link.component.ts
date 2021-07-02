import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direct-link',
  templateUrl: './direct-link.component.html',
  styleUrls: ['./direct-link.component.css']
})
export class DirectLinkComponent implements OnInit, OnDestroy {
postData: any;
routeSub: any;
collection: string;
postId: string;
  constructor(
    private af: AngularFirestore,
    public router: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.routeSub = this.router.params.subscribe(params => {
      this.collection = params['collection'];
      this.postId = params['id'];
      this.getPostByPostId(this.collection, this.postId);
      console.log(this.postData);
    })
  }

  getPostByPostId(collection:string, id:string) {
    let postQuery = this.af.collection(collection).doc(id).get()
    postQuery.subscribe(post => {
      console.log(post);
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
