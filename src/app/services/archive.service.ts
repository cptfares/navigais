import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Company } from './company';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  vergin=true

  archive

  constructor(public db:AngularFireDatabase,private userinfo:UserInfoService) { 
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
  
  }
  




