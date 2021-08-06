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
  number : number
  container1 : Container
  company1: Company;
  ida:string
  ignore=true
  listofcontainers:Array<Observable<Container>>
  containerstList
  chckedContainer:Container
  letit:boolean

  constructor(private database : AngularFireDatabase ,private userinfo:UserInfoService, private afs : AngularFirestore) {
    this.containerRef=[]
   }
   setUp(Container2:Container):any{
      this.letit=false
     
   this.database.object("/containers/"+Container2.id).set(Container2)
       this.userinfo.getUserInfo().subscribe((user)=>{
        Container2.owner= user.companyId
       this.afs.collection("companies").doc(`${user.companyId}`).valueChanges().subscribe((res:Company)=>{
            console.log(this.ignore)
        if(this.ignore){
          console.log(this.ignore)

        this.company1=res
        this.company1.containers.push(Container2.id)
       this.update(this.company1,user.companyId)
       this.ignore=false
                 console.log("bara rabi m3ak")
       return this.company1
    }  
    })
    })





    this.ignore=true

   }


 update(data:Company,_id){       
  this.afs.collection('companies').doc(_id).set(data,{merge:true})

}
getagents():Array<Observable<Container>>{
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
    console.log( this.listofcontainers)
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
getcontainer(containerid):Container {

  this.database.object("/containers/"+containerid).valueChanges().subscribe((res:Container)=>{
    this.container1= res
  })
  return  this.container1
}

setContainer(container:Container){
   this.chckedContainer=container


}
getContainer(){
  return this.chckedContainer
}

  
 
}
