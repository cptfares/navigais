import { Component, OnInit } from '@angular/core';
import { Container } from 'app/services/container';
import { ContainerService } from 'app/services/container.service';

@Component({
  selector: 'app-add-container',
  templateUrl: './add-container.component.html',
  styleUrls: ['./add-container.component.css']
})
export class AddContainerComponent implements OnInit {
  container:Container
  userUID
  name :string
  id :string
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






  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {

  }
  onclick(){
    this.container={
      name : this.name,
      id : this.id,
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
      description: this.description,
      owner:null,
      active:true

    }
    console.log(this.container)
    this.containerService.setUp(this.container)

    this.name =null
    this. id= null
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
  }

}
