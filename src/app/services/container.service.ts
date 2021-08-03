import { Injectable } from '@angular/core';
import { Container } from './container';
import { AngularFireList, AngularFireDatabase  } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from './company';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
 private detail =  new BehaviorSubject<object>  (

  {name:"yass"}
  

  )
  currentdetail = this.detail.asObservable();
  path="/containers"
  containerRef :Array<Observable<object>>
  container=[]
  company1: Company;
  ida:string
  ignore=true
  listofcontainers:Array<Observable<object>>
  containerstList

  constructor(private database : AngularFireDatabase ,private userinfo:UserInfoService, private afs : AngularFirestore) {
    this.containerRef=[]
   }
   setUp(container:Container):any{
     console.log("1")
        this.userinfo.getUserInfo().subscribe((user)=>{
          console.log("2")
 
       this.afs.collection("companies").doc(`${user.companyId}`).valueChanges().subscribe((res:Company)=>{
            console.log(this.ignore)
        if(this.ignore){
          console.log(this.ignore)

        this.company1=res
        this.company1.containers.push(container.id)
       this.update(this.company1,user.companyId)
       console.log("3")
       this.ignore=false
       console.log(this.ignore)

       return this.company1

        }
        console.log(this.ignore)

      
    })
        

    




    })
    this.ignore=true

   }


 private update(data:Company,_id){       
  this.afs.collection('companies').doc(_id).set(data,{merge:true})

}
getagents():Array<Observable<object>>{
  this.listofcontainers=[]
  let user =this.userinfo.getUserInfo().subscribe(user=>{
      this.afs.collection("companies").doc(`${user.companyId}`).valueChanges().subscribe((res:Company)=>{
        this.containerstList=res.containers
        console.log( this.containerstList)
        this.containerstList.forEach(element => {
          this.database.object("/containers/"+element).valueChanges().subscribe((res:Container)=>{
            console.log(res)
            let agent= res
            this.getagentslist(agent)
            console.log(  this.listofcontainers)
          })         
        });
      })    
    })
    console.log(  this.listofcontainers)
    return ( this.listofcontainers)
  


  
  }
  private getagentslist(agent){
    this.listofcontainers.push(agent)
    console.log(  this.listofcontainers)
    return ( this.listofcontainers)

   }



   changeDetail(newValue: object){

    this.detail.next(newValue)
   }
 gecontainers() {
  this.userinfo.getUserInfo().subscribe(user=>{
      this.afs.collection("companies").doc(`${user.companyId}`).valueChanges().subscribe((res:Company)=>{
          this.containerslist(res.containers)
      })
      
      
     
    })
   }

containerslist(data){
  this.listofcontainers=data
  
}

  
 
}
