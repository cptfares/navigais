import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ComapniesGurdService } from 'app/services/comapnies-gurd.service';
import { Company } from 'app/services/company';

// import { ItemService } from 'app/services/companies.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  company= new Company
  agentslist:object[]=[]

  constructor(private comapnies: ComapniesGurdService, private companiesRef: ComapniesGurdService, public firebase:AngularFirestore, public route : Router ) {
   }

   ngOnInit(){
    this.agentslist=this.comapnies.getagents()

}
setup(){
  this.route.navigate(['dashboard/setup container'])

}



}
