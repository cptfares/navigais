import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ArchiveService } from 'app/services/archive.service';
import { Company } from 'app/services/company';
import { UserInfoService } from 'app/services/user-info.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  archive

  constructor( public archive1:ArchiveService, public userinfo:UserInfoService, public db:AngularFireDatabase ) { }

  ngOnInit(): void {
    let user =this.userinfo.getUserInfo().subscribe(user=>{
      this.db.object("companies/"+user.companyId).valueChanges().subscribe((res:Company)=>{
        this.archive=res.archive
        this.archive.shift()
        this.archive.shift()
        console.log( this.archive) 
      })
    })
  }

}
