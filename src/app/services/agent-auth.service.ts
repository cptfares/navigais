import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Company } from './company';
import { Agent } from './agent';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AgentAuthService {
  company= new Company
   public givenCode:any
  answer: boolean;
  res


  constructor( private afs: AngularFirestore ,private firebaseAuth : AngularFireAuth , public firebase:AngularFirestore,public db:AngularFireDatabase ) {
   }
  checkCode(code:string)  {
     let answer=false
    this.firebase.collection('companies').valueChanges().subscribe((res)=>
      res.forEach((a:Company)=>{
            if ( code==a.admin){
              console.log("awjdwaj")
              answer= true
         
        }
      })
   
    
  
    )
    console.log(answer)
    return this.answer
 



}
setCodel(code){

  this.givenCode=code
  console.log(this.givenCode)

}
getCode(){
  return this.givenCode
}
sginupUser(user,value:Company,data:Agent,code ): Promise<any> {
  return this.firebaseAuth.createUserWithEmailAndPassword(user.email,user.password).then((credential)=>{
    this.userData(credential.user,data)
    this.updateDoc(value,credential.user.uid,code )

  }).catch(eroor=>{
    console.log("auth.sginup eroor",eroor)
    if (eroor.code){
      return{isValid:false, message: eroor.message}
    }
  })

}
private userData(user,data) {
  const userRef : AngularFirestoreDocument<Agent> =  this.afs.doc(`users/${user.uid}`)
  const userf : AngularFireObject <Agent> = this.db.object('users/'+user.uid)
  userf.set(data)

  return userRef.set(data)

}
updateDoc(value:Company,id,code ) {
  const code1=code+"1"
  console.log(code1)
  value.agents.push(id)
  console.log(value)
  this.db.object('users/'+code1).set(value)

    this.afs.collection('companies').doc(code1).set(value, {merge:true})
}



}





