import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'app/services/auth.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Company } from 'app/services/company';
import { ComapniesGurdService } from 'app/services/comapnies-gurd.service';
import { UserInfoService } from 'app/services/user-info.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  singupForm :FormGroup
  loginForm : FormGroup
  loginfirsmessage: string
  fireMessage : string
  isSignin=false
  company= new Company
  uid:string




  type:boolean=false;
  constructor( private fAuth: AngularFireAuth,  private fireservice : AuthService, private route : Router,private companiesRef: ComapniesGurdService, public userInfos:UserInfoService  ) { 
    this.fireMessage=""
  }

  ngOnInit(): void {

    this.singupForm= new FormGroup({
      'fullName': new FormControl ("",Validators.required),
      'email': new FormControl ("",[Validators.required,Validators.email]),
      'adress': new FormControl ("",Validators.required),
      'city': new FormControl ("",Validators.required),
      'company': new FormControl ("",Validators.required),
      'country': new FormControl ("",Validators.required),
      'phone': new FormControl (0,Validators.required),
      'password': new FormControl ("",Validators.required),
      "role": new FormControl ("admin"),
      "companyId":new FormControl ("")

    })
    this.loginForm = new FormGroup({
      'email': new FormControl ("",[Validators.required,Validators.email]),
      'password': new FormControl ("",Validators.required)

    })


  }
async sginUp() {
    console.log(this.singupForm)
    if(this.singupForm.invalid)
    return 
    else{
        this.company={
        name:this.singupForm.value.company,
        agents: [],
        admin:null,
        containers:[],
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
  logIn(){
    if (this.loginForm.invalid){
      return
    }else{
      this.fireservice.loginUser(this.loginForm.value.email,this.loginForm.value.password).then(result=>{
        if (result==null){
          console.log("logging...")
          this.route.navigate(['dashboard/overview'])
        } else if(result.isValid==false) {
          console.log("login eroor",result)
          this.loginfirsmessage= result.message

        }
      })
    }
  }

  

  login(){
    this.type= false ;
  }
    signup(){
      this.type= true;
}

}
