import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {collection: string, id: string, name: string, title: string, type?: string},
    private bottomSheetRef: MatBottomSheetRef<SidenavComponent>,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  dismissSheet() {
    this.bottomSheetRef.dismiss();
  }

  copyToClipboard() {
    this.snackbar.open("🎉 Copied to Clipboard!", null,{verticalPosition: "top", horizontalPosition: "end", duration: 3000, panelClass: ["snackbar"]});
    if (location.hostname === "localhost") {
      const msg = `Checkout this post by ${this.data.name}:\n*${this.data.title}*\n\nhttp://localhost:4200/post/${this.data.collection}/${this.data.id}`
      this.clipboard.copy(msg);
    } else {
      const msg = `https://localeyes.in/app/post/${this.data.collection}/${this.data.id}`
      this.clipboard.copy(msg);
    }
  }

  sendWhatsapp() {
    let url = "https://wa.me/";
    if (location.hostname === "localhost") {
      const link = "http://localhost:4200/"
      let msg = "Checkout this post by " + this.data.name + ":\n*" + this.data.title + "*\n\n" + link + "post/" + this.data.collection + "/" + this.data.id;
      msg = encodeURIComponent(msg)
      url += "?text=" + msg;
      window.open(url)
    } else {
      const link = "https://localeyes.in/app/"
      let msg = "Checkout this post by " + this.data.name + ":\n*" + this.data.title + "*\n\n" + link + "post/" + this.data.collection + "/" + this.data.id;
      msg = encodeURIComponent(msg)
      url += "?text=" + msg;
      window.open(url)
      }
  }

  sendTweet() {
    let url = "https://twitter.com/intent/tweet";
    if (location.hostname === "localhost") {
      const link = "http://localhost:4200/"
      let msg = "Checkout this post by " + this.data.name + ":\n*" + this.data.title + "*\n\n" + link + "post/" + this.data.collection + "/" + this.data.id;
      msg = encodeURIComponent(msg)
      url += "?text=" + msg;
      window.open(url)
    } else {
      const link = "https://localeyes.in/app/"
      let msg = "Checkout this post by " + this.data.name + ":\n*" + this.data.title + "*\n\n" + link + "post/" + this.data.collection + "/" + this.data.id;
      msg = encodeURIComponent(msg)
      url += "?text=" + msg;
      window.open(url)
    }
  }

}
