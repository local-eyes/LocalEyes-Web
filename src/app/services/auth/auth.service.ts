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
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    afAuth.useEmulator("http://localhost:9099");
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

  private updateUserData({uid, email, displayName, photoURL}: User){
    const data = {
      uid,
      email, 
      displayName,
      photoURL
    }
    console.log(data);
    window.localStorage.setItem("user", JSON.stringify(data));
  }
}
