import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ComapniesGurdService } from 'app/services/comapnies-gurd.service';
import { Company } from 'app/services/company';
import { UserInfoService } from 'app/services/user-info.service';

@Component({
  selector: 'app-sgin-up',
  templateUrl: './sgin-up.component.html',
  styleUrls: ['./sgin-up.component.css']
})
export class SginUpComponent implements OnInit {
  singupForm :FormGroup
  loginForm : FormGroup
  loginfirsmessage: string
  fireMessage : string
  isSignin=false
  company= new Company
  uid:string

  constructor( private fAuth: AngularFireAuth,  private fireservice : AuthService, private route : Router,private companiesRef: ComapniesGurdService, public userInfos:UserInfoService  ) { 
    this.fireMessage=""
  }

  ngOnInit(): void {
    this.singupForm= new FormGroup({
      'fullName': new FormControl ("",Validators.required),
      'email': new FormControl ("",[Validators.required,Validators.email]),
      'adress': new FormControl ("",Validators.required),
      'company': new FormControl ("",Validators.required),
      'country': new FormControl ("",Validators.required),
      'phone': new FormControl (0,Validators.required),
      'password': new FormControl ("",Validators.required),
      "role": new FormControl ("admin"),
      "companyId":new FormControl (""),
      "status":new FormControl ("offline")

    })
  }
  async sginUp() {
    console.log(this.singupForm)
    if(this.singupForm.invalid)
    return 
    else{
        this.company={
        name:this.singupForm.value.company,
        agents:['hello', 'world'],
        admin:null,
        containers:['hello', 'world'],
        archive:[{world:"ad"}, {world:"ad"}],
        coll:['hello', 'world'],
        notifications:[{world:"ad"}, {world:"ad"}],
      }
      this.fireservice.sginupUser(this.singupForm.value,this.singupForm.value,this.company).then(async result=>{
        if (result==null ){
          console.log(result)
        this.route.navigate(['dashboard/overview']);

        }else if(result.isValid==false)
        this.fireMessage= result.message
      }).catch(()=>{

      })
    }
  }
  sginup(){
    this.route.navigate(['/login'])
  }
  signup(){
    this.route.navigate(['/agent-auth'])
  }
}
