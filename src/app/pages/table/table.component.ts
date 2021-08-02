import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ContainerService } from 'app/services/container.service';
import { DialogComponent } from './dialog/dialog.component';
import {map} from 'rxjs/operators';
import { Container } from 'app/services/container';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public containers: any ;
    public dataRows : Array<any>;
    pop:boolean;
    received:object;
    constructor(private dialogRef: MatDialog, private containerservice:ContainerService){

    }
    ngOnInit(){
        this.containerservice.gecontainers()
        this.getContainer()
        this.containers = {
            headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],

        };
       this.dataRows= [{
    name:"first",
    id:"45",
    start:"no idea",
    arrive:"i don t know"
   
  },
  {
    name: "name",
    id:"46",
    start:"another",
    arrive:"destination"
   },
  {
    name:"gute",
    id:"47",
    start:"somewhere",
    arrive:"but it heere"
  }
]
        //console.log(this.dataRows[1][2])


    }

    popup(index){
        this.pop=true;
        this.dataRows=this.containers[index-1]
    }
    openDialog(data:Container){
        console.log(data);
        this.received= data;
        this.containerservice.changeDetail(this.received)
        this.dialogRef.open(DialogComponent, {
            
            width: '50%',
          });
    }
 
    getContainer(){
        this.containerservice.allContainers().snapshotChanges().pipe(map(changes => changes.map(c =>({key: c.payload, ... c.payload.val()}))))
    .subscribe(rs=>{
        console.log(rs);
        this.dataRows=rs;
    })
   
    
    }
}
