import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
 cuurentmessage= new BehaviorSubject (null)

  constructor( private db : AngularFireDatabase, private afAuth : AngularFireAuth ) { }

  private updateToken(token){
    this.afAuth.authState.subscribe(user=>{
      if (!user) return;
      const data ={[user.uid]:token}
      this.db.object("fcmtoken/").update(data)
      
    })
  }

}


