import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from './user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>
  userData:any;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // afAuth.useEmulator("http://localhost:9099",);
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.afs.doc<User>(`users/${user.uid}`).get().subscribe(userData => {
            this.userData = userData.data();
          })
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async googleSignIn(){ 
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await firebase.auth().signInWithPopup(provider);
    this.dialog.closeAll();

    return this.updateUserData(credential.user.uid);
  }

  async signOut() {
    await firebase.auth().signOut();
    this.userData = null;
    return this.router.navigate(['/']);
  }

  private updateUserData(uid){
    const userRef = this.afs.doc(`users/${uid}`).get().subscribe(data => {
      this.userData = data.data()
      if (this.userData.is_completed === true) {
        this.snackBar.open("Welcome Back to LocalEyes ✨", "Thanks!", {horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: 'snackbar'});      
      } else {
        this.router.navigate([`/profile/${uid}/edit`]);
        this.snackBar.open("Welcome! Complete Profile to Continue", "", {horizontalPosition: 'center', verticalPosition: 'bottom', duration: 3000, panelClass: 'snackbar'});
      }
    })
  }
}
