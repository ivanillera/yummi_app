import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {
    auth.authState.subscribe(user=>{
      console.log(user);
    })
   }

  logOut() {return this.auth.signOut();}

  googleAuth() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }

  facebookAuth() {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
  }

}
