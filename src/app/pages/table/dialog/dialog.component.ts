import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArchiveService } from 'app/services/archive.service';
import { Company } from 'app/services/company';
import { Container } from 'app/services/container';
import { ContainerService } from 'app/services/container.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
information:Container;
sensors =["temp", "hum","touch", "infrared","flame", "laser"]
  constructor( public archive:ArchiveService,  private dialogRef: MatDialog,private detailed: ContainerService , public route: Router ) { }

  ngOnInit(): void {

      this.information=this.detailed.chckedContainer

    
  }
  unactive(){
    this.detailed.deactive(this.information.id)
    this.archive.setarchive(this.information)

  }
  change(){
    this.detailed.changeDetail(this.information)
    this.route.navigate(['dashboard/containers'])
    

  }

}
