import { Component, OnInit } from '@angular/core';
import { ContainerService } from 'app/services/container.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
information:object;
sensors =["temp", "hum","touch", "infrared","flame", "laser"]
  constructor(private detailed: ContainerService) { }

  ngOnInit(): void {
   this.detailed.currentdetail.subscribe(result=>{
      console.log(result);
      this.information=result
    });
    
  }

}
