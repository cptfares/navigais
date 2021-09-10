import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { ContainerService } from './container.service';
import { Container } from './container';
import { UserInfoService } from './user-info.service';
import { Company } from './company';
import { ArchiveService } from './archive.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
 cuurentmessage= new BehaviorSubject (null)
 dataRows :Array<Observable<Container>>
 listofcontainers:Array<Observable<Container>>
 containerstList

  constructor ( public archive1:ArchiveService, private userinfo:UserInfoService,private database : AngularFireDatabase , private toostr: ToastrService , private cont:ContainerService ) { 
    this.dataRows=this.cont.getagents()

  }







  
  alerts(){
    let it =true
    console.log("adsldsaösa")
    
  this.listofcontainers=[]
  this.containerstList=[]
  this.listofcontainers.map( () =>      this.listofcontainers.pop())    
  this.containerstList.map( () =>      this.containerstList.pop())  

    
  let user =this.userinfo.getUserInfo().subscribe(user=>{
    this.listofcontainers.map( () =>      this.listofcontainers.pop())  
    console.log("adsdsa")  



      this.database.object("companies/"+user.companyId).valueChanges().pipe(take(1))
      .subscribe((res:Company)=>{


        this.containerstList=res.containers
        console.log(this.containerstList)
        this.containerstList.splice(0,1)
        this.containerstList.splice(0,1)
        

        console.log( this.containerstList)
        this.containerstList.forEach(element => {    
        this.listofcontainers.map( () =>      this.listofcontainers.pop())    
          this.database.object("/containers/"+element).valueChanges().subscribe((res:Container)=>{




            console.log(res.temperature.max)            
            if((res.temperature.max < res.temperature.cureent  ) || (res.temperature.min > res.temperature.cureent ) ){
              this.database.object("companies/"+user.companyId).valueChanges().pipe(take(1))
              .subscribe((res:Company)=>{
                let notifications = {
                  id :"9",
                  headline:"tempurature",
                  message:"dakdsalkdsakldas",
                  date:new Date().getTime()
  
                }
                let lastnoti= res.notifications[( res.notifications.length)-1]

                  this.archive1.notifications(notifications, lastnoti)

              })


              
              

;
              this.alertit(res.id)
            }else if((res.pressure.max < res.pressure.cureent  ) || (res.pressure.min > res.pressure.cureent ) ){
              this.database.object("companies/"+user.companyId).valueChanges().pipe(take(1))
              .subscribe((res:Company)=>{
                let notifications = {
                  id :"2",
                  headline:"tempurature",
                  message:"dakdsalkdsakldas",
                  date:new Date().getTime()
  
                }
                let lastnoti= res.notifications[( res.notifications.length)-1]

                  this.archive1.notifications(notifications, lastnoti)

              })
               this.alertit(res.id)
            }
            
            
            
            else {
              this.desalertit(res.id)

            }

          })         
        });
      })  
      return  
    })

  


  
  }










  private getagentslist(agent){

    this.listofcontainers.push(agent)
    console.log( this.listofcontainers)
    return ( this.listofcontainers)

   }

   private alertit(cotid){
     let bara=true
     
    this.database.object("/containers/"+cotid).valueChanges().subscribe((res:Container)=>{
      let  cont=res 
      cont.alert=true

      if(bara){
        this.database.object("/containers/"+cotid).set(cont)
        bara=false
      }


      

    })
  
  }
  private desalertit(cotid){
    let bara=true
    
   this.database.object("/containers/"+cotid).valueChanges().subscribe((res:Container)=>{
     let  cont=res 
     cont.alert=false

     if(bara){
       this.database.object("/containers/"+cotid).set(cont)
       bara=false
     }


     

   })
 
 }
  

}




