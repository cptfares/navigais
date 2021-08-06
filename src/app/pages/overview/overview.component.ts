import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ComapniesGurdService } from 'app/services/comapnies-gurd.service';
import { Company } from 'app/services/company';
import { Container } from 'app/services/container';
import { ContainerService } from 'app/services/container.service';
import { Observable } from 'rxjs';

// import { ItemService } from 'app/services/companies.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  company= new Company
  numcontainers: Array<any>
  num: number
  agentslist:object[]=[]
  containers: any ;
  online
  offline
 dataRows :Array<Observable<Container>>

  constructor(private comapnies: ComapniesGurdService, private companiesRef: ComapniesGurdService, public firebase:AngularFirestore, public route : Router, public containerservice: ContainerService ) {

  }

  ngOnInit(){

    this.containers = {
    headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],

};
this.agentslist=this.comapnies.getagents()
this.dataRows=this.containerservice.getagents()



console.log(this.dataRows)



}
setup(){
  this.route.navigate(['dashboard/setup_container'])

}
getnum(array:Array<object>){
  return array.length

}
ngOnDestroy(): void {
  this.dataRows=null
  this.agentslist=null
  
}



}
