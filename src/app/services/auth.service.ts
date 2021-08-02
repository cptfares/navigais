import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { of, from, fromEvent, interval,Observable} from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Company } from './company';








interface User {
  uid:string;
  email: string;
  adress ?: string;
  city ? : string;
  company ? :string;
  country ? :string;
  fullName ? :string;
  phone ? :number;
  role ? : boolean;
  companyId?:string


}
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  company  : Company;

  userId :any
  user : Observable <User>;
  isLoggedIn:boolean

  constructor( private firebaseAuth : AngularFireAuth , private afs: AngularFirestore , private route :Router ) { 
    this.isLoggedIn=false;
    this.firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
    })
      this.user = this.firebaseAuth.authState.pipe(
        switchMap(user => {
        if (user) {
         return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
        of()
        }
     }))
      
      
      


  }

    sginupUser(user:any,data:User,company:Company): Promise<any> {
      return this.firebaseAuth.createUserWithEmailAndPassword(user.email,user.password).then((credential)=>{
        company.admin=credential.user.uid
        company.key=credential.user.uid+"1"
        data.companyId=company.key

        this.userData(credential.user,data)
        this.setComapnies1(credential.user,company)
      })
      .catch(eroor=>{
        console.log("auth.sginup eroor",eroor)
        if (eroor.code){
          return{isValid:false, message: eroor.message}
        }
      })

    }
    loginUser(email:string,password:string) :Promise<any>{
      return this.firebaseAuth.signInWithEmailAndPassword(email,password).then(()=>{
        console.log("auth service: login user: success")
      })
      .catch(eroor=>{
        console.log("auth :login eroor")
        console.log("eroor code :" , eroor.code)
        console.log("eroor",eroor)
        if (eroor.code)
        return {isvalid:false, message : eroor.message}
      })
    }
    private userData(user,data:User) {
      const userRef : AngularFirestoreDocument<User> =  this.afs.doc(`users/${user.uid}`)

      return userRef.set(data)

    }
    setComapnies1 (user,company){
    const userRef : AngularFirestoreDocument<any> =  this.afs.doc(`companies/${user.uid+"1"}`)
    return userRef.set(company)


   }

    private setComapnies ( data:Company):any{
     this.afs.collection("companies").add(data)

  }

  
  


}
