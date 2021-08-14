import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database'
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'jquery';
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
    this.agentList=[]

    this.listofagents=[]
   }

   getCompany(givencode) {
    this.listofagents=[]

    this.db.list('/companies').valueChanges().subscribe((res)=>
    res.forEach((a:Company)=>{
          if ( givencode==a.admin){
            console.log(a)
          return a
       
      }
    })
 
  

  )
     

   }

  getagents():Array<Observable<object>>{
    this.agentList=[]
    this.listofagents=[]
    this.listofagents.map( () =>    this.listofagents.pop())    
    console.log(this.listofagents)
if(this.listofagents.length === 0){
  this.listofagents.map( () =>    this.listofagents.pop())    

        let user =this.userinfo.getUserInfo().subscribe(user=>{
        this.db.object("companies/"+user.companyId).valueChanges().subscribe((res:Company)=>{
          this.listofagents.map( () =>    this.listofagents.pop())    

          this.agentList=res.agents
          console.log(this.agentList)
          this.agentList.shift()
          this.agentList.shift()
          
          this.agentList.forEach(element => {
            this.db.object("users/"+element).valueChanges().subscribe((res:User)=>{
              this.listofagents.map( () =>    this.listofagents.pop())    

              let agent= res
              this.getagentslist(agent)
   
            })

            
          });
        })
        
        
       
      })

}else{
  return
}    



      console.log(this.listofagents)
      this.agentList=[]
      return (this.listofagents)
    


    
    }






    clear(){
      this.listofagents=[]
    }
    
   private getagentslist(agent){
     this.listofagents.push(agent)
    }
    deleteAgent(uid,data:Company){
      this.db.object("users/"+uid).remove
      this.update(data)

    }

    private update(data:Company){
      this.db.object('users/'+data.key).set(data)
      

    }



   crateCompany(company:Company):any{
     return this.companyRef.push(company)
     

   }

}