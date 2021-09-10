import { Component, OnInit } from '@angular/core';
import { ComapniesGurdService } from 'app/services/comapnies-gurd.service';


@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']

})

export class UserComponent implements OnInit{
    carte:boolean=false;
    info:object;
    a:number
    agentslist:object[]=[]

    constructor(private comapnies: ComapniesGurdService){

    }
    ngOnInit(){
        this.agentslist=this.comapnies.getagents()

    }


    card(index){
        this.info=this.agentslist[index]
       this.carte=true;
       this.a=index+1;
       this.showagents()
      
        }

   private  showagents(){
       console.log(this.agentslist)
       

    }

}