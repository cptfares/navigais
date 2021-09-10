import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Container } from 'app/services/container';
import { ContainerService } from 'app/services/container.service';
import { UserInfoService } from 'app/services/user-info.service';
import { ToastrService } from 'ngx-toastr';

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






  constructor(private toostr: ToastrService ,private containerService: ContainerService , private fauth: AngularFireAuth, public cont:UserInfoService ) { }

  ngOnInit(): void {
    let data=new Date()
    console.log(data )
    this.fauth.authState.subscribe(user=>{

      return this.userUID=  user.uid
     })


  }
  onclick(){

    console.log(this.userUID)


   this.container={
    adate:new Date().getTime(),
    fdate:new Date().getTime(),
      name : this.name,
      owner: this.userUID, 
      active:true,
      id : this.id,
      start :this.start,
      arrive :this.arrive,
      temperature : {
        active:this.tempurature,
        min:this.tempuratureMin,
        max:this.tempuratureMax,
        cureent:1
      },
      humidity: {
        active:this.humidity,
        min:this.humidityMin,
        max:this.humidityMax,
        cureent:1
      },
      pressure: {
        active:this.pressure,
        min:this.pressureMin,
        max:this.pressureMax,
        cureent:1
      },
      tracking: this.tracking,
      infared:  this.infared,
      touch: null,
      flame:this.flame,
      description: this.description,
      alert:false


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
