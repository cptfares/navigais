import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { of, from, fromEvent, interval,Observable} from 'rxjs';
import { User } from './user';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  user : Observable <User> 
  userInfo: Observable<any>;

  constructor( public firebaseAuth : AngularFireAuth , public afs: AngularFirestore, public db:AngularFireDatabase ) {
    this.user = this.firebaseAuth.authState
    this.userInfo = this.firebaseAuth.authState.pipe(
      switchMap(user => {
      if (user) {
       return this.db.object("users/"+user.uid).valueChanges();
      } else {
      of()
      }
   }))
   }
   getUserInfo(){
  return this.userInfo
}

getuser(){
  this.userInfo = this.firebaseAuth.authState.pipe(
    switchMap(user => {
    if (user) {
     return this.db.object("users/"+user.uid).valueChanges();
    } else {
    of()
    }
 }))

}
}

