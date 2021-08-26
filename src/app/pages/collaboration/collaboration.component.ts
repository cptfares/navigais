import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ArchiveService } from 'app/services/archive.service';
import { Company } from 'app/services/company';
import { Container } from 'app/services/container';
import { ContainerService } from 'app/services/container.service';
import { UserInfoService } from 'app/services/user-info.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.css']
})
export class CollaborationComponent implements OnInit {
  archive
  name:any
  p:number=1
  contianerid
  companyid
  public dataRows :Array<Observable<Container>>

  constructor(public container:ContainerService, public archive1:ArchiveService, public userinfo:UserInfoService, public db:AngularFireDatabase ) { }



  ngOnInit(): void {
    this.dataRows=this.container.getcoll()



  }
  addColl(){
    this.container.setupcoll(this.contianerid,this.companyid)
  }



}
