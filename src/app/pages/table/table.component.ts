import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ContainerService } from 'app/services/container.service';
import { DialogComponent } from './dialog/dialog.component';
import {map} from 'rxjs/operators';
import { Container } from 'app/services/container';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


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
    public dataRows :Array<Observable<Container>>
    pop:boolean;
    received:Container;
    constructor(private dialogRef: MatDialog, private containerservice:ContainerService, public route: Router){
        this.dataRows=[]

    }
    ngOnInit(){
            this.containers = {
            headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],

        };
    this.dataRows=this.containerservice.getagents()
    console.log(this.dataRows)
        //console.log(this.dataRows[1][2])


    }

    popup(index){
        this.pop=true;
        this.dataRows=this.containers[index-1]
    }
    openDialog(data:Container){
        console.log(data);
        this.received= data;
        this.containerservice.setContainer(this.received)
        this.containerservice.changeDetail(this.received)
          this.route.navigate(['dashboard/containers'])

        this.dialogRef.open(DialogComponent, {
            width: '55%',
            height:"75%",
            
          });
    }
 

   
    
 
}
