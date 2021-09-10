import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Company } from 'app/services/company';
import { notification } from 'app/services/container';
import { UserInfoService } from 'app/services/user-info.service';
import { ToastrService } from "ngx-toastr";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'notifications.component.html',
    styleUrls: ['./style.css']

})

export class NotificationsComponent{
  notofactions:Observable<any> 
  constructor(private toastr: ToastrService ,public db:AngularFireDatabase,private userinfo:UserInfoService) {
    this.notofactions= this.getnoti()
     console.log(this.notofactions)

  }


  getnoti(){
    let user =this.userinfo.getUserInfo().pipe(take(1)).subscribe(res=>{
      console.log(res)
        this.db.object("companies/"+res.companyId).valueChanges().pipe(take(1)).subscribe((comp:Observable<any>)=>{
          this.notofactions = comp
          console.log(this.notofactions)


      



          
        })
      
      



    })
    return(this.notofactions)
  }
  



}
