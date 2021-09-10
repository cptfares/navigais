import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Company } from './company';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  vergin=true
  notificationlist:Observable<any>

  archive

  constructor(private toostr: ToastrService ,public db:AngularFireDatabase,private userinfo:UserInfoService) { 
  }
  
  setarchive(archive){

    let user =this.userinfo.getUserInfo().subscribe(res=>{
      console.log(res)


        this.db.object("companies/"+res.companyId).valueChanges().subscribe((comp:Company)=>{
          if(this.vergin){
            this.vergin=false

          console.log(comp)
          let company=comp
          company.archive.push(archive)
          console.log(company[2])
          this.db.object("companies/"+res.companyId).set(company)

          }else{
            return
          }


          
        })
      



    })

  }

  getarchive(){

    let user =this.userinfo.getUserInfo().subscribe(user=>{
    this.db.object("companies/"+user.companyId).valueChanges().subscribe((res:Company)=>{
      this.archive=res
      console.log( this.archive) 
      return this.archive 




      

    })
    return this.archive 

    
    
   
  })
  return this.archive 




  }

  notifications(noti,last){
    console.log(noti)
    console.log(last)

    console.log((noti.id===last.id))



    let user =this.userinfo.getUserInfo().pipe(take(1)).subscribe(res=>{
      console.log(res)
        this.db.object("companies/"+res.companyId).valueChanges().pipe(take(1)).subscribe((comp:Company)=>{
          if(this.vergin){
            this.vergin=false

          console.log(comp)
          
          let company=comp

          console.log(noti)
              if (noti.id===last.id){
                    this.vergin=true

                return
            

              }else{
                this.toostr.show(
                  '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> alert </br> {{noti.headline}} <a> learn more</a></span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-danger alert-with-icon",
                      positionClass: "toast-bottom-right"
                    }
                  );
                company.notifications.push(noti)
                this.db.object("companies/"+res.companyId).set(company)
              }




          


          }



          
        })
      



    })
    this.vergin=true

  }
  getnoti(){


  }


  
  }
  




