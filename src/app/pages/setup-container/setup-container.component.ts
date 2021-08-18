import { Component, OnInit } from '@angular/core';
import { Container } from 'app/services/container';
import { ContainerService } from 'app/services/container.service';
import { now } from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setup-container',
  templateUrl: './setup-container.component.html',
  styleUrls: ['./setup-container.component.css']
})
export class SetupContainerComponent implements OnInit {
  container: Container
  container11:Container
  userUID
  Name:string
  name:string 
  coll:string
  start:string
  arrive:string
  tempurature:boolean
  tempuratureMax:number
  tempuratureMin:number
  humidity:boolean
  humidityMax:number
  humidityMin:number
  pressure:boolean
  pressureMax:number
  pressureMin:number
  tracking:boolean
  infared:boolean
  touch:boolean
  flame:boolean
  description: string;






  constructor(private containerService: ContainerService) {
   }

  ngOnInit(): void {
   this.container= this.containerService.getContainer()
   console.log(this.container.humidity.active)
   this.Name=this.container.name
  this.start=this.container.start
    this.arrive=this.container.arrive
    this.tempurature= this.container.temperature.active
   this.tempuratureMax=this.container.temperature.min
   this.tempuratureMin= this.container.temperature.max
   this.humidity=this.container.humidity.active
   this.humidityMax=this.container.humidity.min
   this. humidityMin= this.container.humidity.max
   this.pressure= this.container.pressure.active
  this. pressureMax= this.container.pressure.min
   this.pressureMin= this.container.pressure.max
   this.tracking= this.container.tracking
   this.infared= this.container.infared
   this.touch=  this.container.touch
   this.flame= this.container.flame
   this.description= this.container.description
 

  }
 onclick(){
    console.log(this.container)
    this.container11={
      adate: this.container.adate ,
      fdate:new Date().getTime(),
      name :   this.Name ,
      owner:this.container.owner,
      active:true,
      id : this.container.id,
      start :this.start,
      arrive :this.arrive,
      temperature : {
        active:this.tempurature,
        min:this.tempuratureMin,
        max:this.tempuratureMax,
        cureent:null
      },
      humidity: {
        active:this.humidity,
        min:this.humidityMin,
        max:this.humidityMax,
        cureent:null
      },
      pressure: {
        active:this.pressure,
        min:this.pressureMin,
        max:this.pressureMax,
        cureent:null
      },
      tracking: this.tracking,
      infared:  this.infared,
      touch: null,
      flame:this.flame,
      description: this.description

    }

    this.containerService.update1(this.container11)





    this.start=null
    this.arrive=null
    this.tempurature=null
    this.tempuratureMax=null
    this.tempuratureMin=null
    this.humidity=null
    this.humidityMax=null
    this.humidityMin=null
    this.pressure=null
    this.pressureMax=null
    this.pressureMin=null
    this.tracking=null
    this.infared=null
    this.touch=null
    this.flame=null
    this.description=null
    console.log(this.container11)
  }

}
