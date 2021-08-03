import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Company } from './company';
import { User } from './user';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class ComapniesGurdService {
  path="/companies" 
  companyRef :  AngularFireList <Company>
  userID:any
  listofagents:Array<Observable<object>>
  agentList


  constructor(private db: AngularFireDatabase ,private userinfo:UserInfoService, private afs: AngularFirestore , private ath: AngularFireAuth ) {
    this.companyRef= this.db.list(this.path)
    this.listofagents=[]
   }

   getCompany(givencode) {
    this.afs.collection('companies').valueChanges().subscribe((res)=>
    res.forEach((a:Company)=>{
          if ( givencode==a.admin){
            console.log(a)
          return a
       
      }
    })
 
  

  )
     

   }

  getagents():Array<Observable<object>>{
    this.listofagents=[]
    let user =this.userinfo.getUserInfo().subscribe(user=>{

        this.afs.collection("companies").doc(`${user.companyId}`).valueChanges().subscribe((res:Company)=>{
          this.agentList=res.agents
          console.log(this.agentList)
          this.agentList.forEach(element => {
            this.afs.collection("users").doc(`${element}`).valueChanges().subscribe((res:User)=>{
              let agent= res
              this.getagentslist(agent)
   
            })

            
          });
        })
        
        
       
      })
      console.log(this.listofagents)
      return (this.listofagents)
    


    
    }
    
   private getagentslist(agent){
     this.listofagents.push(agent)
    }
    deleteAgent(uid,data:Company){
      this.afs.collection("users").doc(`${uid}`).delete()
      this.update(data)

    }

    private update(data:Company){
      this.afs.collection('users').doc(data.key).set(data, {merge:true})

    }



   crateCompany(company:Company):any{
     return this.companyRef.push(company)
     

   }

}