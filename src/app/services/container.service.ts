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
  containerRef : AngularFireList<Container>
  container=[]
  company1: Company;
  ida:string
  ignore=true
  listofcontainers

  constructor(private database : AngularFireDatabase ,private userinfo:UserInfoService, private afs : AngularFirestore) {
    this.containerRef = this.database.list(this.path)

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

 async  addcontainer(container: Container,_id):Promise<any>{
    this.containerRef.set(_id,container)
  }
   allContainers():AngularFireList<Container>{
     return this.containerRef
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
