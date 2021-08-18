import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ArchiveService } from 'app/services/archive.service';
import { Company } from 'app/services/company';
import { ContainerService } from 'app/services/container.service';
import { UserInfoService } from 'app/services/user-info.service';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.css']
})
export class CollaborationComponent implements OnInit {
  archive
  name:any
  p:number=1

  constructor(public container:ContainerService, public archive1:ArchiveService, public userinfo:UserInfoService, public db:AngularFireDatabase ) { }



  ngOnInit(): void {
    this.container

  }
  key='id';
  reverse:boolean=false;
  sort(key){
    this.key=key
    this.reverse= !this.reverse

  }
  sreach(){
    if(this.name==""){
      let user =this.userinfo.getUserInfo().subscribe(user=>{
        this.db.object("companies/"+user.companyId).valueChanges().subscribe((res:Company)=>{
          console.log(res)
          this.archive=res.archive
          this.archive.shift()
          this.archive.shift()
          console.log( this.archive) 
        })
      })
    }else{
      this.archive= this.archive.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      })
    }
  }

}
