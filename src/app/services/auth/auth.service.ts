import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>
  userData:any;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // afAuth.useEmulator("http://localhost:9099");
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async googleSignIn(){ 
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await firebase.auth().signInWithPopup(provider)

    return this.updateUserData(credential.user);
  }

  async signOut() {
    await firebase.auth().signOut();
    window.localStorage.removeItem("user");
    return this.router.navigate(['/']);
  }

  private updateUserData({uid}: User){
    const userRef = this.afs.doc(`users/${uid}`).get().subscribe(data => {
      this.userData = data.data()
      console.log(this.userData);
      window.localStorage.setItem("user", JSON.stringify(this.userData))
    })
  }
}